/* =========================================================
   SIA — SMART COOPERATIVE AI
   Chat Functionality
   ========================================================= */


/* =========================
   ELEMENTS
========================= */

const languageSelector =
    document.getElementById("language-selector");

const messageInput =
    document.getElementById("message-input");

const sendButton =
    document.getElementById("send-button");

const chatMessages =
    document.getElementById("chat-messages");

const sessionTimer =
    document.getElementById("session-timer");

const settingsButton =
    document.getElementById("settings-button");

const settingsPanel =
    document.getElementById("settings-panel");

const closeSettings =
    document.getElementById("close-settings");

const notificationButton =
    document.getElementById("notification-button");

const notificationPanel =
    document.getElementById("notification-panel");

const closeNotifications =
    document.getElementById("close-notifications");

const quickButtons =
    document.querySelectorAll(".quick-card");


/* =========================
   SESSION TIMER
========================= */

let elapsedSeconds = 0;

function updateTimer() {

    elapsedSeconds++;

    const minutes =
        Math.floor(elapsedSeconds / 60);

    const seconds =
        elapsedSeconds % 60;

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(seconds).padStart(2, "0");

    if (sessionTimer) {
        sessionTimer.textContent =
            `${formattedMinutes}:${formattedSeconds}`;
    }
}

setInterval(updateTimer, 1000);


/* =========================
   LANGUAGE DATA
========================= */

