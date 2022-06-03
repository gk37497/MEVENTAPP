import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {CText} from '../common/c-text';
import {GreyText} from '../common/grey-text';
import {layout, size, text} from '../styles';
import {calendarFormatter} from '../utils';

export const DateCard = ({date, onPress}) => {
  const {colors} = useTheme();
  const calendar = calendarFormatter(date);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: colors.card}]}>
      <CText style={text.lg}>{calendar[0]}</CText>
      <View style={[styles.rounded, {backgroundColor: colors.primary}]}>
        <CText style={text.lg}>{calendar[1]}</CText>
      </View>
      <GreyText
        style={text.smBold}>{`${calendar[2]} - ${calendar[3]}`}</GreyText>
      <GreyText>{calendar[4]}</GreyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: size.dateCard.height,
    width: size.dateCard.width,
    ...layout.shadow,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: size.md,
    marginRight: size.md + 5,
  },
  rounded: {
    borderRadius: 50,
    width: 56,
    height: 56,
    ...layout.center,
  },
});
