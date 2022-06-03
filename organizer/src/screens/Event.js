import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {BlackText} from '../common/black-text';
import {BlueText} from '../common/blue-text';
import {CText} from '../common/c-text';
import {GreyText} from '../common/grey-text';
import {IconButton} from '../common/icon-button';
import {DateCard} from '../components/date-card';
import {getImageUrl} from '../constants';
import {layout, size, text} from '../styles';
import {dateFormatter} from '../utils';

const array = Array(5).fill(0);

const Item = ({first, second}) => (
  <View style={styles.item}>
    <BlueText>{first}</BlueText>
    <CText sm>{second}</CText>
  </View>
);

export const Event = ({route}) => {
  const {event} = route.params;
  const {setOptions} = useNavigation();
  const {colors} = useTheme();

  useLayoutEffect(() => {
    setOptions({title: event && event.eventName});
  }, [event, setOptions]);

  const Section = ({title, content}) => {
    return (
      <View style={[styles.section, {backgroundColor: colors.card}]}>
        <View style={styles.sectionHeader}>
          <GreyText md>{title}</GreyText>
        </View>
        <View style={styles.sectionContent}>{content}</View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={{paddingBottom: size.xl}}>
        <View style={styles.header}>
          <Image
            source={{uri: `${getImageUrl}${event.coverImg}`}}
            style={styles.cover}
          />
          <IconButton
            icon="camera-outline"
            rounded
            style={styles.editCover}
            s
          />
        </View>
        <CText style={{margin: size.md, ...text.md}}>Ашиг</CText>
        <View style={layout.center}>
          <BlackText style={{...text.heading}}>
            {event.payedTicketCash} ₮
          </BlackText>
        </View>
        <CText style={{margin: size.md, ...text.md}}>Үзүүлэлт</CText>
        <Section
          title="Статистик"
          content={
            <View>
              <Item
                first="Зарагдсан :"
                second={`${event.leftTicketQuantity} / ${event.ticketQuantity}`}
              />
              <Item first="Ашиг :" second={`${event.payedTicketCash} ₮`} />
            </View>
          }
        />
        <CText style={{margin: size.md, ...text.md}}>Огноо</CText>
        <View style={styles.flatList}>
          <DateCard date={event.startDate} />
        </View>
        <GreyText style={{marginTop: size.lg, marginLeft: size.lg}} md>
          {`${dateFormatter(event.startDate)} - ${dateFormatter(
            event.endDate,
          )}`}
        </GreyText>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    marginBottom: size.lg,
  },
  cover: {
    width: '100%',
    height: 200,
  },
  flatList: {
    paddingHorizontal: size.md,
  },
  editCover: {
    position: 'absolute',
    top: size.sm,
    right: size.sm,
  },
  section: {
    marginHorizontal: size.md,
    marginTop: size.lg,
    ...layout.shadow,
    borderRadius: size.sm,
    padding: size.md,
  },
  sectionHeader: {},
  sectionContent: {
    marginTop: size.md,
  },
  item: {
    ...layout.hsb,
    paddingHorizontal: size.md,
    marginVertical: size.sm - 2,
  },
});