const translations = {

    en: {
        title: "Smart Cooperative AI",
        subtitle:
            "Your Voice • Your Language • Your Rights • Your Support",

        quickLabel: "QUICK ASSISTANCE",
        quickTitle: "How can we help?",
        quickDescription:
            "Choose an option or ask SIA anything below.",

        assistant:
            "SIA Assistant",

        assistantSubtitle:
            "Cooperative & Government Assistance AI",

        online:
            "Online",

        welcome:
            "Namaste! 🙏",

        welcomeText:
            "I am SIA, your Cooperative and Government Assistance AI.",

        welcomeQuestion:
            "How can I help you today?",

        placeholder:
            "Type your message...",

        hint:
            "You can write in English, Hindi, Bengali, Punjabi or your preferred language.",

        enter:
            "Enter ↵ to send",

        schemes:
            "Find Schemes",

        eligibility:
            "Check Eligibility",

        laws:
            "Cooperative Laws",

        apply:
            "How to Apply?",

        pacs:
            "PACS Support",

        faq:
            "FAQs"
    },


    hi: {
        title: "स्मार्ट कोऑपरेटिव AI",
        subtitle:
            "आपकी आवाज़ • आपकी भाषा • आपके अधिकार • आपका सहयोग",

        quickLabel: "त्वरित सहायता",
        quickTitle: "हम आपकी कैसे मदद कर सकते हैं?",
        quickDescription:
            "कोई विकल्प चुनें या SIA से कुछ भी पूछें।",

        assistant:
            "SIA सहायक",

        assistantSubtitle:
            "सहकारी एवं सरकारी सहायता AI",

        online:
            "ऑनलाइन",

        welcome:
            "नमस्ते! 🙏",

        welcomeText:
            "मैं SIA हूँ, आपका सहकारी और सरकारी सहायता AI।",

        welcomeQuestion:
            "मैं आज आपकी कैसे मदद कर सकता हूँ?",

        placeholder:
            "अपना संदेश लिखें...",

        hint:
            "आप हिंदी, अंग्रेज़ी, बंगाली, पंजाबी या अपनी पसंदीदा भाषा में लिख सकते हैं।",

        enter:
            "भेजने के लिए Enter ↵ दबाएँ",

        schemes:
            "योजनाएँ खोजें",

        eligibility:
            "पात्रता जाँचें",

        laws:
            "सहकारी कानून",

        apply:
            "आवेदन कैसे करें?",

        pacs:
            "PACS सहायता",

        faq:
            "सामान्य प्रश्न"
    },


    bn: {
        title: "স্মার্ট কোঅপারেটিভ AI",
        subtitle:
            "আপনার কণ্ঠ • আপনার ভাষা • আপনার অধিকার • আপনার সহায়তা",

        quickLabel: "দ্রুত সহায়তা",
        quickTitle: "আমরা কীভাবে সাহায্য করতে পারি?",
        quickDescription:
            "একটি বিকল্প বেছে নিন অথবা SIA-কে যেকোনো প্রশ্ন করুন।",

        assistant:
            "SIA সহায়ক",

        assistantSubtitle:
            "সমবায় ও সরকারি সহায়তা AI",

        online:
            "অনলাইন",

        welcome:
            "নমস্কার! 🙏",

        welcomeText:
            "আমি SIA, আপনার সমবায় ও সরকারি সহায়তা AI।",

        welcomeQuestion:
            "আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",

        placeholder:
            "আপনার বার্তা লিখুন...",

        hint:
            "আপনি বাংলা, ইংরেজি, হিন্দি, পাঞ্জাবি বা আপনার পছন্দের ভাষায় লিখতে পারেন।",

        enter:
            "পাঠাতে Enter ↵ চাপুন",

        schemes:
            "স্কিম খুঁজুন",

        eligibility:
            "যোগ্যতা যাচাই করুন",

        laws:
            "সমবায় আইন",

        apply:
            "কীভাবে আবেদন করবেন?",

        pacs:
            "PACS সহায়তা",

        faq:
            "সাধারণ প্রশ্ন"
    },


    pa: {
        title: "ਸਮਾਰਟ ਕੋਆਪਰੇਟਿਵ AI",
        subtitle:
            "ਤੁਹਾਡੀ ਆਵਾਜ਼ • ਤੁਹਾਡੀ ਭਾਸ਼ਾ • ਤੁਹਾਡੇ ਅਧਿਕਾਰ • ਤੁਹਾਡੀ ਸਹਾਇਤਾ",

        quickLabel: "ਤੁਰੰਤ ਸਹਾਇਤਾ",
        quickTitle: "ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?",
        quickDescription:
            "ਇੱਕ ਵਿਕਲਪ ਚੁਣੋ ਜਾਂ SIA ਨੂੰ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।",

        assistant:
            "SIA ਸਹਾਇਕ",

        assistantSubtitle:
            "ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸਹਾਇਤਾ AI",

        online:
            "ਆਨਲਾਈਨ",

        welcome:
            "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🙏",

        welcomeText:
            "ਮੈਂ SIA ਹਾਂ, ਤੁਹਾਡਾ ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸਹਾਇਤਾ AI।",

        welcomeQuestion:
            "ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",

        placeholder:
            "ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...",

        hint:
            "ਤੁਸੀਂ ਪੰਜਾਬੀ, ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ, ਬੰਗਾਲੀ ਜਾਂ ਆਪਣੀ ਪਸੰਦ ਦੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖ ਸਕਦੇ ਹੋ।",

        enter:
            "ਭੇਜਣ ਲਈ Enter ↵ ਦਬਾਓ",

        schemes:
            "ਸਕੀਮਾਂ ਲੱਭੋ",

        eligibility:
            "ਯੋਗਤਾ ਜਾਂਚੋ",

        laws:
            "ਸਹਿਕਾਰੀ ਕਾਨੂੰਨ",

        apply:
            "ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?",

        pacs:
            "PACS ਸਹਾਇਤਾ",

        faq:
            "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ"
    },


    ta: {
        title: "ஸ்மார்ட் கூட்டுறவு AI",
        subtitle:
            "உங்கள் குரல் • உங்கள் மொழி • உங்கள் உரிமைகள் • உங்கள் ஆதரவு",

        quickLabel: "விரைவு உதவி",
        quickTitle: "நாங்கள் எவ்வாறு உதவலாம்?",
        quickDescription:
            "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும் அல்லது SIA-விடம் கேளுங்கள்.",

        assistant:
            "SIA உதவியாளர்",

        assistantSubtitle:
            "கூட்டுறவு மற்றும் அரசு உதவி AI",

        online:
            "ஆன்லைன்",

        welcome:
            "வணக்கம்! 🙏",

        welcomeText:
            "நான் SIA, உங்கள் கூட்டுறவு மற்றும் அரசு உதவி AI.",

        welcomeQuestion:
            "இன்று நான் உங்களுக்கு எவ்வாறு உதவலாம்?",

        placeholder:
            "உங்கள் செய்தியை எழுதுங்கள்...",

        hint:
            "தமிழ், ஆங்கிலம், இந்தி, பெங்காலி, பஞ்சாபி அல்லது உங்களுக்கு விருப்பமான மொழியில் எழுதலாம்.",

        enter:
            "அனுப்ப Enter ↵ அழுத்தவும்",

        schemes:
            "திட்டங்களைக் கண்டறியவும்",

        eligibility:
            "தகுதியைச் சரிபார்க்கவும்",

        laws:
            "கூட்டுறவு சட்டங்கள்",

        apply:
            "எவ்வாறு விண்ணப்பிப்பது?",

        pacs:
            "PACS உதவி",

        faq:
            "அடிக்கடி கேட்கப்படும் கேள்விகள்"
    },


    mr: {
        title: "स्मार्ट कोऑपरेटिव AI",
        subtitle:
            "तुमचा आवाज • तुमची भाषा • तुमचे अधिकार • तुमचे सहाय्य",

        quickLabel: "जलद सहाय्य",
        quickTitle: "आम्ही तुम्हाला कशी मदत करू शकतो?",
        quickDescription:
            "पर्याय निवडा किंवा SIA ला काहीही विचारा.",

        assistant:
            "SIA सहाय्यक",

        assistantSubtitle:
            "सहकारी आणि सरकारी सहाय्य AI",

        online:
            "ऑनलाइन",

        welcome:
            "नमस्कार! 🙏",

        welcomeText:
            "मी SIA, तुमचा सहकारी आणि सरकारी सहाय्य AI आहे.",

        welcomeQuestion:
            "आज मी तुमची कशी मदत करू शकतो?",

        placeholder:
            "तुमचा संदेश लिहा...",

        hint:
            "तुम्ही मराठी, हिंदी, इंग्रजी, बंगाली, पंजाबी किंवा तुमच्या पसंतीच्या भाषेत लिहू शकता।",

        enter:
            "पाठवण्यासाठी Enter ↵ दाबा",

        schemes:
            "योजना शोधा",

        eligibility:
            "पात्रता तपासा",

        laws:
            "सहकारी कायदे",

        apply:
            "अर्ज कसा करावा?",

        pacs:
            "PACS सहाय्य",

        faq:
            "वारंवार विचारले जाणारे प्रश्न"
    },


    gu: {
        title: "સ્માર્ટ કો-ઓપરેટિવ AI",
        subtitle:
            "તમારો અવાજ • તમારી ભાષા • તમારા અધિકારો • તમારી સહાય",

        quickLabel: "ઝડપી સહાય",
        quickTitle: "અમે તમારી કેવી રીતે મદદ કરી શકીએ?",
        quickDescription:
            "વિકલ્પ પસંદ કરો અથવા SIA ને કંઈપણ પૂછો.",

        assistant:
            "SIA સહાયક",

        assistantSubtitle:
            "સહકારી અને સરકારી સહાય AI",

        online:
            "ઓનલાઇન",

        welcome:
            "નમસ્તે! 🙏",

        welcomeText:
            "હું SIA છું, તમારો સહકારી અને સરકારી સહાય AI.",

        welcomeQuestion:
            "આજે હું તમારી કેવી રીતે મદદ કરી શકું?",

        placeholder:
            "તમારો સંદેશ લખો...",

        hint:
            "તમે ગુજરાતી, હિન્દી, અંગ્રેજી, બંગાળી, પંજાબી અથવા તમારી પસંદની ભાષામાં લખી શકો છો.",

        enter:
            "મોકલવા માટે Enter ↵ દબાવો",

        schemes:
            "યોજનાઓ શોધો",

        eligibility:
            "પાત્રતા તપાસો",

        laws:
            "સહકારી કાયદા",

        apply:
            "અરજી કેવી રીતે કરવી?",

        pacs:
            "PACS સહાય",

        faq:
            "વારંવાર પૂછાતા પ્રશ્નો"
    },


    te: {
        title: "స్మార్ట్ కోఆపరేటివ్ AI",
        subtitle:
            "మీ స్వరం • మీ భాష • మీ హక్కులు • మీ సహాయం",

        quickLabel: "త్వరిత సహాయం",
        quickTitle: "మేము మీకు ఎలా సహాయం చేయగలం?",
        quickDescription:
            "ఒక ఎంపికను ఎంచుకోండి లేదా SIAని ఏదైనా అడగండి.",

        assistant:
            "SIA సహాయకుడు",

        assistantSubtitle:
            "సహకార మరియు ప్రభుత్వ సహాయ AI",

        online:
            "ఆన్‌లైన్",

        welcome:
            "నమస్తే! 🙏",

        welcomeText:
            "నేను SIA, మీ సహకార మరియు ప్రభుత్వ సహాయ AI.",

        welcomeQuestion:
            "ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",

        placeholder:
            "మీ సందేశాన్ని టైప్ చేయండి...",

        hint:
            "మీరు తెలుగు, హిందీ, ఇంగ్లీష్, బెంగాలీ, పంజాబీ లేదా మీకు ఇష్టమైన భాషలో వ్రాయవచ్చు.",

        enter:
            "పంపడానికి Enter ↵ నొక్కండి",

        schemes:
            "పథకాలను కనుగొనండి",

        eligibility:
            "అర్హతను తనిఖీ చేయండి",

        laws:
            "సహకార చట్టాలు",

        apply:
            "ఎలా దరఖాస్తు చేయాలి?",

        pacs:
            "PACS సహాయం",

        faq:
            "తరచుగా అడిగే ప్రశ్నలు"
    },


    kn: {
        title: "ಸ್ಮಾರ್ಟ್ ಕೋಆಪರೇಟಿವ್ AI",
        subtitle:
            "ನಿಮ್ಮ ಧ್ವನಿ • ನಿಮ್ಮ ಭಾಷೆ • ನಿಮ್ಮ ಹಕ್ಕುಗಳು • ನಿಮ್ಮ ಸಹಾಯ",

        quickLabel: "ತ್ವರಿತ ಸಹಾಯ",
        quickTitle: "ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        quickDescription:
            "ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ ಅಥವಾ SIA ಗೆ ಏನಾದರೂ ಕೇಳಿ.",

        assistant:
            "SIA ಸಹಾಯಕ",

        assistantSubtitle:
            "ಸಹಕಾರಿ ಮತ್ತು ಸರ್ಕಾರಿ ಸಹಾಯ AI",

        online:
            "ಆನ್‌ಲೈನ್",

        welcome:
            "ನಮಸ್ಕಾರ! 🙏",

        welcomeText:
            "ನಾನು SIA, ನಿಮ್ಮ ಸಹಕಾರಿ ಮತ್ತು ಸರ್ಕಾರಿ ಸಹಾಯ AI.",

        welcomeQuestion:
            "ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",

        placeholder:
            "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ...",

        hint:
            "ನೀವು ಕನ್ನಡ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್, ಬಂಗಾಳಿ, ಪಂಜಾಬಿ ಅಥವಾ ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಬಹುದು.",

        enter:
            "ಕಳುಹಿಸಲು Enter ↵ ಒತ್ತಿರಿ",

        schemes:
            "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",

        eligibility:
            "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",

        laws:
            "ಸಹಕಾರಿ ಕಾನೂನುಗಳು",

        apply:
            "ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?",

        pacs:
            "PACS ಸಹಾಯ",

        faq:
            "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು"
    },


    ml: {
        title: "സ്മാർട്ട് കോഓപ്പറേറ്റീവ് AI",
        subtitle:
            "നിങ്ങളുടെ ശബ്ദം • നിങ്ങളുടെ ഭാഷ • നിങ്ങളുടെ അവകാശങ്ങൾ • നിങ്ങളുടെ പിന്തുണ",

        quickLabel: "ദ്രുത സഹായം",
        quickTitle: "ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാം?",
        quickDescription:
            "ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ SIA-യോട് ചോദിക്കുക.",

        assistant:
            "SIA സഹായി",

        assistantSubtitle:
            "സഹകരണവും സർക്കാർ സഹായവും നൽകുന്ന AI",

        online:
            "ഓൺലൈൻ",

        welcome:
            "നമസ്കാരം! 🙏",

        welcomeText:
            "ഞാൻ SIA, നിങ്ങളുടെ സഹകരണവും സർക്കാർ സഹായവും നൽകുന്ന AI ആണ്.",

        welcomeQuestion:
            "ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",

        placeholder:
            "നിങ്ങളുടെ സന്ദേശം എഴുതുക...",

        hint:
            "നിങ്ങൾ മലയാളം, ഹിന്ദി, ഇംഗ്ലീഷ്, ബംഗാളി, പഞ്ചാബി അല്ലെങ്കിൽ നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഭാഷയിൽ എഴുതാം.",

        enter:
            "അയയ്ക്കാൻ Enter ↵ അമർത്തുക",

        schemes:
            "പദ്ധതികൾ കണ്ടെത്തുക",

        eligibility:
            "യോഗ്യത പരിശോധിക്കുക",

        laws:
            "സഹകരണ നിയമങ്ങൾ",

        apply:
            "എങ്ങനെ അപേക്ഷിക്കാം?",

        pacs:
            "PACS സഹായം",

        faq:
            "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ"
    },


    or: {
        title: "ସ୍ମାର୍ଟ କୋଅପରେଟିଭ୍ AI",
        subtitle:
            "ଆପଣଙ୍କ ସ୍ୱର • ଆପଣଙ୍କ ଭାଷା • ଆପଣଙ୍କ ଅଧିକାର • ଆପଣଙ୍କ ସହାୟତା",

        quickLabel: "ତ୍ୱରିତ ସହାୟତା",
        quickTitle: "ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?",
        quickDescription:
            "ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ କିମ୍ବା SIA କୁ ପଚାରନ୍ତୁ।",

        assistant:
            "SIA ସହାୟକ",

        assistantSubtitle:
            "ସମବାୟ ଏବଂ ସରକାରୀ ସହାୟତା AI",

        online:
            "ଅନଲାଇନ",

        welcome:
            "ନମସ୍କାର! 🙏",

        welcomeText:
            "ମୁଁ SIA, ଆପଣଙ୍କ ସମବାୟ ଏବଂ ସରକାରୀ ସହାୟତା AI।",

        welcomeQuestion:
            "ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପാരി സാഹായിക്കാം?",

        placeholder:
            "ആപ്പളുകളുടെ സന്ദേശം എഴുതുക...",
        hint:
            "ଆପଣ ଓଡ଼ିଆ, ହିନ୍ଦୀ, ଇଂରାଜୀ, ବଙ୍ଗାଳୀ, ପଞ୍ଜାବୀ କିମ୍ବା ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ ଲେଖିପାରିବେ।",

        enter:
            "ପଠାଇବା ପାଇଁ Enter ↵ ଦବାନ୍ତୁ",

        schemes:
            "ଯୋଜନା ଖୋଜନ୍ତୁ",

        eligibility:
            "ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ",

        laws:
            "ସମବାୟ ଆଇନ",

        apply:
            "କିପରି ଆବେଦନ କରିବେ?",

        pacs:
            "PACS ସହାୟତା",

        faq:
            "ସାଧାରଣ ପ୍ରଶ୍ନ"
    },


    as: {
        title: "স্মাৰ্ট কোঅপাৰেটিভ AI",
        subtitle:
            "আপোনাৰ কণ্ঠ • আপোনাৰ ভাষা • আপোনাৰ অধিকাৰ • আপোনাৰ সহায়তা",

        quickLabel: "দ্ৰুত সহায়তা",
        quickTitle: "আমি কেনেকৈ সহায় কৰিব পাৰোঁ?",
        quickDescription:
            "এটা বিকল্প বাছনি কৰক অথবা SIA-ক যিকোনো কথা সোধক।",

        assistant:
            "SIA সহায়ক",

        assistantSubtitle:
            "সমবায় আৰু চৰকাৰী সহায়তা AI",

        online:
            "অনলাইন",

        welcome:
            "নমস্কাৰ! 🙏",

        welcomeText:
            "মই SIA, আপোনাৰ সমবায় আৰু চৰকাৰী সহায়তা AI।",

        welcomeQuestion:
            "আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",

        placeholder:
            "আপোনাৰ বাৰ্তা লিখক...",

        hint:
            "আপুনি অসমীয়া, হিন্দী, ইংৰাজী, বাংলা, পাঞ্জাবী বা আপোনাৰ পছন্দৰ ভাষাত লিখিব পাৰে।",

        enter:
            "পঠিয়াবলৈ Enter ↵ টিপক",

        schemes:
            "আঁচনি বিচাৰক",

        eligibility:
            "যোগ্যতা পৰীক্ষা কৰক",

        laws:
            "সমবায় আইন",

        apply:
            "কেনেকৈ আবেদন কৰিব?",

        pacs:
            "PACS সহায়তা",

        faq:
            "সাধাৰণ প্ৰশ্ন"
    }

};


