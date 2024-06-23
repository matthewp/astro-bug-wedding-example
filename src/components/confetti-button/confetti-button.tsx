import React from 'react';
import confetti from 'canvas-confetti';

interface Props {
  buttonText: string;
  classes?: string;
}

export const ConfettiButton = ({ buttonText, classes }: Props) => {
  const allClasses = [
    'text-custom-red',
    'bg-custom-pink',
    'text-3xl',
    'py-3',
    'px-16',
    'border-4',
    'border-white',
    'rounded-lg',
    'font-rubik-mono',
    'drop-shadow-xl',
    'hover:scale-105',
    'hover:transition',
    classes
  ].join(' ');

  const fireConfetti = () => {
    confetti();
  };

  return (
    <button className={allClasses} onClick={fireConfetti}>
      {buttonText}
    </button>
  );
};
