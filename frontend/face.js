/* ============================================================
   AI Assistant — state machine + animation controller
   Exposes: window.assistant.setSpeaking(bool), .wakeAssistant(),
            .setBored(level), .setIdle(), .state (read-only getter)
   ============================================================ */

(() => {
  "use strict";

  /* ---------------- DOM refs ---------------- */
  const face      = document.getElementById("face");
  const eyesEl    = document.getElementById("eyes");
  const eyeLeft   = document.getElementById("eyeLeft");
  const eyeRight  = document.getElementById("eyeRight");
  const eyeLeftFill  = eyeLeft.querySelector(".eye-fill");
  const eyeRightFill = eyeRight.querySelector(".eye-fill");
  const mouthWrap = document.querySelector(".mouth-wrap");
  const canvas    = document.getElementById("mouthCanvas");
  const ctx       = canvas.getContext("2d");

  /* ---------------- Global state ---------------- */
  // idle | thinking | speaking | bored
  let assistantState = "idle";
  let boredLevel = 0;          // 0 = attentive, 1 = mild, 2 = deep
  let lastInteraction = Date.now();
  let hasStarted = false;

  /* timers (kept centrally so nothing accumulates/leaks) */
  const timers = {
  blink: null,
  look: null,
  boredCheck: null,
  boredMouth: null,
  smile: null,
  waveRAF: null,
  waveWander: null,
  answerTyping: null
};

  /* mouth drawing mode: "neutral" | "smile" | "speaking" */
  let mouthMode = "neutral";
  let waveAmp = 0;
  let waveTargetAmp = 0;
  let wavePhase = 0;

  /* ============================================================
     Canvas setup
     ============================================================ */
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  function resizeCanvas() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = mouthWrap.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redrawStaticMouth();
  }
  window.addEventListener("resize", resizeCanvas);

  /* ============================================================
     Mouth rendering
     ============================================================ */

  function clearMouth() {
    const w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
  }

  // curveAmount: negative = slight downward droop (bored),
  // 0 = flat neutral line, positive = smile ("⌣" bowl shape)
  function drawCurve(curveAmount, glowStrength = 1) {
    clearMouth();
    const w = canvas.width / dpr, h = canvas.height / dpr;
    const midY = h / 2;
    const pad = w * 0.16;
    const dip = curveAmount * (h * 0.32);

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(2.5, h * 0.06);
    ctx.strokeStyle = "rgba(244, 246, 248, 0.92)";
    ctx.shadowColor = "rgba(230, 238, 245, 0.85)";
    ctx.shadowBlur = 14 * glowStrength;

    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.quadraticCurveTo(w / 2, midY + dip, w - pad, midY);
    ctx.stroke();
    ctx.restore();
  }

  function drawWaveformFrame() {
    clearMouth();
    const w = canvas.width / dpr, h = canvas.height / dpr;
    const midY = h / 2;
    const pad = w * 0.08;
    const usableW = w - pad * 2;

    // smooth wandering amplitude (lerp toward a target that changes
    // periodically) so the motion is continuous, never a hard jump
    waveAmp += (waveTargetAmp - waveAmp) * 0.06;
    wavePhase += 0.22;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(2.5, h * 0.05);
    ctx.strokeStyle = "rgba(244, 246, 248, 0.95)";
    ctx.shadowColor = "rgba(230, 238, 245, 0.9)";
    ctx.shadowBlur = 16;

    ctx.beginPath();
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = pad + t * usableW;
      // sum of a few waves at different frequencies for an
      // organic, non-repetitive "audio signal" look
      const envelope = Math.sin(Math.PI * t); // tapers toward the edges
      const y =
        midY +
        envelope *
          waveAmp *
          (Math.sin(t * 9 + wavePhase) * 0.55 +
            Math.sin(t * 17 - wavePhase * 1.3) * 0.3 +
            Math.sin(t * 5 + wavePhase * 0.6) * 0.4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function redrawStaticMouth() {
    if (mouthMode === "speaking") return; // rAF loop owns drawing
    if (mouthMode === "smile") drawCurve(1);
    else drawCurve(0);
  }

  /* ============================================================
     Waveform control
     ============================================================ */

  function startWaveform() {
    mouthMode = "speaking";
    waveAmp = 0;
    waveTargetAmp = randomAmp();

    if (timers.waveRAF) cancelAnimationFrame(timers.waveRAF);
    if (timers.waveWander) clearInterval(timers.waveWander);

    timers.waveWander = setInterval(() => {
      waveTargetAmp = randomAmp();
    }, 170);

    const loop = () => {
      if (mouthMode !== "speaking") return;
      drawWaveformFrame();
      timers.waveRAF = requestAnimationFrame(loop);
    };
    timers.waveRAF = requestAnimationFrame(loop);
  }

  function randomAmp() {
    const h = canvas.height / dpr;
    // occasionally dips near zero (a breath/pause), mostly mid-range
    return (Math.random() < 0.15 ? 0.05 : 0.35 + Math.random() * 0.65) * (h * 0.22);
  }

  function stopWaveform() {
    if (timers.waveRAF) cancelAnimationFrame(timers.waveRAF);
    if (timers.waveWander) clearInterval(timers.waveWander);
    timers.waveRAF = null;
    timers.waveWander = null;
    mouthMode = "smile";
    redrawStaticMouth();
  }

  /* ============================================================
     Eyes — blink
     ============================================================ */

  function blink() {
    eyeLeftFill.classList.add("shut");
    eyeRightFill.classList.add("shut");
    setTimeout(() => {
      eyeLeftFill.classList.remove("shut");
      eyeRightFill.classList.remove("shut");
    }, 130);
  }

  function scheduleBlink() {
    if (timers.blink) clearTimeout(timers.blink);
    const delay = 3500 + Math.random() * 1500; // ~3.5–5s
    timers.blink = setTimeout(() => {
      // no blinking while the eyes are squinted down into a bored rectangle
      if (assistantState !== "starting" && boredLevel === 0) blink();
      scheduleBlink();
    }, delay);
  }

  /* ============================================================
     Eyes — look around
     ============================================================ */

  function lookAround() {
    const xOptions = [-8, -4, 0, 0, 4, 8];
    const yOptions = [-3, 0, 0, 3];
    const x = xOptions[Math.floor(Math.random() * xOptions.length)];
    const y = yOptions[Math.floor(Math.random() * yOptions.length)];
    eyesEl.style.setProperty("--look-x", `${x}px`);
    eyesEl.style.setProperty("--look-y", `${y}px`);

    // return to center shortly after
    setTimeout(() => {
      eyesEl.style.setProperty("--look-x", `0px`);
      eyesEl.style.setProperty("--look-y", `0px`);
    }, 900 + Math.random() * 500);
  }

  function scheduleLook() {
    if (timers.look) clearTimeout(timers.look);
    const delay = 4000 + Math.random() * 5000; // ~4–9s
    timers.look = setTimeout(() => {
      if (assistantState === "idle" || boredLevel === 0) lookAround();
      scheduleLook();
    }, delay);
  }

  /* ============================================================
     Boredom
     ============================================================ */

  function applyBoredVisuals(level) {
    if (level === 0) {
      eyeLeft.style.setProperty("--eye-squint", "1");
      eyeRight.style.setProperty("--eye-squint", "1");
      face.style.setProperty("--face-brightness", "1");
    } else if (level === 1) {
      eyeLeft.style.setProperty("--eye-squint", "0.5");
      eyeRight.style.setProperty("--eye-squint", "0.5");
      face.style.setProperty("--face-brightness", "0.85");
    } else {
      eyeLeft.style.setProperty("--eye-squint", "0.28");
      eyeRight.style.setProperty("--eye-squint", "0.28");
      face.style.setProperty("--face-brightness", "0.68");
    }
  }

  function setBored(level) {
    const wasBored = boredLevel > 0;
    boredLevel = level;
    assistantState = level > 0 ? "bored" : "idle";
    face.dataset.state = assistantState;
    applyBoredVisuals(level);

    if (level > 0 && !wasBored) {
      // stay smiling for a moment, then settle into the flat neutral line
      if (timers.boredMouth) clearTimeout(timers.boredMouth);
      timers.boredMouth = setTimeout(() => {
        if (boredLevel > 0 && mouthMode !== "speaking") {
          mouthMode = "neutral";
          redrawStaticMouth();
        }
      }, 1000);
    } else if (level === 0) {
      if (timers.boredMouth) clearTimeout(timers.boredMouth);
      timers.boredMouth = null;
      if (mouthMode !== "speaking") {
        mouthMode = "smile";
        redrawStaticMouth();
      }
    }
  }

  function scheduleBoredCheck() {
    if (timers.boredCheck) clearInterval(timers.boredCheck);
    timers.boredCheck = setInterval(() => {
      if (assistantState === "speaking" || assistantState === "starting") return;
      const idleFor = Date.now() - lastInteraction;
      if (idleFor > 30000 && boredLevel !== 2) setBored(2);
      else if (idleFor > 15000 && idleFor <= 30000 && boredLevel === 0) setBored(1);
    }, 1000);
  }

  /* ============================================================
     Public state transitions
     ============================================================ */

  function setIdle() {
    stopWaveform();
    assistantState = "idle";
    lastInteraction = Date.now();
    face.dataset.state = "idle";
    setBored(0);
  }

  function setSpeaking(isSpeaking) {
    if (isSpeaking) {
      lastInteraction = Date.now();
      assistantState = "speaking";
      face.dataset.state = "speaking";
      if (timers.boredMouth) clearTimeout(timers.boredMouth);
      boredLevel = 0;
      eyeLeft.style.setProperty("--eye-squint", "1");
      eyeRight.style.setProperty("--eye-squint", "1");
      face.style.setProperty("--face-brightness", "1");
      startWaveform();
    } else {
      stopWaveform();
      assistantState = "idle";
      face.dataset.state = "idle";
      lastInteraction = Date.now();
    }
  }

  function wakeAssistant() {
    lastInteraction = Date.now();
    const wasBored = boredLevel > 0;
    if (assistantState !== "speaking") {
      assistantState = "idle";
      face.dataset.state = "idle";
    }
    setBored(0);
    if (wasBored) lookAround();
  }

  function showSmile() {
    if (timers.smile) clearTimeout(timers.smile);
    mouthMode = "smile";
    redrawStaticMouth();
  }

  /* ============================================================
     Startup cinematic sequence
     ============================================================ */

  function startAssistant() {
    if (hasStarted) return;
    hasStarted = true;

    face.dataset.state = "starting";
    eyeLeftFill.classList.add("shut");
    eyeRightFill.classList.add("shut");
    resizeCanvas();

    // Step 1: brief pause with eyes shut (already the initial state)
    setTimeout(() => {
      // Step 2: eyes open — expanding symmetrically from the shut line
      eyeLeftFill.classList.remove("shut");
      eyeRightFill.classList.remove("shut");

      setTimeout(() => {
        // Step 3: mouth fades in, neutral
        mouthMode = "neutral";
        redrawStaticMouth();
        mouthWrap.classList.add("visible");

        setTimeout(() => {
          // Step 4: one settling blink
          blink();

          setTimeout(() => {
            // Step 5: friendly smile — and it stays from here on
            face.dataset.state = "idle";
            assistantState = "idle";
            showSmile();

            lastInteraction = Date.now();
            scheduleBlink();
            scheduleLook();
            scheduleBoredCheck();
          }, 450);
        }, 700);
      }, 500);
    }, 400);
  }

  /* ============================================================
     Interaction hooks (demo-level; safe to remove/replace)
     ============================================================ */

  ["pointerdown", "keydown"].forEach((evt) => {
    window.addEventListener(evt, () => wakeAssistant(), { passive: true });
  });

  /* Optional: demonstrate speaking state via the browser's speech
     synthesis. This is entirely decoupled from the animation core —
     any external TTS/AI system can drive setSpeaking() the same way. */
  function demoSpeak(text) {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  /* =========================================function setSpeaking(...)===================
     Boot + public API
     ============================================================ */
    window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    startAssistant();

    const backButton = document.getElementById("backButton");

    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "/static/index.html";
        });
    }
});