/* =========================
   CHANGE LANGUAGE
========================= */

function applyLanguage(language) {

    const t =
        translations[language] ||
        translations.en;


    /* Page title */

    const brandTitle =
        document.querySelector(".brand-text h1");

    const brandSubtitle =
        document.querySelector(".brand-text p");

    if (brandTitle)
        brandTitle.textContent = t.title;

    if (brandSubtitle)
        brandSubtitle.textContent = t.subtitle;


    /* Quick section */

    const sectionLabel =
        document.querySelector(".section-label");

    const sectionTitle =
        document.querySelector(".section-heading h2");

    const sectionDescription =
        document.querySelector(".section-heading p");

    if (sectionLabel)
        sectionLabel.textContent = t.quickLabel;

    if (sectionTitle)
        sectionTitle.textContent = t.quickTitle;

    if (sectionDescription)
        sectionDescription.textContent =
            t.quickDescription;


    /* Assistant */

    const assistantTitle =
        document.querySelector(".assistant-title h2");

    const assistantSubtitle =
        document.querySelector(".assistant-title p");

    const chatStatus =
        document.querySelector(".chat-status");

    if (assistantTitle)
        assistantTitle.textContent = t.assistant;

    if (assistantSubtitle)
        assistantSubtitle.textContent =
            t.assistantSubtitle;

    if (chatStatus)
        chatStatus.innerHTML =
            `<span class="online-dot"></span>${t.online}`;


    /* Input */

    if (messageInput)
        messageInput.placeholder =
            t.placeholder;


    const inputHint =
        document.getElementById("input-hint");

    if (inputHint)
        inputHint.textContent =
            t.hint;


    const enterHint =
        document.querySelector(".enter-hint");

    if (enterHint)
        enterHint.textContent =
            t.enter;


    /* Quick buttons */

    const quickText =
        document.querySelectorAll(".quick-text strong");

    const quickLabels = [
        t.schemes,
        t.eligibility,
        t.laws,
        t.apply,
        t.pacs,
        t.faq
    ];

    quickText.forEach((element, index) => {

        if (quickLabels[index]) {
            element.textContent =
                quickLabels[index];
        }

    });


    /* Welcome */

    const welcomeTitle =
        document.querySelector(".welcome-area h3");

    const welcomeParagraphs =
        document.querySelectorAll(".welcome-area p");

    if (welcomeTitle)
        welcomeTitle.textContent =
            t.welcome;

    if (welcomeParagraphs[0])
        welcomeParagraphs[0].textContent =
            t.welcomeText;

    if (welcomeParagraphs[1])
        welcomeParagraphs[1].textContent =
            t.welcomeQuestion;


    /* Save language */

    localStorage.setItem(
        "sia-language",
        language
    );
}


