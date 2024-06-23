import random from './random';

const DEFAULT_COLOR = '#FFFFFF';

export interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
}

const generateSparkle = (color = DEFAULT_COLOR) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(30, 80),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 1
    }
  };

  return sparkle;
};

export default generateSparkle;
