import {useTheme} from '@react-navigation/native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {BlueText} from '../common/blue-text';
import {RedText} from '../common/red-text';
import {layout, size, text} from '../styles';

export let alertView;
export function setAlertView(ref) {
  alertView = ref;
}

const AlertModalView = forwardRef((props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');

  const {colors} = useTheme();
  const cancel = () => {
    setIsModalVisible(false);
  };
  const show = m => {
    setContent(m);
    setIsModalVisible(true);
  };
  useImperativeHandle(ref, () => ({
    show: m => show(m),
    close: () => cancel,
  }));

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={cancel}>
      <View
        style={[
          styles.root,
          {backgroundColor: colors.background, borderColor: colors.border},
        ]}>
        <View style={styles.header}>
          <RedText style={text.md}>{content.title}</RedText>
        </View>
        <View style={styles.body}>
          <BlueText>{content.message}</BlueText>
        </View>
      </View>
    </Modal>
  );
});

export default AlertModalView;

const styles = StyleSheet.create({
  root: {
    borderRadius: size.md,
    padding: size.md,
    backgroundColor: 'pink',
  },
  header: {
    ...layout.center,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: size.lg,
  },
  body: {
    ...layout.center,
    paddingVertical: size.lg,
  },
});