function showAnswerWordByWord(answer) {
  const caption = document.getElementById("answerCaption");

  if (!caption || !answer) return;

  // Stop any previous answer animation
  if (timers.answerTyping) {
    clearTimeout(timers.answerTyping);
    timers.answerTyping = null;
  }

  caption.textContent = "";
  caption.scrollTop = 0;

  const words = String(answer).trim().split(/\s+/);
  let wordIndex = 0;

  function typeNextWord() {
    if (wordIndex >= words.length) {
      timers.answerTyping = null;
      return;
    }

    const word = words[wordIndex];
    let letterIndex = 0;

    // Add space before every word except the first
    if (wordIndex > 0) {
      caption.textContent += " ";
    }

    function typeNextLetter() {
      if (letterIndex >= word.length) {
        wordIndex++;

        // Small pause after completing each word
        timers.answerTyping = setTimeout(typeNextWord, 180);
        return;
      }

      caption.textContent += word[letterIndex];
      letterIndex++;

      // Automatically scroll to the latest text
      caption.scrollTop = caption.scrollHeight;

      timers.answerTyping = setTimeout(typeNextLetter, 45);
    }

    typeNextLetter();
  }

  typeNextWord();
}

  window.assistant = {
    setSpeaking,
    wakeAssistant,
    setIdle,
    setBored,
    showSmile,
    demoSpeak,
    showAnswerWordByWord,
    get state() {
      return assistantState;
    }
  };
})();
