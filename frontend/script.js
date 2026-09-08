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


            // Get dropdown elements
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        const selectedLang = document.getElementById('selectedLang');

        // 1. Toggle dropdown when button is clicked
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling up to the document
            langDropdown.classList.toggle('show');
        });

        // 2. Handle selecting a language
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents triggering the button click again
                
                // Optional: Update the button text to show what was selected
                // selectedLang.innerHTML = `${item.textContent} ▼`;
                
                // Close the menu
                langDropdown.classList.remove('show');
            });
        });

// 3. Close dropdown if the user clicks anywhere else on the screen
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target)) {
        langDropdown.classList.remove('show');
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

    // Function to fetch message data from your backend
async function fetchInboxData() {
    try {
        // Replace this URL with your actual backend endpoint
        const response = await fetch('http://localhost:3000/api/messages');
        const data = await response.json();
        
        const badge = document.getElementById('messageBadge');
        
        // Update the UI based on what the backend sends back
        if (data.unreadCount > 0) {
            badge.textContent = data.unreadCount;
            badge.style.display = 'block'; // Show badge
        } else {
            badge.style.display = 'none'; // Hide badge if 0 messages
        }
    } catch (error) {
        console.error('Error connecting to backend:', error);
    }
}

// Call the function when the page loads to check for messages
// Uncomment the line below when your backend is ready!
// fetchInboxData(); 

    // Open the inbox after the existing top-right transition completes.
    const inboxBtn = document.getElementById('inboxBtn');
    inboxBtn.addEventListener('click', () => {
        transitionOverlay.classList.add('expand');

        setTimeout(() => {
            window.location.href = 'mail.html';
        }, 700);
    });

    // Translation Dictionary
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

// Update the language selection click event
const allDropdownItems = document.querySelectorAll('.dropdown-item');
allDropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        // Get the language code (en, hi, bn, etc.)
        const selectedLang = item.getAttribute('data-lang');
        
        // Update all translated text on the page
        document.querySelectorAll('[data-translate]').forEach(elem => {
            const key = elem.getAttribute('data-translate');
            if(translations[selectedLang][key]) {
                elem.innerHTML = translations[selectedLang][key];
            }
        });

        // Update the button text itself
        document.getElementById('selectedLang').innerHTML = translations[selectedLang].selector;
        
        // Close the menu
        document.getElementById('langDropdown').classList.remove('show');
    });
    });
});


// Get the button and the overlay
const typeBtn = document.getElementById('typeBtn');
const transitionOverlay = document.getElementById('transitionOverlay');

typeBtn.addEventListener('click', () => {
    // 1. Start the white expansion animation
    transitionOverlay.classList.add('expand');
    
    // 2. Wait for the animation to finish (700 milliseconds), then change the page
    setTimeout(() => {
        // Replace 'chat.html' with the actual name of your next HTML file
        window.location.href = 'chat.html'; 
    }, 700);
});