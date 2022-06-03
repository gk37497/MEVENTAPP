import React from 'react';
import {Text} from 'react-native';

export const BlueText = props => {
  return (
    <Text
      {...props}
      style={[
        {
          color: '#4182FF',
          fontSize: props.lg ? 20 : props.md ? 18 : 15,
          fontWeight: props.lg ? 'normal' : 'bold',
        },
        props.style,
      ]}
    />
  );
};
