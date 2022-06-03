import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {BlackText} from '../common/black-text';
import {CText} from '../common/c-text';
import {BlueText} from '../common/blue-text';
import {GreyText} from '../common/grey-text';
import {RedText} from '../common/red-text';
import {layout, size, text} from '../styles';
import {getImageUrl} from '../constants';

const eventStatus = [
  {
    id: 1,
    title: 'Удахгүй',
  },
  {
    id: 2,
    title: 'Дууссан',
  },
];

const compareDate = a => {
  let date = new Date(a);
  console.log(date > Date.now());
  return date > Date.now();
};

export const EventItem = ({item}) => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.eventItem, {backgroundColor: colors.card}]}
      onPress={() => navigate('Event', {event: item})}>
      <View style={styles.eventBox1}>
        <Image
          source={{uri: `${getImageUrl}${item.coverImg}`}}
          style={styles.eventCover}
        />
        <View style={styles.eventDetail}>
          <CText style={[text.lg]} numberOfLines={1}>
            {item.eventName}
          </CText>
          <GreyText style={{marginVertical: size.md}}>{item.date}</GreyText>
          <BlackText>Улаанбаатар</BlackText>
        </View>
      </View>
      <View style={styles.eventBox2}>
        <View style={styles.wrapper}>
          <BlackText style={text.md}>Тасалбар : </BlackText>
          <GreyText
            md>{`${item.leftTicketQuantity} / ${item.ticketQuantity}`}</GreyText>
        </View>
        <View style={styles.wrapper}>
          <BlackText style={text.md}>Ашиг : </BlackText>
          <GreyText md>{item.payedTicketCash} ₮</GreyText>
        </View>
        <View style={styles.wrapper}>
          <BlackText style={text.md}>Статус : </BlackText>
          {compareDate(item.endDate) ? (
            <BlueText>{eventStatus[0].title}</BlueText>
          ) : (
            <RedText>{eventStatus[1].title}</RedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    marginHorizontal: size.md + size.sm,
    marginVertical: size.md,
    padding: size.md,
    borderRadius: size.sm,
    ...layout.shadow,
  },
  eventBox1: {
    ...layout.hsb,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  eventDetail: {
    marginLeft: size.lg,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  eventBox2: {
    paddingHorizontal: size.lg,
    marginTop: size.md,
  },
  eventCover: {
    height: 100,
    width: 100,
  },
  wrapper: {
    ...layout.hsb,
  },
});