/* =========================
   LANGUAGE SELECTOR
========================= */

if (languageSelector) {

    languageSelector.addEventListener(
        "change",
        function () {

            applyLanguage(
                this.value
            );

        }
    );

}


/* =========================
   ADD USER MESSAGE
========================= */

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message user-message";

    message.innerHTML = `
        <div class="message-bubble">
            ${escapeHTML(text)}
        </div>
    `;

    chatMessages.appendChild(message);

    scrollToBottom();
}


/* =========================
   ADD BOT MESSAGE
========================= */

function addBotMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message bot-message";

    message.innerHTML = `
        <div class="message-bubble">

            <div class="bot-answer-text">
                ${formatBotText(text)}
            </div>

            <div class="speech-controls">
                <button
                    class="speech-button"
                    type="button"
                    title="Listen to this answer"
                    aria-label="Listen to this answer">
                    🔊
                </button>
            </div>

        </div>
    `;

    chatMessages.appendChild(message);

    /* =========================
       SPEECH BUTTON
    ========================= */

    const speechButton =
        message.querySelector(".speech-button");

    if (speechButton) {

        speechButton.addEventListener(
            "click",
            function () {

                const soundEnabled =
                    soundToggle
                        ? soundToggle.checked
                        : localStorage.getItem("sia-sound") !== "false";

                /* =========================
                   SOUND OFF
                ========================= */

                if (!soundEnabled) {

                    showSoundOffPopup(text);

                    return;
                }

                /* =========================
                   PLAY SPEECH
                ========================= */

                speakSIAAnswer(
                    text,
                    speechButton
                );

            }
        );

    }

    scrollToBottom();
}

