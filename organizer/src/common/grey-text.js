import React from 'react';
import {Text} from 'react-native';

export const GreyText = props => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          color: '#BDBAC0',
          fontSize: props.md ? 15 : 12,
          fontWeight: props.md ? 'bold' : 'normal',
        },
      ]}
    />
  );
};
