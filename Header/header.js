// Translation dictionary
const translations = {
  english: {
    enterPinCode: "Select Pincode:",
    about: "About Us",
    chevron: "▼",
    contact: "Contact Us",
    wishlist: "Wishlist",
    cart: "Cart",
    profile: "Account",
    signupLogin: "Sign Up / Login",
    orders: "Orders",
    logout: "Logout",
    motherCare: "Mother Care",
    babyCare: "Baby Care",
    medicineHealthcare: "Medicine & HealthCare",
    prescriptionMedicines: "Prescription Medicines (Upload Prescription)",
    otc: "Over-the-Counter (OTC) Medicines",
    chronic: "Chronic Care (Diabetes, Hypertension, Cardiac, Asthma, Thyroid)",
    firstAid: "First Aid & Emergency" ,
    pain: "Pain Relief & Fever",
    allergy: "Allergy & Cold Care",
    digestive: "Digestive Health",
    men: "Men's Health",
    wellness: "Wellness",
    vitamins: "Vitamins & Supplements",
    skin: "Skin & Hair Care",
    oral: "Oral Care",
    menstrual: "Menstrual & Intimate Care",
    fitness: "Fitness & Weight Management",
    senior: "Senior Care",
    immunity: "Immunity Boosters",
    ayurveda: "Ayurveda & Herbal Products",
    devices: "Devices",
    bp: "Monitoring Devices (BP Monitors, Glucometers)",
    mobility: "Mobility Aids (Walkers, Wheelchairs)",
    respiratory: "Respiratory Care (Nebulizers, Oxygen)",
    surgical: "Surgical Items",
    dressing: "Dressings and Bandages",
    consumable: "Surgical Consumables",
    IV: "IV and Infusion Items",
    catheters:  "Catheters and Tubes",
    wound:  "Wound Care",
    orthopedic: "Orthopedic Support",
    injectables: "IV Fluids and Injectables",
    kits:  "Surgical Kits",
    pincodeSuccess: "Pin Code selected:",
    invalidPincode: "Please enter a valid 6-digit pin code."
  },
  hindi: {
    enterPinCode: "पिनकोड चुनें",
    about: "हमारे बारे में",
    chevron: "▼",
    go: "जाएं",
    contact: "संपर्क",
    wishlist: "इच्छा सूची",
    cart: "कार्ट",
    profile: "प्रोफ़ाइल",
    signupLogin: "साइन अप / लॉगिन",
    orders: "ऑर्डर",
    logout: "लॉगआउट",
    motherCare: "मदर केयर",
    babyCare: "बेबी केअर",
    medicineHealthcare: "दवाइयाँ और स्वास्थ्य देखभाल",
    prescriptionMedicines: "प्रिस्क्रिप्शन दवाइयाँ (प्रिस्क्रिप्शन अपलोड करें)",
    otc: "ओवर-द-काउंटर (OTC) दवाइयाँ",
    chronic: "क्रॉनिक केयर (मधुमेह, उच्च रक्तचाप, हृदय, अस्थमा, थायराइड)",
    firstAid: "प्राथमिक चिकित्सा और आपातकाल",
    pain: "दर्द निवारक और बुखार",
    allergy: "एलर्जी और सर्दी की देखभाल",
    digestive: "पाचन स्वास्थ्य",
    men: "पुरुष स्वास्थ्य",
    wellness: "वेलनेस",
    vitamins: "विटामिन और सप्लीमेंट्स",
    skin: "त्वचा और बाल देखभाल",
    oral: "मौखिक देखभाल",
    menstrual: "मासिक धर्म और अंतरंग देखभाल",
    fitness: "फिटनेस और वजन प्रबंधन",
    senior: "वरिष्ठ नागरिक देखभाल",
    immunity: "प्रतिरक्षा बूस्टर",
    ayurveda: "आयुर्वेद और हर्बल उत्पाद",
    devices: "डिवाइस",
    bp: "मॉनिटरिंग डिवाइस (BP मॉनिटर, ग्लूकोमीटर)",
    mobility: "गतिशीलता सहायता (वॉकर, व्हीलचेयर)",
    respiratory: "श्वसन देखभाल (नेबुलाइज़र, ऑक्सीजन)",
    surgical: "सर्जिकल आइटम",
    dressing: "ड्रेसिंग और पट्टियाँ",
    consumable: "शल्य चिकित्सा उपभोग्य सामग्री",
    IV: "आईवी और इन्फ्यूजन आइटम",
    catheters:  "कैथेटर और ट्यूब",
    wound: "घाव की देखभाल",
    orthopedic:  "ऑर्थोपेडिक सपोर्ट",
    injectables: "आईवी तरल पदार्थ और इंजेक्शन",
    kits:  "सर्जिकल किट",
    dressing: "ड्रेसिंग और पट्टियाँ",
    pincodeSuccess: "पिन कोड चुना गया:",
    invalidPincode: "कृपया 6 अंकों का वैध भारतीय पिनकोड डालें।"
  },
  marathi: {
    enterPinCode: "पिनकोड निवडा",
    go: "जा",
    about: "आमच्याबद्दल",
    chevron: "▼",
    contact: "संपर्क",
    wishlist: "इच्छा यादी",
    cart: "कार्ट",
    profile: "प्रोफाइल",
    signupLogin: "साइन अप / लॉगिन",
    orders: "ऑर्डर",
    logout: "लॉगआउट",
    motherCare:  "मदर केअर",
    babyCare: "बाळ काळजी",
    medicineHealthcare: "औषधे आणि आरोग्यसेवा",
    prescriptionMedicines: "प्रिस्क्रिप्शन औषधे (प्रिस्क्रिप्शन अपलोड करा)",
    otc: "ओव्हर-द-काउंटर (OTC) औषधे",
    chronic: "दीर्घकालीन काळजी (मधुमेह, उच्च रक्तदाब, हृदय, अस्थमा, थायरॉईड)",
    firstAid: "प्रथमोपचार आणि आपत्कालीन",
    pain: "वेदना आराम आणि ताप",
    allergy: "एलर्जी आणि सर्दी काळजी",
    digestive: "पचन आरोग्य",
    men: "पुरुष आरोग्य",
    wellness: "वेलनेस",
    vitamins: "व्हिटॅमिन आणि सप्लिमेंट्स",
    skin: "त्वचा आणि केस काळजी",
    oral: "तोंडाची काळजी",
    menstrual: "मासिक पाळी आणि अंतरंग काळजी",
    fitness: "फिटनेस आणि वजन व्यवस्थापन",
    senior: "ज्येष्ठ नागरिक काळजी",
    immunity: "रोगप्रतिकार शक्ती वाढवणारे",
    ayurveda: "आयुर्वेद",
    devices: "उपकरणे",
    bp: "मॉनिटरिंग उपकरणे (BP मॉनिटर, ग्लूकोमीटर)",
    mobility: "गतिशीलता सहाय्य (वॉकर, व्हीलचेअर)",
    respiratory: "श्वसन काळजी (नेब्युलायझर, ऑक्सिजन)",
    surgical: "सर्जिकल वस्तू",
    dressing: "पट्ट्या आणि पट्टे",
    consumable: "शस्त्रक्रिया वापरलेली साहित्य",
    IV: "आयव्ही आणि इन्फ्यूजन वस्तू",
    catheters:  "कॅथेटर आणि नळ्या",
    wound:  "जखमेची काळजी",
    orthopedic: "अस्थिसंध समर्थन",
    injectables:"आयव्ही द्रव आणि इंजेक्शन",
    kits:  "शस्त्रक्रिया किट",
    pincodeSuccess: "पिन कोड निवडला:",
    invalidPincode: "कृपया वैध 6 अंकी पिन कोड प्रविष्ट करा।"
  }
};


