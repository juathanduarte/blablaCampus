import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IconProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
}

export default function Icon({ icon, size, color = 'black' }: IconProps) {
  return <Ionicons name={icon} size={size} color={color} />;
}