/* =====================================================
   SIA TEXT TO SPEECH
===================================================== */

function showSoundOffPopup() {
    const existing = document.getElementById("sound-off-popup");

    if (existing) {
        existing.remove();
    }

    const popup = document.createElement("div");

    popup.id = "sound-off-popup";

    popup.innerHTML = `
        <div class="sound-popup-icon">
            🔊
        </div>

        <div class="sound-popup-content">
            <strong>Sound is turned off</strong>
            <p>Please turn on sound or<br>
            increase your device volume.</p>
        </div>

        <button class="sound-popup-on">
            Turn On Sound
        </button>

        <button class="sound-popup-close">
            ×
        </button>
    `;

    document.body.appendChild(popup);

    // Turn sound ON
    popup.querySelector(".sound-popup-on").addEventListener("click", () => {

        if (soundToggle) {
            soundToggle.checked = true;

            localStorage.setItem("sia-sound", "true");

            // Remove popup
            popup.remove();

            // Optional: play the answer again
            // if (typeof window.speechSynthesis !== "undefined") {
            //     speakSIAAnswer(window.lastSIAAnswer, window.lastSpeechButton);
            // }
        }
    });

    // Close popup
    popup.querySelector(".sound-popup-close").addEventListener("click", () => {
        popup.remove();
    });
}

function speakSIAAnswer(text, button) {

        const soundEnabled =
        soundToggle
            ? soundToggle.checked
            : localStorage.getItem("sia-sound") !== "false";

if (!soundEnabled) {
    showSoundOffPopup();
    return;
}

    /* Browser does not support speech synthesis */
    if (!("speechSynthesis" in window)) {

        showSpeechUnavailablePopup();

        return;
    }

    /* Stop any previous speech */
    window.speechSynthesis.cancel();

    const selectedLanguage =
        languageSelector && languageSelector.value
            ? languageSelector.value
            : (localStorage.getItem("sia-language") || "en");


    /* Language → Speech locale */

    const speechLanguages = {

        en: "en-IN",
        hi: "hi-IN",
        bn: "bn-IN",
        pa: "pa-IN",
        ta: "ta-IN",
        mr: "mr-IN",
        te: "te-IN",
        gu: "gu-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        or: "or-IN",
        as: "as-IN"
    };


    const speechLanguage =
        speechLanguages[selectedLanguage] || "en-IN";


    const utterance =
        new SpeechSynthesisUtterance(
            String(text)
        );


    utterance.lang =
        speechLanguage;

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;


    /* Try to find the best matching voice */

    const voices =
        window.speechSynthesis.getVoices();

    const matchingVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith(
                        speechLanguage
                            .toLowerCase()
                            .split("-")[0]
                    )
        );


    if (matchingVoice) {

        utterance.voice =
            matchingVoice;

    }


    /* Change button while speaking */

    utterance.onstart = function () {

    if (button) {

        button.dataset.speaking = "true";

        button.textContent = "⏹️";
        button.title = "Stop speaking";
    }
};


    utterance.onend = function () {

    if (button) {

        button.dataset.speaking = "false";

        button.textContent = "🔊";
        button.title = "Listen to this answer";
    }
};


   utterance.onerror = function (event) {

    console.error(
        "SIA Speech Error:",
        event
    );

    if (button) {

        button.textContent = "🔊";

        button.title =
            "Listen to this answer";
    }

    // Do NOT show an error popup when speech was
    // intentionally stopped by the user.
    if (
        event.error === "canceled" ||
        event.error === "interrupted"
    ) {
        return;
    }

    showSpeechUnavailablePopup();
};


    /* Speak */

    window.speechSynthesis.speak(
        utterance
    );


    /* Allow clicking the same button to stop */

    /* Allow clicking the same button to stop / replay */

