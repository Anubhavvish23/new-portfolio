
import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText === texts[currentIndex]) {
        // Complete word has been typed
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      } else {
        // Still typing
        timeout = setTimeout(() => {
          setDisplayedText(texts[currentIndex].substring(0, displayedText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (displayedText === '') {
        // Complete word has been deleted
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      } else {
        // Still deleting
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-purple-light animate-pulse ml-1">|</span>
    </span>
  );
};

export default TypingText;
