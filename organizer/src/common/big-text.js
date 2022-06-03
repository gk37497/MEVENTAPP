import React from 'react';
import {text} from '../styles';
import {CText} from './c-text';

export const BigText = props => {
  return <CText {...props} style={[text.heading, props.style]} />;
};
