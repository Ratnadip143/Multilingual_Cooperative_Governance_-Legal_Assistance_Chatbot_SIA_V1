document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('micButton');
    const voiceControl = document.querySelector('.voice-control');
    const tapText = document.querySelector('.tap-text');
    let isListening = false;

    // Toggle Listening State
    micButton.addEventListener('click', () => {
        isListening = !isListening;
        
        if (isListening) {
            // Activate animation
            voiceControl.classList.add('listening');
            micButton.style.backgroundColor = '#0a4d2e'; // Darker green
            micButton.style.transform = 'scale(1.1)';
            tapText.textContent = "Listening...";
        } else {
            // Deactivate animation
            voiceControl.classList.remove('listening');
            micButton.style.backgroundColor = '#1b7a43'; // Normal green
            micButton.style.transform = 'scale(1)';
            tapText.textContent = "Tap to speak";
        }
    });

    // Add gentle hover effects to the language and keyboard buttons
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // A small ripple or click effect could go here
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'translateY(-3px)'; // returns to hover state
            }, 100);
        });
    });
});