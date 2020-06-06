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

const IconZuoxia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M402.75200231 146.75247746l-319.99975962 319.99975961c-24.99198207 24.99198207-24.99198207 65.50354378 0 90.49552586l319.99975962 319.99975961c24.99198207 24.99198207 65.50354378 24.99198207 90.49552585 0s24.99198207-65.50354378 0-90.49552586l-210.75176192-210.75176191 613.50422814 0c35.3595817 0 63.99952766-28.63994596 64.00023476-64.00023477s-28.63994596-63.99952766-64.00023476-64.00023477l-613.50422814 0 210.75176192-210.75176191c12.47972758-12.51225449 18.75247184-28.86409881 18.75176473-45.24847004s-6.24021734-32.76803535-18.75176473-45.24847003c-24.99198207-24.99198207-65.50354378-24.99198207-90.49552585 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZuoxia.defaultProps = {
  size: 18,
};

export default IconZuoxia;
