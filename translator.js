// 1. Write your translations directly here
const manualTranslations = {
  "US": {
    "manual_title": "Welcome to the Manual",
    "step_one": "Please connect the device to a power outlet."
  },
  "ES": {
    "manual_title": "Bienvenido al Manual",
    "step_one": "Por favor, conecte el dispositivo a una toma de corriente."
  },
  "FR": {
    "manual_title": "Bienvenue dans le Manuel",
    "step_one": "Veuillez brancher l'appareil sur une prise de courant."
  }
};

// 2. Default fallback language if the country is not supported or API fails
const DEFAULT_COUNTRY = "US";

// 3. Fetch the user's location via their IP address
function detectUserLocation() {
  fetch('http://ip-api.com')
    .then(response => response.json())
    .then(data => {
      // The API returns a country code (e.g., "US", "ES", "FR")
      const countryCode = data.countryCode;
      applyLanguage(countryCode);
    })
    .catch(error => {
      console.warn("IP tracking failed, using default language:", error);
      applyLanguage(DEFAULT_COUNTRY);
    });
}

// 4. Inject the translated text into your static HTML elements
function applyLanguage(country) {
  // If the country isn't in our dictionary, use the default language
  const translation = manualTranslations[country] || manualTranslations[DEFAULT_COUNTRY];
  
  // Find all HTML elements with the data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translation[key]) {
      element.innerText = translation[key];
    }
  });
}

// Start the detection loop automatically when the window finishes loading
window.onload = detectUserLocation;
