const WEB_URLS = [
  "https://lab-inventory-frontend-orpin.vercel.app",
  "http://192.168.0.100:3000",
  "http://192.168.0.120:3000",
  "http://localhost:3000",
];
const API_URLS = [
  "https://lab-inventory-frontend-orpin.vercel.app/api-proxy",
  "http://192.168.0.100:3000/api-proxy",
  "http://192.168.0.120:3000/api-proxy",
  "http://localhost:3000/api-proxy",
];
const PROXY_URLS = [
  "https://lab-inventory-backend.vercel.app",
  "http://192.168.0.100:5000",
  "http://192.168.0.120:5000",
  "http://localhost:5000",
];

const WEB_URL = WEB_URLS[3];
const API_URL = API_URLS[3];
const PROXY_URL = PROXY_URLS[3];
export { WEB_URL, API_URL, PROXY_URL };

// CHANGE THIS LINE ONLY TO SWITCH ENVIRONMENTS
const ACTIVE_ENV = "lan1"; // "local", "lan1", "lan2", "prod"
const CONFIG = {
  local: {
    webUrl: "http://localhost:3000",
    apiUrl: "http://localhost:5000",
    proxyApiUrl: "http://localhost:3000/api-proxy",
  },

  lan1: {
    webUrl: "http://192.168.0.100:3000",
    apiUrl: "http://192.168.0.100:5000",
    proxyApiUrl: "http://192.168.0.100:3000/api-proxy",
  },

  lan2: {
    webUrl: "http://192.168.0.120:3000",
    apiUrl: "http://192.168.0.120:5000",
    proxyApiUrl: "http://192.168.0.120:3000/api-proxy",
  },

  prod: {
    webUrl: "https://www.bangladeshcounsel.com",
    apiUrl: "https://api.bangladeshcounsel.com",
    proxyApiUrl: "https://www.bangladeshcounsel.com/api-proxy",
  },
};



export const APP_CONFIG = CONFIG[ACTIVE_ENV];
