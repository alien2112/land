'use client';

import RotatingBorder from './RotatingBorder';

interface RotatingButtonProps {
  text: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  useGradient?: boolean; // Whether to use gradient backgrounds (for gallery buttons)
}

export default function RotatingButton({
  text,
  width = 140,
  height = 48,
  borderRadius = 24,
  fontSize = 16,
  fontWeight = 600,
  letterSpacing = 0,
  isActive = true,
  onClick,
  className = '',
  useGradient = false,
}: RotatingButtonProps) {
  const isAutoWidth = width === 'auto';
  const containerStyle = isAutoWidth 
    ? { 
        display: 'inline-block',
        padding: '0 20px',
      }
    : {};

  // Determine background color based on active state and useGradient prop
  const backgroundColor = useGradient
    ? (isActive 
        ? 'linear-gradient(135deg, rgba(255, 221, 0, 0.95) 0%, rgba(230, 199, 0, 0.8) 100%)' // Brand yellow gradient for active
        : 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.7) 100%)') // Dark gray gradient for inactive
    : 'transparent'; // Transparent for buttons like "CALL US"

  // Determine overlay border color
  const overlayBorderColor = useGradient && isActive 
    ? "#FFDD00" // Brand yellow for active gallery buttons
    : "#ffffff"; // White for inactive or non-gallery buttons

  return (
    <button
      type="button"
      className={`inline-block cursor-pointer uppercase focus-visible:outline-2 focus-visible:outline-[#FFDD00] focus-visible:outline-offset-2 rounded-full ${className}`}
      onClick={onClick}
      style={containerStyle}
      aria-label={text}
    >
      <RotatingBorder
        width={isAutoWidth ? '100%' : width}
        height={height}
        borderColor="#FFDD00"
        animationDuration={6}
        blurRadius={2}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        overlayBorderColor={overlayBorderColor}
        overlayMargin={1}
        text={text}
        textColor="#ffffff"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily="Inter"
        letterSpacing={letterSpacing}
      />
    </button>
  );
}

