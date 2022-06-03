import React from 'react';
import {Text} from 'react-native';

export const RedText = props => {
  return (
    <Text {...props} style={[props.style, {color: '#C42A0C', fontSize: 15}]}>
      {props.children}
    </Text>
  );
};