if (button) {

    button.onclick = function () {

        // If SIA is currently speaking → STOP
        if (button.dataset.speaking === "true") {

            window.speechSynthesis.cancel();

            button.dataset.speaking = "false";

            button.textContent = "🔊";
            button.title = "Listen to this answer";

            return;
        }

        // Otherwise → PLAY AGAIN
        speakSIAAnswer(text, button);
    };
}

}


/* =====================================================
   SOUND OFF POPUP
===================================================== */

function showSoundOffPopup(text) {

    /* Remove an existing popup */

    const existing =
        document.getElementById(
            "sia-sound-popup"
        );

    if (existing) {

        existing.remove();

    }


    const popup =
        document.createElement("div");

    popup.id =
        "sia-sound-popup";

    popup.innerHTML = `

        <div class="sia-sound-popup-icon">
            🔊
        </div>

        <div class="sia-sound-popup-content">

            <strong>
                Sound is turned off
            </strong>

            <span>
                Please turn on sound or increase
                your device volume.
            </span>

        </div>

        <button
            type="button"
            id="sia-enable-sound">
            Turn On Sound
        </button>

        <button
            type="button"
            class="sia-popup-close"
            aria-label="Close">
            ×
        </button>

    `;


    document.body.appendChild(
        popup
    );


    /* Turn sound ON */

    const enableButton =
        document.getElementById(
            "sia-enable-sound"
        );


    if (enableButton) {

        enableButton.addEventListener(
            "click",
            function () {

                if (soundToggle) {

                    soundToggle.checked =
                        true;

                }

                localStorage.setItem(
                    "sia-sound",
                    "true"
                );


                popup.remove();


                /* Speak the answer that
                   triggered the popup */

                speakSIAAnswer(
                    text,
                    null
                );

            }
        );

    }


    /* Close popup */

    const closeButton =
        popup.querySelector(
            ".sia-popup-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                popup.remove();

            }
        );

    }


    /* Automatically remove after 6 seconds */

    setTimeout(
        function () {

            if (
                document.getElementById(
                    "sia-sound-popup"
                )
            ) {

                popup.remove();

            }

        },
        6000
    );

}


/* =====================================================
   SPEECH UNAVAILABLE POPUP
===================================================== */

function showSpeechUnavailablePopup() {

    const existing =
        document.getElementById(
            "sia-speech-error-popup"
        );

    if (existing) {

        existing.remove();

    }


    const popup =
        document.createElement("div");

    popup.id =
        "sia-speech-error-popup";

    popup.innerHTML = `

        <div class="sia-sound-popup-icon">
            ⚠️
        </div>

        <div class="sia-sound-popup-content">

            <strong>
                Voice unavailable
            </strong>

            <span>
                Please check your browser's
                language and voice settings.
            </span>

        </div>

        <button
            type="button"
            class="sia-popup-close"
            aria-label="Close">
            ×
        </button>

    `;


    document.body.appendChild(
        popup
    );


    const closeButton =
        popup.querySelector(
            ".sia-popup-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                popup.remove();

            }
        );

    }


    setTimeout(
        function () {

            if (
                document.getElementById(
                    "sia-speech-error-popup"
                )
            ) {

                popup.remove();

            }

        },
        5000
    );

}


