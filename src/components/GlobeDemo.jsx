// src/components/GlobeDemo.jsx
import React from 'react';
import Globe from './magicui/Globe'; // Ensure the path is correct

export function GlobeDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Globe className="w-full h-full" /> {/* Make the globe take the full width and height */}
    </div>
  );
}

export default GlobeDemo;