function openPincodeModal() {
  const modal = document.getElementById('pincode-modal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('modal-pincode-input').focus();
}

function closePincodeModal() {
  const modal = document.getElementById('pincode-modal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function validateAndSavePincode() {
  const input = document.getElementById('modal-pincode-input');
  const pin = input.value.trim();
  const error = document.getElementById('pincode-error');
  const success = document.getElementById('pincode-success');
  const successPin = document.getElementById('success-pin');
  const displayPins = document.querySelectorAll('#display-pincode, #mobile-display-pincode');

  error.classList.add('hidden'); success.classList.add('hidden');
  if (!/^\d{6}$/.test(pin)) {
    error.classList.remove('hidden');
    return;
  }

  localStorage.setItem('savedPincode', pin);
  displayPins.forEach(el => el.textContent = pin);
  successPin.textContent = pin;
  success.classList.remove('hidden');
  document.getElementById('delivery-info').classList.remove('hidden');
  setTimeout(closePincodeModal, 1000);
  showNotification(`Pincode ${pin} saved!`);
}

function loadSavedPincode() {
  const saved = localStorage.getItem('savedPincode');
  if (saved) {
    document.querySelectorAll('#display-pincode, #mobile-display-pincode').forEach(el => el.textContent = saved);
    document.getElementById('delivery-info').classList.remove('hidden');
  }
}

function openLanguageModal() {
  const modal = document.getElementById('language-modal');
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  updateLanguageCheckmark();
}

function closeLanguageModal() {
  const modal = document.getElementById('language-modal');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function updateLanguageCheckmark() {
  const current = localStorage.getItem('selectedLanguage') || 'english';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const lang = btn.getAttribute('onclick').match(/'(\w+)'/)[1];
    btn.querySelector('i.fa-check').classList.toggle('hidden', lang !== current);
  });
}

function changeLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);
  translatePage(lang);
  document.getElementById('current-lang').textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
  updateLanguageCheckmark();
  closeLanguageModal();
  showNotification('Language changed');
}

function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function showNotification(msg) {
  const n = document.createElement('div');
  n.textContent = msg;
  n.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

function initializeHeader() {
  loadSavedPincode();

  const savedLang = localStorage.getItem('selectedLanguage') || 'english';
  document.getElementById('current-lang').textContent = savedLang.charAt(0).toUpperCase() + savedLang.slice(1);
  translatePage(savedLang);

  // Pincode triggers
  document.getElementById('pincode-trigger')?.addEventListener('click', openPincodeModal);
  document.getElementById('mobile-pincode-trigger')?.addEventListener('click', openPincodeModal);

  // Language triggers
  document.getElementById('language-trigger')?.addEventListener('click', openLanguageModal);
  document.getElementById('mobile-language-trigger')?.addEventListener('click', openLanguageModal);

  // Check pincode
  document.getElementById('check-pincode-btn')?.addEventListener('click', validateAndSavePincode);
  document.getElementById('modal-pincode-input')?.addEventListener('keypress', e => e.key === 'Enter' && validateAndSavePincode());

  // Mobile menu & profile
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
  document.getElementById('mobile-profile-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('mobile-profile-menu').classList.toggle('hidden');
  });

  // Desktop profile
  document.getElementById('profile-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById('profile-menu');
    menu.classList.toggle('hidden', 'opacity-0');
  });

  highlightActiveNav();
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (!href || href.includes('javascript')) return;
    if (path.includes(href.replace(/^\//, ''))) link.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initializeHeader);
if (document.readyState !== 'loading') initializeHeader();
highlightActiveNav();