/* =========================
   TYPING INDICATOR
========================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.id =
        "typing-indicator";

    typing.className =
        "chat-message bot-message";

    typing.innerHTML = `
        <div class="message-bubble typing-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatMessages.appendChild(typing);

    scrollToBottom();
}


function removeTyping() {

    const typing =
        document.getElementById(
            "typing-indicator"
        );

    if (typing)
        typing.remove();
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage(text = null) {

    const message =
        text !== null
            ? text.trim()
            : messageInput.value.trim();

    if (!message) {
        return;
    }

    if (text === null) {
        messageInput.value = "";
    }

    /* =========================================
       GET SELECTED LANGUAGE
       ========================================= */

    const selectedLanguage =
        languageSelector && languageSelector.value
            ? languageSelector.value
            : (
                localStorage.getItem("sia-language")
                || "en"
            );


    /* =========================================
       SAVE SELECTED LANGUAGE
       ========================================= */

    localStorage.setItem(
        "sia-language",
        selectedLanguage
    );


    /* =========================================
       DEBUG
       ========================================= */

    console.log(
        "SIA selected language:",
        selectedLanguage
    );


    /* =========================================
       SHOW USER MESSAGE
       ========================================= */

    addUserMessage(message);

    showTyping();


    try {

        /* =====================================
           SEND REQUEST TO BACKEND
           ===================================== */

        const response = await fetch(
            "/ask",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    question: message,

                    /*
                     * IMPORTANT:
                     *
                     * This is the language selected
                     * from the SIA dropdown.
                     *
                     * Example:
                     *
                     * English  -> en
                     * Hindi    -> hi
                     * Bengali  -> bn
                     * Punjabi  -> pa
                     * Tamil    -> ta
                     * Marathi  -> mr
                     */

                    language: selectedLanguage

                })

            }
        );


        /* =====================================
           CHECK SERVER RESPONSE
           ===================================== */

        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        /* =====================================
           READ JSON RESPONSE
           ===================================== */

        const data =
            await response.json();


        /* =====================================
           REMOVE TYPING INDICATOR
           ===================================== */

        removeTyping();


        /* =====================================
           GET BOT ANSWER
           ===================================== */

        const reply =
            data.answer ||
            data.response ||
            data.reply ||
            data.message;


        /* =====================================
           DISPLAY BOT ANSWER
           ===================================== */

        if (reply) {

            addBotMessage(reply);

        }

        else {

            addBotMessage(
                "I received your request, but the server did not return a response."
            );

        }


        /* =====================================
           OPTIONAL DEBUG INFORMATION
           ===================================== */

        console.log(
            "SIA response language:",
            data.language || selectedLanguage
        );


    }

    catch (error) {

        console.error(
            "SIA API Error:",
            error
        );


        /* =====================================
           REMOVE TYPING INDICATOR
           ===================================== */

        removeTyping();


        /* =====================================
           ERROR MESSAGE
           ===================================== */

        addBotMessage(
            "I’m having trouble connecting to the SIA server right now. Please check that the backend server is running and try again."
        );

    }

}


/* =========================
   SEND BUTTON
========================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        function () {

            sendMessage();

        }
    );

}


/* =========================
   ENTER TO SEND
========================= */

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* Auto-grow textarea */

    messageInput.addEventListener(
        "input",
        function () {

            this.style.height =
                "auto";

            this.style.height =
                Math.min(
                    this.scrollHeight,
                    120
                ) + "px";

        }
    );

}


// ============================================================
// QUICK ACTIONS
// ============================================================

const quickPrompts = {

    en: {
        schemes: "Please help me find relevant government and cooperative schemes.",
        eligibility: "Please help me check my eligibility for government or cooperative schemes.",
        laws: "Please explain the relevant cooperative laws and legal information.",
        apply: "Please explain how I can apply for a government or cooperative scheme.",
        pacs: "Please provide information and assistance related to PACS.",
        faq: "Please show me the frequently asked questions about cooperative and government services."
    },

    hi: {
        schemes: "कृपया मुझे संबंधित सरकारी और सहकारी योजनाओं को खोजने में मदद करें।",
        eligibility: "कृपया मुझे सरकारी या सहकारी योजनाओं के लिए अपनी पात्रता जांचने में मदद करें।",
        laws: "कृपया संबंधित सहकारी कानूनों और कानूनी जानकारी के बारे में समझाएं।",
        apply: "कृपया बताएं कि मैं सरकारी या सहकारी योजना के लिए आवेदन कैसे कर सकता हूं।",
        pacs: "कृपया मुझे PACS के बारे में जानकारी और सहायता प्रदान करें।",
        faq: "कृपया मुझे सहकारी और सरकारी सेवाओं से संबंधित अक्सर पूछे जाने वाले प्रश्न दिखाएं।"
    },

    bn: {
        schemes: "অনুগ্রহ করে আমাকে প্রাসঙ্গিক সরকারি ও সমবায় প্রকল্প খুঁজে পেতে সাহায্য করুন।",
        eligibility: "অনুগ্রহ করে সরকারি বা সমবায় প্রকল্পের জন্য আমার যোগ্যতা যাচাই করতে সাহায্য করুন।",
        laws: "অনুগ্রহ করে প্রাসঙ্গিক সমবায় আইন এবং আইনি তথ্য ব্যাখ্যা করুন।",
        apply: "অনুগ্রহ করে বলুন কীভাবে আমি সরকারি বা সমবায় প্রকল্পের জন্য আবেদন করতে পারি।",
        pacs: "অনুগ্রহ করে আমাকে PACS সম্পর্কে তথ্য ও সহায়তা প্রদান করুন।",
        faq: "অনুগ্রহ করে আমাকে সমবায় ও সরকারি পরিষেবা সম্পর্কিত প্রায়শই জিজ্ঞাসিত প্রশ্নগুলি দেখান।"
    },

    pa: {
        schemes: "ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂੰ ਸੰਬੰਧਿਤ ਸਰਕਾਰੀ ਅਤੇ ਸਹਿਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।",
        eligibility: "ਕਿਰਪਾ ਕਰਕੇ ਸਰਕਾਰੀ ਜਾਂ ਸਹਿਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲਈ ਮੇਰੀ ਯੋਗਤਾ ਜਾਂਚਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।",
        laws: "ਕਿਰਪਾ ਕਰਕੇ ਸੰਬੰਧਿਤ ਸਹਿਕਾਰੀ ਕਾਨੂੰਨਾਂ ਅਤੇ ਕਾਨੂੰਨੀ ਜਾਣਕਾਰੀ ਬਾਰੇ ਸਮਝਾਓ।",
        apply: "ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿ ਮੈਂ ਸਰਕਾਰੀ ਜਾਂ ਸਹਿਕਾਰੀ ਯੋਜਨਾ ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇ ਸਕਦਾ ਹਾਂ।",
        pacs: "ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂੰ PACS ਬਾਰੇ ਜਾਣਕਾਰੀ ਅਤੇ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰੋ।",
        faq: "ਕਿਰਪਾ ਕਰਕੇ ਮੈਨੂੰ ਸਹਿਕਾਰੀ ਅਤੇ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਨਾਲ ਸੰਬੰਧਿਤ ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ ਦਿਖਾਓ।"
    },

    ta: {
        schemes: "தொடர்புடைய அரசு மற்றும் கூட்டுறவு திட்டங்களைக் கண்டறிய எனக்கு உதவுங்கள்.",
        eligibility: "அரசு அல்லது கூட்டுறவு திட்டங்களுக்கான எனது தகுதியைச் சரிபார்க்க எனக்கு உதவுங்கள்.",
        laws: "தொடர்புடைய கூட்டுறவு சட்டங்கள் மற்றும் சட்ட தகவல்களை விளக்குங்கள்.",
        apply: "அரசு அல்லது கூட்டுறவு திட்டத்திற்கு நான் எவ்வாறு விண்ணப்பிக்கலாம் என்பதை விளக்குங்கள்.",
        pacs: "PACS தொடர்பான தகவல் மற்றும் உதவியை வழங்குங்கள்.",
        faq: "கூட்டுறவு மற்றும் அரசு சேவைகள் தொடர்பான அடிக்கடி கேட்கப்படும் கேள்விகளைக் காட்டுங்கள்."
    },

    mr: {
        schemes: "कृपया मला संबंधित सरकारी आणि सहकारी योजना शोधण्यात मदत करा.",
        eligibility: "कृपया सरकारी किंवा सहकारी योजनांसाठी माझी पात्रता तपासण्यात मदत करा.",
        laws: "कृपया संबंधित सहकारी कायदे आणि कायदेशीर माहिती समजावून सांगा.",
        apply: "कृपया सरकारी किंवा सहकारी योजनेसाठी मी अर्ज कसा करू शकतो ते समजावून सांगा.",
        pacs: "कृपया मला PACS बद्दल माहिती आणि सहाय्य द्या.",
        faq: "कृपया मला सहकारी आणि सरकारी सेवांशी संबंधित वारंवार विचारले जाणारे प्रश्न दाखवा."
    }

};


