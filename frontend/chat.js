// --- 1. Translation Data ---
const translations = {
    en: {
        header_title: "Cooperative & Government Assistance AI",
        header_subtitle: "Your Voice | Your Language | Your Rights | Our Support",
        bot_intro: "<strong>Namaste!</strong><br>I am SIA, your cooperative and government assistance AI.<br>How can I help you today?",
        chip_find: "Find Schemes",
        chip_eligibility: "Check Eligibility",
        chip_laws: "Cooperative Laws",
        chip_apply: "How to Apply?",
        user_msg_1: "What schemes are available for farmers?",
        input_placeholder: "Type your message here...",
        input_hint: "You can speak in Hindi, English, Punjabi or your preferred language.",
        alert_title: "🔔 New Scheme Alert",
        alert_badge: "New",
        alert_heading: "Integrated Cooperative Development Scheme 2026",
        alert_desc: "A new scheme has been launched for strengthening cooperative societies.",
        alert_link: "View Details →",
        qa_title: "⚡ Quick Actions",
        qa_find_title: "🔍 Find Schemes",
        qa_find_desc: "Search government schemes",
        qa_eligibility_title: "📄 Check Eligibility",
        qa_eligibility_desc: "See if you are eligible",
        qa_apply_title: "❓ How to Apply?",
        qa_apply_desc: "Step-by-step guide",
        qa_pacs_title: "👥 PACS Support",
        qa_pacs_desc: "Get help for PACS",
        qa_laws_title: "⚖️ Cooperative Laws",
        qa_laws_desc: "Know your rights",
        qa_faq_title: "📖 FAQs",
        qa_faq_desc: "Common questions",
        lang_title: "🌐 Language / भाषा",
        footer_quote: '"Cooperatives Build a Better Tomorrow"'
    },
    hi: {
        header_title: "सहकारी और सरकारी सहायता एआई",
        header_subtitle: "आपकी आवाज़ | आपकी भाषा | आपके अधिकार | हमारा समर्थन",
        bot_intro: "<strong>नमस्ते!</strong><br>मैं SIA हूँ, आपका सहकारी और सरकारी सहायता एआई।<br>आज मैं आपकी कैसे मदद कर सकती हूँ?",
        chip_find: "योजनाएं खोजें",
        chip_eligibility: "पात्रता जांचें",
        chip_laws: "सहकारी कानून",
        chip_apply: "आवेदन कैसे करें?",
        user_msg_1: "किसानों के लिए कौन सी योजनाएं उपलब्ध हैं?",
        input_placeholder: "अपना संदेश यहां टाइप करें...",
        input_hint: "आप हिंदी, अंग्रेजी, पंजाबी या अपनी पसंदीदा भाषा में बोल सकते हैं।",
        alert_title: "🔔 नई योजना अलर्ट",
        alert_badge: "नया",
        alert_heading: "एकीकृत सहकारी विकास योजना 2026",
        alert_desc: "सहकारी समितियों को मजबूत करने के लिए एक नई योजना शुरू की गई है।",
        alert_link: "विवरण देखें →",
        qa_title: "⚡ त्वरित कार्रवाइयां",
        qa_find_title: "🔍 योजनाएं खोजें",
        qa_find_desc: "सरकारी योजनाएं खोजें",
        qa_eligibility_title: "📄 पात्रता जांचें",
        qa_eligibility_desc: "देखें कि क्या आप पात्र हैं",
        qa_apply_title: "❓ आवेदन कैसे करें?",
        qa_apply_desc: "चरण-दर-चरण मार्गदर्शिका",
        qa_pacs_title: "👥 पैक्स समर्थन",
        qa_pacs_desc: "पैक्स के लिए मदद पाएं",
        qa_laws_title: "⚖️ सहकारी कानून",
        qa_laws_desc: "अपने अधिकार जानें",
        qa_faq_title: "📖 सामान्य प्रश्न",
        qa_faq_desc: "अक्सर पूछे जाने वाले प्रश्न",
        lang_title: "🌐 भाषा / Language",
        footer_quote: '"सहकारिता एक बेहतर कल का निर्माण करती है"'
    },
    pa: {
        header_title: "ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਏਆਈ",
        header_subtitle: "ਤੁਹਾਡੀ ਆਵਾਜ਼ | ਤੁਹਾਡੀ ਭਾਸ਼ਾ | ਤੁਹਾਡੇ ਅਧਿਕਾਰ | ਸਾਡਾ ਸਮਰਥਨ",
        bot_intro: "<strong>ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ!</strong><br>ਮੈਂ SIA ਹਾਂ, ਤੁਹਾਡੀ ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਏਆਈ।<br>ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?",
        chip_find: "ਸਕੀਮਾਂ ਲੱਭੋ",
        chip_eligibility: "ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
        chip_laws: "ਸਹਿਕਾਰੀ ਕਾਨੂੰਨ",
        chip_apply: "ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?",
        user_msg_1: "ਕਿਸਾਨਾਂ ਲਈ ਕਿਹੜੀਆਂ ਸਕੀਮਾਂ ਉਪਲਬਧ ਹਨ?",
        input_placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਇੱਥੇ ਟਾਈਪ ਕਰੋ...",
        input_hint: "ਤੁਸੀਂ ਹਿੰਦੀ, ਅੰਗਰੇਜ਼ੀ, ਪੰਜਾਬੀ ਜਾਂ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ।",
        alert_title: "🔔 ਨਵੀਂ ਸਕੀਮ ਅਲਰਟ",
        alert_badge: "ਨਵਾਂ",
        alert_heading: "ਏਕੀਕ੍ਰਿਤ ਸਹਿਕਾਰੀ ਵਿਕਾਸ ਸਕੀਮ 2026",
        alert_desc: "ਸਹਿਕਾਰੀ ਸਭਾਵਾਂ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ ਇੱਕ ਨਵੀਂ ਸਕੀਮ ਸ਼ੁਰੂ ਕੀਤੀ ਗਈ ਹੈ।",
        alert_link: "ਵੇਰਵੇ ਦੇਖੋ →",
        qa_title: "⚡ ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
        qa_find_title: "🔍 ਸਕੀਮਾਂ ਲੱਭੋ",
        qa_find_desc: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਦੀ ਖੋਜ ਕਰੋ",
        qa_eligibility_title: "📄 ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
        qa_eligibility_desc: "ਦੇਖੋ ਕਿ ਕੀ ਤੁਸੀਂ ਯੋਗ ਹੋ",
        qa_apply_title: "❓ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?",
        qa_apply_desc: "ਕਦਮ-ਦਰ-ਕਦਮ ਗਾਈਡ",
        qa_pacs_title: "👥 PACS ਸਹਿਯੋਗ",
        qa_pacs_desc: "PACS ਲਈ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ",
        qa_laws_title: "⚖️ ਸਹਿਕਾਰੀ ਕਾਨੂੰਨ",
        qa_laws_desc: "ਆਪਣੇ ਅਧਿਕਾਰ ਜਾਣੋ",
        qa_faq_title: "📖 ਆਮ ਸਵਾਲ",
        qa_faq_desc: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
        lang_title: "🌐 ਭਾਸ਼ਾ / Language",
        footer_quote: '"ਸਹਿਕਾਰਤਾ ਇੱਕ ਬਿਹਤਰ ਕੱਲ੍ਹ ਦਾ ਨਿਰਮਾਣ ਕਰਦੀ ਹੈ"'
    },
    bn: {
        header_title: "সমবায় এবং সরকারী সহায়তা এআই",
        header_subtitle: "আপনার ভয়েস | আপনার ভাষা | আপনার অধিকার | আমাদের সমর্থন",
        bot_intro: "<strong>নমস্কার!</strong><br>আমি SIA, আপনার সমবায় এবং সরকারী সহায়তা এআই।<br>আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        chip_find: "স্কিম খুঁজুন",
        chip_eligibility: "যোগ্যতা যাচাই করুন",
        chip_laws: "সমবায় আইন",
        chip_apply: "কীভাবে আবেদন করবেন?",
        user_msg_1: "কৃষকদের জন্য কী কী স্কিম রয়েছে?",
        input_placeholder: "এখানে আপনার বার্তা টাইপ করুন...",
        input_hint: "আপনি হিন্দি, ইংরেজি, পাঞ্জাবি বা আপনার পছন্দের ভাষায় কথা বলতে পারেন।",
        alert_title: "🔔 নতুন স্কিম অ্যালার্ট",
        alert_badge: "নতুন",
        alert_heading: "সমন্বিত সমবায় উন্নয়ন স্কিম 2026",
        alert_desc: "সমবায় সমিতি শক্তিশালী করার জন্য একটি নতুন স্কিম চালু করা হয়েছে।",
        alert_link: "বিস্তারিত দেখুন →",
        qa_title: "⚡ দ্রুত পদক্ষেপ",
        qa_find_title: "🔍 স্কিম খুঁজুন",
        qa_find_desc: "সরকারি স্কিম খুঁজুন",
        qa_eligibility_title: "📄 যোগ্যতা যাচাই",
        qa_eligibility_desc: "আপনি যোগ্য কিনা দেখুন",
        qa_apply_title: "❓ আবেদন পদ্ধতি",
        qa_apply_desc: "ধাপে ধাপে নির্দেশিকা",
        qa_pacs_title: "👥 PACS সমর্থন",
        qa_pacs_desc: "PACS এর জন্য সাহায্য পান",
        qa_laws_title: "⚖️ সমবায় আইন",
        qa_laws_desc: "আপনার অধিকার জানুন",
        qa_faq_title: "📖 সাধারণ প্রশ্ন",
        qa_faq_desc: "সচরাচর জিজ্ঞাস্য",
        lang_title: "🌐 ভাষা / Language",
        footer_quote: '"সমবায় একটি উন্নত আগামী গড়ে তোলে"'
    },
    ta: {
        header_title: "கூட்டுறவு மற்றும் அரசு உதவி AI",
        header_subtitle: "உங்கள் குரல் | உங்கள் மொழி | உங்கள் உரிமைகள் | எங்கள் ஆதரவு",
        bot_intro: "<strong>வணக்கம்!</strong><br>நான் SIA, உங்கள் கூட்டுறவு மற்றும் அரசு உதவி AI.<br>இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        chip_find: "திட்டங்களை தேடுங்கள்",
        chip_eligibility: "தகுதியை சரிபார்க்கவும்",
        chip_laws: "கூட்டுறவு சட்டங்கள்",
        chip_apply: "விண்ணப்பிப்பது எப்படி?",
        user_msg_1: "விவசாயிகளுக்கு என்ன திட்டங்கள் உள்ளன?",
        input_placeholder: "உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்...",
        input_hint: "நீங்கள் ஹிந்தி, ஆங்கிலம், பஞ்சாபி அல்லது உங்கள் விருப்பமான மொழியில் பேசலாம்.",
        alert_title: "🔔 புதிய திட்ட அறிவிப்பு",
        alert_badge: "புதியது",
        alert_heading: "ஒருங்கிணைந்த கூட்டுறவு மேம்பாட்டுத் திட்டம் 2026",
        alert_desc: "கூட்டுறவு சங்கங்களை வலுப்படுத்த புதிய திட்டம் தொடங்கப்பட்டுள்ளது.",
        alert_link: "விவரங்களைக் காண்க →",
        qa_title: "⚡ விரைவான செயல்கள்",
        qa_find_title: "🔍 திட்டங்களை தேடுங்கள்",
        qa_find_desc: "அரசு திட்டங்களை தேடுங்கள்",
        qa_eligibility_title: "📄 தகுதியை சரிபார்க்கவும்",
        qa_eligibility_desc: "நீங்கள் தகுதியானவரா என்று பாருங்கள்",
        qa_apply_title: "❓ விண்ணப்பிப்பது எப்படி?",
        qa_apply_desc: "படிப்படியான வழிகாட்டி",
        qa_pacs_title: "👥 PACS ஆதரவு",
        qa_pacs_desc: "PACS க்கான உதவியைப் பெறுங்கள்",
        qa_laws_title: "⚖️ கூட்டுறவு சட்டங்கள்",
        qa_laws_desc: "உங்கள் உரிமைகளை அறியுங்கள்",
        qa_faq_title: "📖 பொதுவான கேள்விகள்",
        qa_faq_desc: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        lang_title: "🌐 மொழி / Language",
        footer_quote: '"கூட்டுறவு சிறந்த நாளையை உருவாக்குகிறது"'
    },
    mr: {
        header_title: "सहकारी आणि सरकारी मदत एआय",
        header_subtitle: "तुमचा आवाज | तुमची भाषा | तुमचे हक्क | आमचा पाठिंबा",
        bot_intro: "<strong>नमस्कार!</strong><br>मी SIA आहे, तुमची सहकारी आणि सरकारी मदत एआय.<br>आज मी तुम्हाला कशी मदत करू शकेन?",
        chip_find: "योजना शोधा",
        chip_eligibility: "पात्रता तपासा",
        chip_laws: "सहकारी कायदे",
        chip_apply: "अर्ज कसा करावा?",
        user_msg_1: "शेतकऱ्यांसाठी कोणत्या योजना उपलब्ध आहेत?",
        input_placeholder: "तुमचा संदेश येथे टाईप करा...",
        input_hint: "तुम्ही हिंदी, इंग्रजी, पंजाबी किंवा तुमच्या आवडीच्या भाषेत बोलू शकता.",
        alert_title: "🔔 नवीन योजना अलर्ट",
        alert_badge: "नवीन",
        alert_heading: "एकात्मिक सहकारी विकास योजना 2026",
        alert_desc: "सहकारी संस्था बळकट करण्यासाठी नवीन योजना सुरू करण्यात आली आहे.",
        alert_link: "तपशील पहा →",
        qa_title: "⚡ त्वरित कृती",
        qa_find_title: "🔍 योजना शोधा",
        qa_find_desc: "सरकारी योजना शोधा",
        qa_eligibility_title: "📄 पात्रता तपासा",
        qa_eligibility_desc: "तुम्ही पात्र आहात का ते पहा",
        qa_apply_title: "❓ अर्ज कसा करावा?",
        qa_apply_desc: "टप्प्याटप्प्याने मार्गदर्शक",
        qa_pacs_title: "👥 PACS समर्थन",
        qa_pacs_desc: "PACS साठी मदत मिळवा",
        qa_laws_title: "⚖️ सहकारी कायदे",
        qa_laws_desc: "तुमचे हक्क जाणून घ्या",
        qa_faq_title: "📖 सामान्य प्रश्न",
        qa_faq_desc: "वारंवार विचारले जाणारे प्रश्न",
        lang_title: "🌐 भाषा / Language",
        footer_quote: '"सहकार एक उत्तम उद्या घडवतो"'
    }
};

