import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'true', { expires: 365 });
    setShowConsent(false);
  };

  const handleDecline = () => {
    setCookie('cookieConsent', 'false', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 text-white p-6 shadow-lg z-50 border-t border-teal-500">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-teal-400">Cookie Settings</h3>
          <p className="text-gray-300 text-sm">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDecline}
            className="px-6 py-2 border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-black transition-all duration-300"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-teal-500 text-black rounded-full hover:bg-teal-400 transition-all duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}