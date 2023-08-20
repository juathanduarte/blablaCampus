import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IonIcons from '@expo/vector-icons/Ionicons';

type IconPropsBase = {
  size: number;
  color?: string;
};

type IconProps =
  | ({
      lib: 'IonIcons';
      icon: keyof typeof IonIcons.glyphMap;
    } & IconPropsBase)
  | ({
      lib: 'FontAwesome';
      icon: keyof typeof FontAwesome.glyphMap;
    } & IconPropsBase);

const Libs = {
  IonIcons,
  FontAwesome,
};

export default function Icon({ icon, size, color = 'black', lib }: IconProps) {
  const Component = Libs[lib];
  // @ts-ignore
  return <Component name={icon} size={size} color={color} />;
}
