import * as DeviceInfo from 'react-native-device-info';

class Util {
  static instance = null;
  static bottomModal;
  static navigation;

  constructor() {}

  static getInstance() {
    if (Util.instance == null) {
      Util.instance = new Util();
    }

    return this.instance;
  }

  formatPoint = point => {
    if (!point) {
      return '0';
    }

    let arrays = String(point)
      .replace('-', '')
      .split(/(?=(?:...)*$)/);

    return arrays.join('’');
  };

  formatCurrency = currency => {
    if (!currency) {
      return '0₮';
    }

    let arrays = String(currency)
      .trim()
      .split(/(?=(?:...)*$)/);

    return arrays.join('’') + '₮';
  };

  formatPan = text => {
    text = text.replace(/\s/g, '');
    let array = String(text).match(/.{1,4}/g);

    if (array) {
      return array.join(' ');
    } else {
      return '';
    }
  };

  formatExpireDate = text => {
    text = text.replace(/\//g, '');

    if (text.length === 1 && text !== '0' && text !== '1') {
      return '0' + text;
    } else if (text.length === 2) {
      if (parseInt(text) > 12) {
        return text[0];
      } else {
        return text;
      }
    }

    let array = String(text).match(/.{1,2}/g);

    if (array) {
      return array.join('/');
    } else {
      return '';
    }
  };

  formatTokenizeAmount = text => {
    text = text.replace(/\./g, '');

    let array = String(text).match(/.{1,2}/g);

    if (array) {
      return array.join('.');
    } else {
      return '';
    }
  };

  formatMaskedPan = text => {
    text = text.replace(/\s/g, '');
    let array = String(text).match(/.{1,4}/g);

    if (array) {
      if (array.length === 4) {
        return array[0] + ' **** **** ' + array[3];
      } else if (array.length === 5) {
        return array[0] + ' **** **** **** ' + array[3];
      }

      return array.join(' ');
    } else {
      return '';
    }
  };

  formatDistance = distance => {
    if (distance == null) {
      return '';
    } else if (distance < 1000) {
      return distance + 'м';
    } else {
      let km = (distance / 1000).toFixed(0);

      // let arrays = String(km).split( /(?=(?:...)*$)/ )

      return km + 'км';
    }
  };

  getLocation = () => {
    this.latitude = undefined;
    this.longitude = undefined;

    // Geolocation.getCurrentPosition(
    //     position => {
    //
    //         this.latitude = position.coords.latitude
    //         this.longitude = position.coords.longitude
    //
    //     },
    //     (error) => {
    //
    //     },
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  };

  deviceInfo = async () => {
    return {
      deviceToken: DeviceInfo.getUniqueId(),
      latitude: this.latitude,
      longitude: this.longitude,
      channel: 'mobile',
      imei: await DeviceInfo.getMacAddress(),
      os: DeviceInfo.getSystemName(),
      osVersion: DeviceInfo.getSystemVersion(),
      phone: await DeviceInfo.getPhoneNumber(),
      operatoName: await DeviceInfo.getCarrier(),
    };
  };
}

export default Util.getInstance();
