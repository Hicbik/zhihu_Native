/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconXiala: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 681.472c-17.92 0-35.84-4.096-52.224-12.8L29.696 445.44c-26.624-13.824-37.376-47.104-23.552-73.728 13.824-26.624 47.104-37.376 73.728-23.552l430.08 223.232c1.024 0.512 2.56 0.512 4.096 0l430.08-223.232c26.624-13.824 59.904-3.584 73.728 23.552 13.824 26.624 3.584 59.904-23.552 73.728l-430.08 223.232c-16.384 8.704-34.304 12.8-52.224 12.8z"
        fill={getIconColor(color, 0, '#A0A3B8')}
      />
    </Svg>
  );
};

IconXiala.defaultProps = {
  size: 18,
};

export default IconXiala;
