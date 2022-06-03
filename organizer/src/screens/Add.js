/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {Alert, StyleSheet, View, TextInput, Image} from 'react-native';
import {CText} from '../common/c-text';
import {BlackText} from '../common/black-text';
import {BlueText} from '../common/blue-text';
import {layout, text, size} from '../styles';
import {IconButton} from '../common/icon-button';
import {useTheme, useNavigation} from '@react-navigation/native';
import {OutlinedButton} from '../common/outlined-button';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {AuthContext} from '../contexts/AuthContext';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {alertView} from '../components/alertModal';
import {baseUrl} from '../constants';
import {Loading} from '../components/loading-view';
import * as ImagePicker from 'react-native-image-picker';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const OutlinedBox = props => {
  const {colors} = useTheme();
  return (
    <View
      {...props}
      style={[
        styles.outlinedBox,
        layout.hsb,
        props.img && layout.center,
        {borderColor: colors.border, height: props.img ? 180 : size.xl},
      ]}
    />
  );
};

const ticketsType = [
  {
    id: 1,
    name: 'VIP',
  },
  {
    id: 2,
    name: 'ORDINARY',
  },
];

export const Add = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const {getToken, organizerId, token} = useContext(AuthContext);

  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  const [startDate, setStartDate] = useState();
  const [openStart, setOpenStart] = useState(false);

  const [endDate, setEndDate] = useState();
  const [openEnd, setOpenEnd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(0);
  const [coverImg, setCoverImg] = useState(null);
  const [coverImgRes, setCoverImgRes] = useState(null);

  const [ticketPrice, setTicketPrice] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(null);
  const [ticketType, setTicketType] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/app/categories`)
      .then(res => setCategories(res.data))
      .catch(e => console.log(e));
    return () => {};
  }, []);

  const onImageLibraryPress = useCallback(() => {
    const imgOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(imgOptions).then(response => {
      setCoverImg(response.assets[0].uri);
      setCoverImgRes(response);
    });
  }, []);

  const save = () => {
    if (
      !eventName ||
      !organizerId ||
      !category.categoryId ||
      !startDate ||
      !endDate ||
      !ticketQuantity ||
      !ticketPrice ||
      !coverImg
    ) {
      Alert.alert('Алдаа гарлаа', 'Бүх талбарыг бөглөнө үү', [
        {
          text: 'OK',
          onPress: () => console.log('ok'),
          style: 'cancel',
        },
      ]);
    } else {
      setLoading(true);
      axios
        .post(
          `${baseUrl}/event/create`,
          {
            eventName,
            organizerId: organizerId,
            categoryId: category.categoryId,
            startDate: startDate,
            endDate: endDate,
            isOnline: isOnline,
          },
          {
            headers: {Authorization: getToken()},
          },
        )
        .then(res => {
          coverUpload(coverImgRes, res.data.eventId, eventName);
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
        });
    }
  };

  const coverUpload = useCallback(
    (img, eventId, eName) => {
      let formdata = new FormData();
      let file = img.assets[0];
      formdata.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });
      fetch(`${baseUrl}/image/event/${eventId}/upload`, {
        method: 'POST',
        body: formdata,
        headers: {Authorization: `Bearer ${token}`},
      })
        .then(response => {
          console.log('uploaded');
          saveTicket(eventId, ticketPrice, ticketQuantity, eName);
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('Алдаа гарлаа', err.message, [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            },
          ]);
        });
    },
    [saveTicket, ticketPrice, ticketQuantity, token],
  );

  const saveTicket = useCallback(
    (eventId, tPrice, tQuantity, eName) => {
      axios
        .post(
          `${baseUrl}/event/ticket/create`,
          {
            eventId: eventId,
            price: tPrice,
            quantity: tQuantity,
          },
          {
            headers: {
              Authorization: getToken(),
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setLoading(false);
          Alert.alert(eName, 'Амжилттай үүслээ', [
            {
              text: 'OK',
              onPress: () => navigate('Events'),
              style: 'cancel',
            },
          ]);
          setEventName(null);
          setDescription(null);
          setEndDate(null);
          setStartDate(null);
          setCoverImg(null);
          setTicketQuantity(null);
          setTicketPrice(null);
          setCategory(null);
          setTicketType(null);
        })
        .catch(err => {
          setLoading(false);
          alertView.show({
            title: 'Алдаа',
            message: err.data,
          });
        });
    },
    [getToken, navigate],
  );

  const SectionTitle = ({title, icon}) => (
    <View>
      <View style={styles.sectionTitle}>
        <IconButton icon={icon} s color={colors.primary} />
        <BlueText style={[text.lgThin, {marginLeft: size.md}]}>
          {title}
        </BlueText>
      </View>
      <BlackText
        style={[text.sm, {marginHorizontal: size.lg * 2, marginTop: size.sm}]}>
        Та зохиох гэж буй эвэвнтийн талаарх мэдээлэл оруулна уу?
      </BlackText>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <CText style={[text.heading, {margin: size.lg}]}>Эвэнт үүсгэх</CText>
          <SectionTitle title="Мэдээлэл" icon="newspaper" />
          <View style={styles.body}>
            <OutlinedBox>
              <TextInput
                value={eventName}
                onChangeText={setEventName}
                style={{
                  marginLeft: size.md,
                  color: colors.text,
                  width: '90%',
                }}
                placeholder="Эвэнтийн нэр"
                placeholderTextColor={colors.border}
              />
            </OutlinedBox>
            <OutlinedBox>
              <TextInput
                value={description}
                onChangeText={e => setDescription(e)}
                style={{marginLeft: size.md, color: colors.text, width: '90%'}}
                placeholder="Эвэнтийн тайлбар"
                placeholderTextColor={colors.border}
              />
            </OutlinedBox>
            <OutlinedBox>
              <ModalSelector
                keyExtractor={item => item.categoryId}
                data={categories}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                labelExtractor={item => item.categoryName}
                onChange={c => {
                  setCategory(c);
                }}>
                <TextInput
                  style={{
                    marginLeft: size.md,
                    color: colors.text,
                    width: '90%',
                  }}
                  editable={false}
                  placeholder="Ангилал"
                  placeholderTextColor={colors.border}
                  value={category && category.categoryName}
                />
              </ModalSelector>
              {/* <IconButton icon="chevron-down" s /> */}
            </OutlinedBox>
          </View>
          <SectionTitle title="Төрөл" icon="location-outline" />
          <View style={styles.buttonBar}>
            <OutlinedButton
              title="Байрласан"
              style={styles.btn}
              bc={isOnline === 1 && colors.border}
              onPress={() => setIsOnline(0)}
            />
            <OutlinedButton
              title="Цахим"
              style={styles.btn}
              bc={isOnline !== 1 && colors.border}
              onPress={() => setIsOnline(1)}
            />
          </View>
          <SectionTitle title="Огноо" icon="calendar-outline" />
          <OutlinedBox>
            <View style={[layout.hsb, {justifyContent: 'flex-start'}]}>
              <IconButton icon="calendar" s />
              <TextInput
                style={{marginLeft: size.md, color: colors.text}}
                editable={false}
                placeholder="Эхлэх огноо"
                placeholderTextColor={colors.border}
                value={
                  startDate && startDate.toLocaleDateString('mn-Mn', options)
                }
              />
            </View>
            <DatePicker
              modal
              mode="date"
              open={openStart}
              date={new Date()}
              // locale="mn"
              onConfirm={d => {
                setOpenStart(false);
                setStartDate(d);
              }}
              onCancel={() => {
                setOpenStart(false);
              }}
            />
            <IconButton
              icon="chevron-down"
              s
              onPress={() => setOpenStart(true)}
            />
          </OutlinedBox>
          <OutlinedBox>
            <View style={[layout.hsb, {justifyContent: 'flex-start'}]}>
              <IconButton icon="calendar-outline" s />
              <TextInput
                style={{marginLeft: size.md, color: colors.text}}
                editable={false}
                placeholder="Дуусах огноо"
                placeholderTextColor={colors.border}
                value={endDate && endDate.toLocaleDateString('mn-Mn', options)}
              />
              <DatePicker
                modal
                mode="date"
                open={openEnd}
                // locale="mn"
                date={new Date()}
                onConfirm={d => {
                  setOpenEnd(false);
                  setEndDate(d);
                }}
                onCancel={() => {
                  setOpenEnd(false);
                }}
              />
            </View>
            <IconButton
              icon="chevron-down"
              s
              onPress={() => setOpenEnd(true)}
            />
          </OutlinedBox>
          <SectionTitle title="Эвэнтийн үндсэн зураг" icon="camera-outline" />
          <OutlinedBox img>
            <TouchableOpacity
              style={styles.coverButton}
              onPress={onImageLibraryPress}>
              {coverImg ? (
                <Image source={{uri: coverImg}} style={styles.cover} />
              ) : (
                <>
                  <IconButton icon="camera-outline" />
                  <BlackText style={{marginLeft: size.md, ...text.md}}>
                    Зураг оруулах
                  </BlackText>
                </>
              )}
            </TouchableOpacity>
          </OutlinedBox>
        </View>
        <View style={[styles.createTicket]}>
          <SectionTitle title="Тасалбар" icon="camera-outline" />
          <OutlinedBox>
            <ModalSelector
              keyExtractor={item => item.id}
              data={ticketsType}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              labelExtractor={item => item.name}
              onChange={c => {
                setTicketType(c);
              }}>
              <TextInput
                style={{marginLeft: size.md, color: colors.text, width: '100%'}}
                editable={false}
                placeholder="Төрөл"
                placeholderTextColor={colors.border}
                value={ticketType && ticketType.name}
              />
            </ModalSelector>
            {/* <IconButton icon="chevron-down" s /> */}
          </OutlinedBox>
          <OutlinedBox>
            <TextInput
              value={ticketPrice}
              onChangeText={e => setTicketPrice(e)}
              style={{marginLeft: size.md, color: colors.text, width: '90%'}}
              placeholder="Үнэ"
              placeholderTextColor={colors.border}
              keyboardType="numeric"
              focusable={false}
            />
          </OutlinedBox>
          <OutlinedBox>
            <TextInput
              value={ticketQuantity}
              onChangeText={e => setTicketQuantity(e)}
              style={{marginLeft: size.md, color: colors.text, width: '90%'}}
              placeholder="Хэмжээ"
              placeholderTextColor={colors.border}
              keyboardType="numeric"
              focusable={false}
            />
          </OutlinedBox>
          <View style={[styles.buttonBar, {marginTop: size.xl}]}>
            <OutlinedButton
              title="Хадгалах"
              style={styles.btn}
              fill
              onPress={save}
            />
          </View>
        </View>
      </ScrollView>
      <Loading loading={loading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 100,
    paddingTop: size.lg,
  },
  sectionTitle: {
    ...layout.hsb,
    justifyContent: 'flex-start',
    marginHorizontal: size.md,
    marginTop: size.lg,
  },
  outlinedBox: {
    paddingHorizontal: size.lg,
    borderRadius: size.sm,
    height: size.xl,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: size.lg,
    marginTop: size.md,
    justifyContent: 'center',
    ...layout.shadow,
  },
  body: {
    marginTop: size.lg,
  },
  buttonBar: {
    ...layout.hsb,
    paddingHorizontal: size.md,
    marginTop: size.md,
  },
  btn: {
    flex: 1,
    margin: size.md,
  },
  createTicket: {
    marginTop: 20,
  },
  coverButton: {
    flex: 1,
    ...layout.hsb,
  },
  cover: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
    ...layout.shadow,
  },
});
