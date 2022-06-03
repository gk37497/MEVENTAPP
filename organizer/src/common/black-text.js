import React from 'react';
import {Text} from 'react-native';

export const BlackText = props => {
  return (
    <Text
      {...props}
      style={[
        {
          color: '#656368',
          fontSize: props.lg ? 20 : props.md ? 18 : props.sm ? 15 : 12,
          fontWeight: 'bold',
        },
        props.style,
      ]}
    />
  );
};