// --- 2. Change Language Function ---
function changeLanguage(langCode) {
    if (!translations[langCode]) return;

    // Update standard HTML elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[langCode][key]) {
            element.innerHTML = translations[langCode][key];
        }
    });

    // Update placeholders on inputs
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[langCode][key]) {
            element.placeholder = translations[langCode][key];
        }
    });
}

// --- 3. Dropdown Logic ---
const moreLangBtn = document.getElementById("more-btn"); // ID from HTML
const moreDropdown = document.querySelector(".dropdown");

if (moreLangBtn && moreDropdown) {
    // Toggle the 'show' class when the button is clicked
    moreLangBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents click from bubbling up
        moreDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking anywhere else on the page
    document.addEventListener("click", function (event) {
        if (!moreDropdown.contains(event.target)) {
            moreDropdown.classList.remove("show");
        }
    });
}

// --- 4. Attach Listeners to Language Buttons ---
// Select elements with data-lang (catches both main buttons and dropdown items)
const langButtons = document.querySelectorAll('[data-lang]');

langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const langCode = this.getAttribute('data-lang');
        
        if (langCode) {
            // Remove active class from all main buttons
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class. If it's a dropdown item, highlight the "More" button instead.
            if (this.classList.contains('dropdown-item') && moreLangBtn) {
                moreLangBtn.classList.add('active');
            } else {
                this.classList.add('active');
            }
            
            // Execute translation
            changeLanguage(langCode);
            
            // Close dropdown if it's open
            if (moreDropdown) {
                moreDropdown.classList.remove("show");
            }
        }
    });
});

// --- 5. Chat Functionality (Existing) ---
const inputField = document.getElementById('chat-input');
const chatHistory = document.getElementById('chat-history');

if (inputField) {
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

async function sendMessage() {
    if (!inputField || !chatHistory) return;
    
    const text = inputField.value.trim();
    if (text === '') return;

    const userHTML = `
        <div class="message-row user">
            <div class="message-content">
                <div class="bubble">${text}</div>
                <span class="time">${getCurrentTime()} ✓✓</span>
            </div>
        </div>
    `;
    chatHistory.insertAdjacentHTML('beforeend', userHTML);
    inputField.value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        appendBotMessage(data.reply);
    } catch (error) {
        console.error("Error:", error);
        appendBotMessage("Sorry, server error.");
    }
}

function appendBotMessage(botText) {
    if (!chatHistory) return;
    
    const botHTML = `
        <div class="message-row bot">
            <div class="avatar">🤖</div>
            <div class="message-content">
                <div class="bubble">${botText}</div>
                <span class="time">${getCurrentTime()}</span>
            </div>
        </div>
    `;
    chatHistory.insertAdjacentHTML('beforeend', botHTML);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}