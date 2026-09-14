// ============================================================
// SIA - MAIN FRONTEND SCRIPT
// Home page controls only
// Voice recording is handled inside face.html
// ============================================================

"use strict";

// ============================================================
// PAGE TRANSITION
// ============================================================

function setTransitionOrigin(overlayEl, triggerEl) {
    if (!overlayEl || !triggerEl) return;

    const rect = triggerEl.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const xPercent = (centerX / window.innerWidth) * 100;
    const yPercent = (centerY / window.innerHeight) * 100;

    overlayEl.style.setProperty("--origin-x", `${xPercent}%`);
    overlayEl.style.setProperty("--origin-y", `${yPercent}%`);
}

// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {
    en: {
        subtitle: "Your Cooperative<br>AI Assistant",
        slogan1: "Sahi<br>Jaankari<br>Sabke Liye",
        hello: "Hello! 😊",
        intro: "I am SIA, your Cooperative and Government Assistant.",
        desc: "Ask me anything about schemes, cooperative laws, eligibility, or more!",
        slogan2: "Sahakar<br>Se<br>Samriddhi",
        tap: "Tap to speak",
        type: "Type instead ➔",
        selector: "English | हिंदी | ਪੰਜਾਬੀ | More ▼"
    },

    hi: {
        subtitle: "आपका सहकारी<br>एआई सहायक",
        slogan1: "सही<br>जानकारी<br>सबके लिए",
        hello: "नमस्ते! 😊",
        intro: "मैं SIA हूँ, आपका सहकारी और सरकारी सहायक।",
        desc: "मुझसे योजनाओं, सहकारी कानूनों, पात्रता या अधिक के बारे में कुछ भी पूछें!",
        slogan2: "सहकार<br>से<br>समृद्धि",
        tap: "बोलने के लिए टैप करें",
        type: "टाइप करें ➔",
        selector: "हिंदी ▼"
    },

    bn: {
        subtitle: "আপনার সমবায়<br>এআই সহকারী",
        slogan1: "সবার<br>জন্য<br>সঠিক তথ্য",
        hello: "নমস্কার! 😊",
        intro: "আমি SIA, আপনার সমবায় এবং সরকারি সহকারী।",
        desc: "আমাকে স্কিম, সমবায় আইন, যোগ্যতা বা আরও অনেক কিছু সম্পর্কে জিজ্ঞাসা করুন!",
        slogan2: "সমবায়ের<br>মাধ্যমে<br>সমৃদ্ধি",
        tap: "কথা বলতে ট্যাপ করুন",
        type: "টাইপ করুন ➔",
        selector: "বাংলা ▼"
    },

    pa: {
        subtitle: "ਤੁਹਾਡਾ ਸਹਿਕਾਰੀ<br>AI ਸਹਾਇਕ",
        slogan1: "ਸਭ<br>ਲਈ<br>ਸਹੀ ਜਾਣਕਾਰੀ",
        hello: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! 😊",
        intro: "ਮੈਂ SIA ਹਾਂ, ਤੁਹਾਡਾ ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸਹਾਇਕ।",
        desc: "ਮੈਨੂੰ ਸਕੀਮਾਂ, ਸਹਿਕਾਰੀ ਕਾਨੂੰਨਾਂ, ਯੋਗਤਾ ਜਾਂ ਹੋਰ ਬਹੁਤ ਕੁਝ ਬਾਰੇ ਪੁੱਛੋ!",
        slogan2: "ਸਹਿਕਾਰਤਾ<br>ਨਾਲ<br>ਖੁਸ਼ਹਾਲੀ",
        tap: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
        type: "ਟਾਈਪ ਕਰੋ ➔",
        selector: "ਪੰਜਾਬੀ ▼"
    },

    mr: {
        subtitle: "तुमचा सहकारी<br>AI सहाय्यक",
        slogan1: "सर्वांसाठी<br>योग्य<br>माहिती",
        hello: "नमस्कार! 😊",
        intro: "मी SIA आहे, तुमचा सहकारी आणि सरकारी सहाय्यक.",
        desc: "मला योजना, सहकारी कायदे, पात्रता किंवा अधिक बद्दल काहीही विचारा!",
        slogan2: "सहकारातून<br>समृद्धी",
        tap: "बोलण्यासाठी टॅप करा",
        type: "टाईप करा ➔",
        selector: "मराठी ▼"
    },

    ta: {
        subtitle: "உங்கள் கூட்டுறவு<br>AI உதவியாளர்",
        slogan1: "அனைவருக்கும்<br>சரியான<br>தகவல்",
        hello: "வணக்கம்! 😊",
        intro: "நான் SIA, உங்கள் கூட்டுறவு மற்றும் அரசு உதவியாளர்.",
        desc: "திட்டங்கள், கூட்டுறவு சட்டங்கள், தகுதி அல்லது பலவற்றைப் பற்றி என்னிடம் கேளுங்கள்!",
        slogan2: "கூட்டுறவு<br>மூலம்<br>செழிப்பு",
        tap: "பேச தட்டவும்",
        type: "தட்டச்சு செய்யவும் ➔",
        selector: "தமிழ் ▼"
    }
};

