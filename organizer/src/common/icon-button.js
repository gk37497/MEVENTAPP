import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {layout, size} from '../styles';
import {useTheme} from '@react-navigation/native';

export const IconButton = ({onPress, icon, s, rounded, color, style}) => {
  const {colors} = useTheme();
  const roundedStyle = {
    borderRadius: 30,
    padding: size.iconLg / 2.5,
    ...layout.center,
    marginHorizontal: size.sm,
    backgroundColor: colors.background,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, rounded && roundedStyle]}>
      <Icon
        name={icon}
        size={s ? size.iconMd : size.iconLg}
        color={color ? color : '#BDBAC0'}
      />
    </TouchableOpacity>
  );
};
