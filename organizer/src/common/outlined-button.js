import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {layout, size, text} from '../styles';
import {CText} from './c-text';
import {useTheme} from '@react-navigation/native';

export const OutlinedButton = ({
  onPress,
  lg,
  title,
  bc,
  noBorder,
  style,
  fill,
  textColor,
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    style: {
      borderRadius: 5,
      borderWidth: noBorder ? 0 : 2,
      borderColor: bc ? bc : colors.primary,
      paddingVertical: size.md,
      paddingHorizontal: lg ? size.xl : size.lg,
      ...layout.center,
      backgroundColor: fill ? colors.primary : 'transparent',
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={[styles.style, style]}>
      <CText style={[text.md, {color: textColor ? textColor : colors.text}]}>
        {title}
      </CText>
    </TouchableOpacity>
  );
};
