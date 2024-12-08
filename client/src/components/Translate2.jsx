import React, { useEffect, useRef, useState } from "react";

const Translate = () => {
  const googleTranslateRef = useRef(null);
  const [languages] = useState([
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "it", name: "Italian" },
  ]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          layout:
            window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
        },
        googleTranslateRef.current
      );
    };

    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    } else {
      let intervalId = setInterval(() => {
        if (window.google && window.google.translate) {
          googleTranslateElementInit();
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, []);

  //   useEffect(()=>{

  //   },[currentLanguage])

  // const toggleDropdown = () => {
  //   setDropdownVisible((prevVisible) => !prevVisible);
  //   console.log("Dropdown visibility toggled:", !dropdownVisible);
  // };

  const handleLanguageSelect = (lang) => {
    setDropdownVisible(false);
    console.log("Language selected:", lang);
    const select = document.querySelector("select.goog-te-combo");

    if (select) {
      select.value = lang;
      const event = new Event("change");
      select.dispatchEvent(event);
      console.log("Google Translate language changed.");
    } else {
      console.warn("Google Translate dropdown not found.");
    }

    console.log("Dropdown visibility set to false.");
  };

  const handleLanguageChange = (event) => {
    event.preventDefault();
    const lang = event.target.value;
    const select = document.querySelector("select.goog-te-combo");

    if (select) {
      select.value = lang;
      const changeEvent = new Event("change");
      select.dispatchEvent(changeEvent);
    }
  };

  return (
    <div className="translate-container">
      <div className="globe-icon">
        <div className="notranslate styled-select" >
          <select
            className="language-select"
            onChange={handleLanguageChange}
            defaultValue=""
          >
            <option value="" disabled style={{display:'none'}}>
              Language
            </option>
            {languages.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Google Translate Element */}
      <div ref={googleTranslateRef} style={{display:'none'}}></div>
    </div>
  );
};

export default Translate;
