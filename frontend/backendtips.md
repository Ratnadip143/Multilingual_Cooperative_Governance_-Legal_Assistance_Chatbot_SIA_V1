# How to Connect the API

The assistant provides a few JavaScript hooks that can be called from anywhere in your application.

## Speaking API

Use the following functions to control the assistant's speaking animation:

```js
assistant.setSpeaking(true);
```

This activates the speaking animation. The mouth switches to a smooth, continuously moving canvas waveform.

To stop the speaking animation:

```js
assistant.setSpeaking(false);
```

The mouth will smoothly return to its normal state.

---

## Other API Hooks

### Wake the Assistant

```js
assistant.wakeAssistant();
```

This resets the assistant's boredom state and restores its alertness.

You can call this whenever your application detects user interaction.

### Demo Speech

```js
assistant.demoSpeak("Hello, I am your assistant.");
```

This uses the browser's built-in `speechSynthesis` API to speak the provided text.

The speaking animation automatically starts while the speech is playing and returns to the neutral state when the speech finishes.

The demo speech system is completely separate from the core animation, so it can later be replaced with a real TTS or AI-based speech system.

---

## Interaction Hook

Currently, any click or keypress calls:

```js
assistant.wakeAssistant();
```

This is only a placeholder interaction hook.

If your application already has its own interaction system, remove this listener and connect `wakeAssistant()` to your own trigger instead.

---

# Quick Testing

## 1. Test the Speaking Animation

Open the webpage and open the browser's Developer Tools:

**F12 → Console**

Then run:

```js
assistant.setSpeaking(true);
```

The assistant's mouth should immediately switch to the animated waveform.

To stop it:

```js
assistant.setSpeaking(false);
```

The mouth should smoothly return to its neutral state.

---

## 2. Test the Built-in Speech Demo

Run this in the browser console:

```js
assistant.demoSpeak(
    "Hello, I am your assistant. Testing the waveform animation."
);
```

The browser will speak the text using its built-in text-to-speech system.

The mouth animation will remain active while the speech is playing and will automatically return to the neutral state when the speech finishes.

---

## API Summary

| Function                       | Purpose                             |
| ------------------------------ | ----------------------------------- |
| `assistant.setSpeaking(true)`  | Start speaking animation            |
| `assistant.setSpeaking(false)` | Stop speaking animation             |
| `assistant.wakeAssistant()`    | Reset boredom and restore alertness |
| `assistant.demoSpeak("text")`  | Speak text using browser TTS        |
