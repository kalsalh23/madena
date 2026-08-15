import { useEffect, useRef } from 'react';

const GREETING = 'أهلاً وسهلاً بكم في مدينة طيبة الإمام';

export default function VoiceWelcome() {
  const playedRef = useRef(false);

  useEffect(() => {
    if (playedRef.current) return;
    if (!('speechSynthesis' in window)) return;
    if (sessionStorage.getItem('voice-welcome-played')) return;

    const speak = () => {
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(GREETING);
      utter.lang = 'ar-SA';
      utter.rate = 0.9;
      utter.pitch = 1;
      utter.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const arVoice =
        voices.find((v) => v.lang.startsWith('ar-SA')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arVoice) utter.voice = arVoice;

      playedRef.current = true;
      sessionStorage.setItem('voice-welcome-played', '1');
      window.speechSynthesis.speak(utter);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return null;
}
