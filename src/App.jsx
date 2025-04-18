import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import NewsletterPopup from './components/Newsletter/NewsletterPopup'; // adjust path if needed

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 3 seconds delay before showing popup

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <LandingPage />
      
      {/* Newsletter popup */}
      <NewsletterPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default App;