// ============================================================
// MAIN INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // ELEMENTS
    // ========================================================

    const micButton = document.getElementById("micButton");
    const voiceControl = document.querySelector(".voice-control");
    const tapText = document.querySelector(".tap-text");

    const langBtn = document.getElementById("langBtn");
    const langDropdown = document.getElementById("langDropdown");
    const selectedLang = document.getElementById("selectedLang");

    const typeBtn = document.getElementById("typeBtn");

    const transitionOverlay =
        document.getElementById("transitionOverlay");

    const inboxBtn = document.getElementById("inboxBtn");
    const messageBadge = document.getElementById("messageBadge");

    // ========================================================
    // HOME PAGE MICROPHONE
    // ========================================================
    // This button only opens face.html.
    // Do not record audio here.
    // Audio recording is handled inside face.html.

    let isOpeningFace = false;

    function resetMicState() {
        isOpeningFace = false;

        if (voiceControl) {
            voiceControl.classList.remove("listening");
        }

        if (micButton) {
            micButton.style.backgroundColor = "#1b7a43";
            micButton.style.transform = "scale(1)";
        }

        if (tapText) {
            tapText.textContent = "Tap to speak";
        }
    }

    window.addEventListener("pageshow", resetMicState);

    if (micButton) {
        micButton.addEventListener("click", () => {

            if (isOpeningFace) return;

            isOpeningFace = true;

            if (voiceControl) {
                voiceControl.classList.add("listening");
            }

            micButton.style.backgroundColor = "#0a4d2e";
            micButton.style.transform = "scale(1.08)";

            if (tapText) {
                tapText.textContent = "Opening SIA...";
            }

           setTimeout(() => {
    sessionStorage.setItem("playGreeting", "true");
    window.location.href = "/static/face.html";
}, 300);
        });
    }

    // ========================================================
    // LANGUAGE DROPDOWN
    // ========================================================

    if (langBtn && langDropdown) {
        langBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            langDropdown.classList.toggle("show");
        });
    }

    // ========================================================
    // LANGUAGE SELECTION
    // ========================================================

    const dropdownItems =
        document.querySelectorAll(".dropdown-item");

    dropdownItems.forEach((item) => {

        item.addEventListener("click", (event) => {
            event.stopPropagation();

            const languageCode =
                item.getAttribute("data-lang");

            if (!translations[languageCode]) {
                return;
            }

            document
                .querySelectorAll("[data-translate]")
                .forEach((element) => {

                    const key =
                        element.getAttribute("data-translate");

                    const translatedText =
                        translations[languageCode][key];

                    if (translatedText) {
                        element.innerHTML = translatedText;
                    }
                });

            if (selectedLang) {
                selectedLang.innerHTML =
                    translations[languageCode].selector;
            }

            if (langDropdown) {
                langDropdown.classList.remove("show");
            }

            localStorage.setItem("siaLanguage", languageCode);
        });
    });

    // ========================================================
    // CLOSE LANGUAGE DROPDOWN
    // ========================================================

    document.addEventListener("click", (event) => {

        if (
            langBtn &&
            langDropdown &&
            !langBtn.contains(event.target) &&
            !langDropdown.contains(event.target)
        ) {
            langDropdown.classList.remove("show");
        }
    });

    // ========================================================
    // LOAD SAVED LANGUAGE
    // ========================================================

    const savedLanguage =
        localStorage.getItem("siaLanguage") || "en";

    const savedLanguageItem =
        document.querySelector(
            `.dropdown-item[data-lang="${savedLanguage}"]`
        );

    if (savedLanguageItem) {
        savedLanguageItem.click();
    }

    // ========================================================
    // CONTROL BUTTON ANIMATION
    // ========================================================

    const controlButtons =
        document.querySelectorAll(".control-btn");

    controlButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.95)";

            setTimeout(() => {
                button.style.transform = "translateY(-3px)";
            }, 120);
        });
    });

    // ========================================================
    // NOTIFICATION BADGE
    // ========================================================

    function updateNotificationBadge(count) {

        if (!messageBadge) return;

        count = Number(count) || 0;

        if (count > 0) {
            messageBadge.textContent = count;
            messageBadge.style.display = "flex";
        } else {
            messageBadge.textContent = "";
            messageBadge.style.display = "none";
        }
    }

    // ========================================================
    // FETCH NOTIFICATIONS
    // ========================================================

    async function fetchInboxData() {

        try {
            const response = await fetch("/api/messages");

            if (!response.ok) {
                throw new Error(
                    `Notification API returned ${response.status}`
                );
            }

            const data = await response.json();

            updateNotificationBadge(data.unreadCount);

        } catch (error) {
            console.log(
                "Notification service is not available yet."
            );
        }
    }

    updateNotificationBadge(0);
    fetchInboxData();

    setInterval(() => {
        fetchInboxData();
    }, 30000);

    // ========================================================
    // OPEN MAIL / NOTIFICATION PAGE
    // ========================================================

    if (inboxBtn) {

        inboxBtn.addEventListener("click", () => {

            if (transitionOverlay) {

                setTransitionOrigin(
                    transitionOverlay,
                    inboxBtn
                );

                transitionOverlay.classList.remove("expand");
                transitionOverlay.classList.add("expand");

                setTimeout(() => {
                    window.location.href = "/static/mail.html";
                }, 700);

            } else {
                window.location.href = "/static/mail.html";
            }
        });
    }

    // ========================================================
    // TYPE INSTEAD BUTTON
    // ========================================================

    if (typeBtn) {

        typeBtn.addEventListener("click", () => {

            if (transitionOverlay) {

                setTransitionOrigin(
                    transitionOverlay,
                    typeBtn
                );

                transitionOverlay.classList.remove("expand");
                transitionOverlay.classList.add("expand");

                setTimeout(() => {
                    window.location.href = "/static/chat.html";
                }, 700);

            } else {
                window.location.href = "/static/chat.html";
            }
        });
    }

    // ========================================================
    // CONNECTION STATUS
    // ========================================================

    function updateConnectionStatus() {

        const status =
            document.getElementById("connection-status");

        if (!status) return;

        status.textContent =
            navigator.onLine ? "📶" : "📵";
    }

    updateConnectionStatus();

    window.addEventListener(
        "online",
        updateConnectionStatus
    );

    window.addEventListener(
        "offline",
        updateConnectionStatus
    );

    // ========================================================
    // DATE AND TIME
    // ========================================================

    function updateDateTime() {

        const now = new Date();

        const dateElement =
            document.getElementById("current-date");

        const timeElement =
            document.getElementById("current-time");

        if (dateElement) {
            dateElement.textContent =
                now.toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
        }

        if (timeElement) {
            timeElement.textContent =
                now.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });
        }
    }

    updateDateTime();

    const initialTime =
        document.getElementById("initial-message-time");

    function updateInitialMessageTime() {

        if (initialTime) {
            initialTime.textContent =
                new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });
        }
    }

    updateInitialMessageTime();

    setInterval(() => {
        updateDateTime();
        updateInitialMessageTime();
    }, 1000);
});