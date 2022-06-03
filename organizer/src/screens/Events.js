import axios from 'axios';
import React, {useEffect, useLayoutEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {CText} from '../common/c-text';
import {EventItem} from '../components/event-item';
import {layout, size, text} from '../styles';
import {AuthContext} from '../contexts/AuthContext';
import {baseUrl} from '../constants';
import {useTheme} from '@react-navigation/native';
export const Events = ({navigation}) => {
  const {organizerId, getToken} = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}/organizer/getAll/${organizerId}`, {
        headers: {Authorization: getToken()},
      })
      .then(res => {
        console.log(res.data);
        setEvents(res.data);
        setRefreshing(false);
      })
      .catch(() => setRefreshing(false));
    return () => {};
  }, [getToken, organizerId, refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Эвэнт',
      headerRight: () => (
        <CText
          style={[
            text.md,
            {marginRight: size.lg},
          ]}>{`${events.length} эвэнт`}</CText>
      ),
    });
  }, [events.length, navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.notification]}
            tintColor={colors.text}
          />
        }>
        {events.map(el => (
          <EventItem item={el} key={el.eventId} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  buttonBar: {
    ...layout.hsb,
    paddingHorizontal: size.md,
    paddingTop: size.lg,
    flex: 1,
  },
  btn: {
    flex: 1,
    margin: size.sm,
  },
  num: {
    ...layout.hsb,
    flex: 1,
    marginHorizontal: size.lg,
    marginVertical: size.md,
  },
  flatList: {},
});
