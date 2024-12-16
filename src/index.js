import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Hàm tải HERE Maps SDK
const loadHereMapsSDK = async () => {
  const scripts = [
    "https://js.api.here.com/v3/3.1/mapsjs-core.js",
    "https://js.api.here.com/v3/3.1/mapsjs-service.js",
    "https://js.api.here.com/v3/3.1/mapsjs-ui.js",
    "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
  ];

  const stylesheets = [
    "https://js.api.here.com/v3/3.1/mapsjs-ui.css",
  ];

  try {
    // Tải stylesheet
    for (const href of stylesheets) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }

    // Tải script theo thứ tự
    for (const src of scripts) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // Đảm bảo tải tuần tự
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Không thể tải script: ${src}`));
        document.head.appendChild(script);
      });
    }

    console.log("HERE Maps SDK đã được tải thành công.");
  } catch (error) {
    console.error("Lỗi khi tải HERE Maps SDK:", error);
  }
};

// Tải HERE Maps SDK trước khi render ứng dụng React
loadHereMapsSDK().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
  );
});

// Đo lường hiệu suất ứng dụng
reportWebVitals();
