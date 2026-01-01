'use client';

import { motion } from 'framer-motion';

interface RotatingBorderProps {
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  animationDuration?: number;
  blurRadius?: number;
  borderRadius?: number;
  backgroundColor?: string;
  overlayBorderColor?: string;
  overlayMargin?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  letterSpacing?: number;
  children?: React.ReactNode;
}

export default function RotatingBorder({
  width,
  height,
  borderColor = '#FFDD00',
  animationDuration = 6,
  blurRadius = 2,
  borderRadius = 0,
  backgroundColor = 'rgba(0, 0, 0, 0.8)',
  overlayBorderColor = '#FFDD00',
  overlayMargin = 1,
  text = 'Rotating Border',
  textColor = '#ffffff',
  fontSize = 16,
  fontWeight = 400,
  fontFamily = 'Inter',
  letterSpacing = 0,
  children,
}: RotatingBorderProps) {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: `${borderRadius}px`,
        minWidth: '12px',
        minHeight: '12px',
      }}
    >
      {/* Rotating border using conic gradient */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-450%',
          left: 0,
          right: 0,
          bottom: 0,
          height: '1000%',
          background: `conic-gradient(transparent 200deg, ${borderColor})`,
          borderRadius: `${borderRadius}px`,
          zIndex: 1,
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: animationDuration,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 0,
        }}
      />

      {/* Combined blurred overlay with border */}
      <div
        style={{
          position: 'absolute',
          top: `${overlayMargin}px`,
          left: `${overlayMargin}px`,
          right: `${overlayMargin}px`,
          bottom: `${overlayMargin}px`,
          backdropFilter: `blur(${blurRadius}px)`,
          ...(backgroundColor.includes('gradient') 
            ? { background: backgroundColor }
            : { backgroundColor: backgroundColor }
          ),
          border: `1px solid ${overlayBorderColor}`,
          borderRadius: `${Math.max(0, borderRadius - overlayMargin)}px`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontFamily: fontFamily,
            letterSpacing: `${letterSpacing}px`,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            userSelect: 'none',
          }}
        >
          {text}
        </div>
        {children}
      </div>
    </div>
  );
}

