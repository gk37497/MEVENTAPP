/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import Button from './Button';
import Util from '../common/Util';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.value) {
      this.state = {value: this.props.value, blurred: true};
    }

    this.state = {
      value: this.props.value,
      selectedValue: this.props.selectedValue,
      secureTextEntry: this.props.secureTextEntry,
      pattern: this.props.pattern,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.pattern !== this.props.pattern) {
      this.setState({pattern: nextProps.pattern});
    }
  }

  setValue = value => {
    this.setState({value}, () => this.validate());
  };

  getValue = () => {
    // сонголт хийдэг эсэхийг шалгана
    if (this.props.navigation) {
      return this.state.selectedValue;
    } else {
      return this.state.value;
    }
  };

  getValues = () => {
    if (this.validate() === false) {
      return false;
    }

    let values = {
      id: this.state.selectedValue,
      text: this.state.value,
    };

    return values;
  };

  validate = () => {
    if (
      this.props.required &&
      (!this.state.value ||
        (this.state.value && this.state.value.trim().length === 0))
    ) {
      if (this.props.requiredText) {
        this.setState({error: this.props.requiredText});
      } else {
        this.setState({error: `${this.props.label} оруулна уу!`});
      }

      return false;
    }

    if (
      this.state.value &&
      this.state.pattern &&
      !this.state.pattern.test(this.state.value)
    ) {
      this.setState({error: this.props.error});
      return false;
    }

    this.setState({error: null});

    return this.getValue();
  };

  _onChangeText = async text => {
    if (this.props.pan) {
      text = Util.formatPan(text);
    } else if (this.props.expireDate) {
      text = Util.formatExpireDate(text);
    } else if (this.props.tokenizeAmount) {
      text = Util.formatTokenizeAmount(text);
    }

    await this.setState({value: text});
    this.validate();
    this.props.onChangeText && this.props.onChangeText(text);
  };

  _onBlur = () => {
    this.setState({blurred: true});
  };

  _onFocus = () => {
    // сонголт хийдэг эсэхийг шалгана
    if (this.props.navigation) {
      // initialRouteName сонголт хийхэд гарч ирэх дэлгэцийн route нэр.
      // Өөрөөр хэлбэл SelectListScreen доторх stackNavigation дотор байгаа дэлгэцүүдийн route гэсэн үг.
      // Шинээр сонголт хийдэг дэлгэц нэмэх бол тэнд нэмж өгнө
      this.props.navigation.navigate('select', {
        initialRouteName: this.props.initialRouteName,
        sendData: this.props.sendData,
        callback: this.select,
        value: {value: this.state.selectedValue},
      });
    }

    this.setState({blurred: false});
  };

  // value-н бүтэц иймэрхүү байна {text: selectedText, value: selectedId}
  select = (value, data) => {
    this.setState({value: value.text, selectedValue: value.value}, () => {
      this.validate();
    });

    // onSelected callback дамжуулсан байвал дуудна
    this.props.onSelected && this.props.onSelected(value, data);
    this.props.onChangeText?.(value.text);
  };

  focus = () => {
    this.refs.textInput.focus();
  };

  onLayout = event => {
    const layout = event.nativeEvent.layout;
    this.y = layout.y;
  };

  showHideOrShowText = () => {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  };
  render() {
    return (
      <View style={[this.props.style]} onlayout={this.onLayout}>
        <View style={[styles.container]}>
          {this.props.image ? (
            <Image
              style={styles.image}
              source={this.props.image}
              resizeMode={'center'}
            />
          ) : null}

          <View style={{flex: 1, justifyContent: 'center'}}>
            {this.state.value == '' || this.state.value == undefined ? null : (
              <Text style={styles.label}>{this.props.label}</Text>
            )}
            <TextInput
              ref="textInput"
              style={styles.textInput}
              onChangeText={this._onChangeText}
              onBlur={this._onBlur}
              onFocus={this._onFocus}
              value={this.state.value}
              selectedValue={this.state.selectedValue}
              autoFocus={this.props.autoFocus}
              selectionColor="#000"
              placeholderTextColor="#666"
              multiline={!this.props.secureTextEntry && this.props.multiline}
              secureTextEntry={this.state.secureTextEntry}
              scrollEnabled={this.props.scrollEnabled}
              keyboardType={this.props.keyboardType}
              placeholder={
                this.props.placeholder != null
                  ? this.props.placeholder
                  : this.props.label
              }
              returnKeyType={this.props.returnKeyType}
              onSubmitEditing={this.props.onSubmitEditing}
              blurOnSubmit={false}
              autoCapitalize={this.props.autoCapitalize}
              editable={this.props.editable}
              maxLength={this.props.maxLength}
            />
            {this.state.error ? (
              <Text style={styles.error}>{this.state.error}</Text>
            ) : null}
          </View>

          {this.props.secureTextEntry && !this.props.hideSecureText ? (
            <Button
              onPress={this.showHideOrShowText}
              style={styles.passwordButton}
              image={require('../image/eye.png')}
              hideGradient
            />
          ) : null}
        </View>
        {this.props.hideBorder ? null : <View style={styles.border} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    marginRight: 32,
    height: 24,
    width: 24,
  },

  label: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    lineHeight: 16,
  },

  error: {
    color: '#EB5757',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginBottom: 8,
  },

  textInput: {
    color: '#000',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    minHeight: 32,
  },

  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },

  passwordButton: {
    marginLeft: 16,
    marginRight: 8,
  },
});
