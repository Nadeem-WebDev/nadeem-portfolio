import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types each text out letter by letter, pauses, erases it, then moves on to the next
export default function TextType({ texts, typingSpeed = 90, erasingSpeed = 45, delay = 1800 }) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const fullText = texts[loopNum % texts.length];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        const nextText = fullText.substring(0, displayText.length - 1);
        setDisplayText(nextText);
        if (nextText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, erasingSpeed);
    } else if (displayText === fullText) {
      // Finished typing: wait, then start erasing
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else {
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, erasingSpeed, delay]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1.1em] ml-1 bg-blue-500"
      />
    </span>
  );
}