// ------------------------------------------------------------
// QUICK BUTTON CLICK
// ------------------------------------------------------------

quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const action = this.dataset.action;

            // Get currently selected language
            const selectedLanguage =
                languageSelector && languageSelector.value
                    ? languageSelector.value
                    : localStorage.getItem("sia-language") || "en";

            // Get prompts for selected language
            const languagePrompts =
                quickPrompts[selectedLanguage] || quickPrompts.en;

            // Get the translated quick prompt
            const prompt = languagePrompts[action];

            if (prompt) {
                sendMessage(prompt);
            }
        }
    );

});


/* =========================
   SETTINGS
========================= */

if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            if (settingsPanel)
                settingsPanel.hidden =
                    !settingsPanel.hidden;

            if (notificationPanel)
                notificationPanel.hidden = true;

        }
    );

}


if (closeSettings) {

    closeSettings.addEventListener(
        "click",
        function () {

            settingsPanel.hidden = true;

        }
    );

}


/* =========================
   NOTIFICATIONS
========================= */

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            if (notificationPanel)
                notificationPanel.hidden =
                    !notificationPanel.hidden;

            if (settingsPanel)
                settingsPanel.hidden = true;

        }
    );

}


if (closeNotifications) {

    closeNotifications.addEventListener(
        "click",
        function () {

            notificationPanel.hidden =
                true;

        }
    );

}


/* =========================
   CLOSE PANELS
========================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            settingsPanel &&
            !settingsPanel.contains(event.target) &&
            event.target !== settingsButton
        ) {

            settingsPanel.hidden =
                true;

        }


        if (
            notificationPanel &&
            !notificationPanel.contains(event.target) &&
            event.target !== notificationButton
        ) {

            notificationPanel.hidden =
                true;

        }

    }
);


/* =========================
   NOTIFICATION TOGGLE
========================= */

const notificationToggle =
    document.getElementById(
        "notification-toggle"
    );

if (notificationToggle) {

    notificationToggle.addEventListener(
        "change",
        function () {

            const dot =
                document.querySelector(
                    ".notification-dot"
                );

            if (dot) {

                dot.style.display =
                    this.checked
                        ? "block"
                        : "none";

            }

        }
    );

}


/* =========================
   SOUND TOGGLE
========================= */

const soundToggle =
    document.getElementById(
        "sound-toggle"
    );

if (soundToggle) {

   soundToggle.addEventListener(
    "change",
    function () {

        const soundEnabled = this.checked;

        localStorage.setItem(
            "sia-sound",
            soundEnabled
        );

        // Stop speech immediately when Sound is turned OFF
        if (!soundEnabled) {

            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }

        }
    }
);

}


/* =========================
   SCROLL
========================= */

function scrollToBottom() {

    if (!chatMessages)
        return;

    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function formatBotText(text) {

    const safe =
        escapeHTML(String(text));

    return safe
        .replace(/\n/g, "<br>");
}


/* =========================
   RESTORE SETTINGS
========================= */

function restoreSettings() {

    const savedLanguage =
        localStorage.getItem(
            "sia-language"
        );

    if (
        savedLanguage &&
        languageSelector &&
        translations[savedLanguage]
    ) {

        languageSelector.value =
            savedLanguage;

        applyLanguage(
            savedLanguage
        );

    }


    const savedSound =
        localStorage.getItem(
            "sia-sound"
        );

    if (
        savedSound !== null &&
        soundToggle
    ) {

        soundToggle.checked =
            savedSound === "true";

    }

}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        restoreSettings();

    }
);