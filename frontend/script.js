document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // ELEMENTS
    // =========================================================

    const micButton = document.getElementById('micButton');
    const voiceControl = document.querySelector('.voice-control');
    const tapText = document.querySelector('.tap-text');

    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const selectedLangElement = document.getElementById('selectedLang');

    const typeBtn = document.getElementById('typeBtn');
    const transitionOverlay = document.getElementById('transitionOverlay');

    const inboxBtn = document.getElementById('inboxBtn');
    const messageBadge = document.getElementById('messageBadge');


    // =========================================================
    // MICROPHONE / VOICE CONTROL
    // =========================================================

    let isListening = false;

    if (micButton) {

        micButton.addEventListener('click', () => {

            isListening = !isListening;

            if (isListening) {

                // Activate listening animation
                if (voiceControl) {
                    voiceControl.classList.add('listening');
                }

                micButton.style.backgroundColor = '#0a4d2e';
                micButton.style.transform = 'scale(1.1)';

                if (tapText) {
                    tapText.textContent = "Listening...";
                }

            } else {

                // Deactivate listening animation
                if (voiceControl) {
                    voiceControl.classList.remove('listening');
                }

                micButton.style.backgroundColor = '#1b7a43';
                micButton.style.transform = 'scale(1)';

                if (tapText) {
                    tapText.textContent = "Tap to speak";
                }
            }
        });
    }


    // =========================================================
    // LANGUAGE TRANSLATIONS
    // =========================================================

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


    // =========================================================
    // LANGUAGE DROPDOWN
    // =========================================================

    if (langBtn && langDropdown) {

        // Open / close language dropdown
        langBtn.addEventListener('click', (e) => {

            e.stopPropagation();

            langDropdown.classList.toggle('show');
        });
    }


    // =========================================================
    // LANGUAGE SELECTION
    // =========================================================

    const allDropdownItems =
        document.querySelectorAll('.dropdown-item');

    allDropdownItems.forEach(item => {

        item.addEventListener('click', (e) => {

            e.stopPropagation();

            const languageCode =
                item.getAttribute('data-lang');

            // Make sure selected language exists
            if (!translations[languageCode]) {
                return;
            }

            // Update all translated elements
            document
                .querySelectorAll('[data-translate]')
                .forEach(elem => {

                    const key =
                        elem.getAttribute('data-translate');

                    if (translations[languageCode][key]) {

                        elem.innerHTML =
                            translations[languageCode][key];
                    }
                });


            // Update language selector text
            if (selectedLangElement) {

                selectedLangElement.innerHTML =
                    translations[languageCode].selector;
            }


            // Close dropdown
            if (langDropdown) {

                langDropdown.classList.remove('show');
            }
        });
    });


    // =========================================================
    // CLOSE LANGUAGE DROPDOWN WHEN CLICKING OUTSIDE
    // =========================================================

    document.addEventListener('click', (e) => {

        if (
            langBtn &&
            langDropdown &&
            !langBtn.contains(e.target)
        ) {

            langDropdown.classList.remove('show');
        }
    });


    // =========================================================
    // CONTROL BUTTON HOVER / CLICK EFFECT
    // =========================================================

    const controlBtns =
        document.querySelectorAll('.control-btn');

    controlBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            btn.style.transform = 'scale(0.95)';

            setTimeout(() => {

                btn.style.transform =
                    'translateY(-3px)';

            }, 100);
        });
    });


    // =========================================================
    // NOTIFICATION BADGE SYSTEM
    // =========================================================

    /*
        The notification badge is controlled by the backend.

        Expected backend response:

        {
            "unreadCount": 3
        }

        Result:

        🔔 3

        If unreadCount = 0:

        🔔

        No red badge will be shown.
    */

    function updateNotificationBadge(count) {

        if (!messageBadge) {
            return;
        }

        // Make sure count is a valid number
        count = Number(count) || 0;

        if (count > 0) {

            // Show notification number
            messageBadge.textContent = count;

            messageBadge.style.display = 'flex';

        } else {

            // Hide badge when there are no unread notifications
            messageBadge.textContent = '';

            messageBadge.style.display = 'none';
        }
    }


    // =========================================================
    // FETCH NOTIFICATIONS FROM BACKEND
    // =========================================================

    async function fetchInboxData() {

        try {

            const response =
                await fetch('/api/messages');

            // If backend returns an error
            if (!response.ok) {

                throw new Error(
                    `Notification API returned ${response.status}`
                );
            }

            const data =
                await response.json();

            /*
                Expected:

                {
                    "unreadCount": number
                }
            */

            updateNotificationBadge(
                data.unreadCount
            );

        } catch (error) {

            /*
                Backend notification system may not exist yet.

                We don't show an error to the user.
                The rest of SIA continues working normally.
            */

            console.log(
                'Notification service not available yet.'
            );
        }
    }


    // =========================================================
    // INITIAL NOTIFICATION STATE
    // =========================================================

    // Start with no visible notification badge
    updateNotificationBadge(0);


    // =========================================================
    // AUTOMATIC NOTIFICATION CHECKING
    // =========================================================

    /*
        Check the backend when the page loads.
    */

    fetchInboxData();


    /*
        Check again every 30 seconds.

        When the backend starts sending notifications,
        the badge will automatically update.
    */

    setInterval(() => {

        fetchInboxData();

    }, 30000);


    // =========================================================
    // OPEN NOTIFICATION / INBOX PAGE
    // =========================================================

    if (inboxBtn) {

        inboxBtn.addEventListener('click', () => {

            if (transitionOverlay) {

                transitionOverlay.classList.add('expand');

                setTimeout(() => {

                    window.location.href = 'mail.html';

                }, 700);

            } else {

                window.location.href = 'mail.html';
            }
        });
    }


    // =========================================================
    // TYPE INSTEAD BUTTON
    // =========================================================

    if (typeBtn) {

        typeBtn.addEventListener('click', () => {

            if (transitionOverlay) {

                // Start white transition animation
                transitionOverlay.classList.add('expand');

                // Open chat page after animation
                setTimeout(() => {

                    window.location.href = 'chat.html';

                }, 700);

            } else {

                window.location.href = 'chat.html';
            }
        });
    }


    // =========================================================
    // END
    // =========================================================

});