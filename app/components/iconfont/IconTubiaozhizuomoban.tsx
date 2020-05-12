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

const IconTubiaozhizuomoban: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M471.93 552.28m-98.92 0a98.92 98.92 0 1 0 197.84 0 98.92 98.92 0 1 0-197.84 0Z"
        fill={getIconColor(color, 0, '#d4237a')}
      />
      <Path
        d="M830.56 498.49V193.28H525.35c-4.65-0.2-9.32-0.31-14.02-0.31s-9.37 0.11-14.02 0.31h-0.03C327.33 200.63 191.8 340.74 191.8 512.5c0 176.47 143.06 319.53 319.53 319.53 171.77 0 311.87-135.53 319.22-305.48v-0.03c0.2-4.65 0.31-9.32 0.31-14.02 0-4.7-0.1-9.36-0.3-14.01zM698.45 352.66v106.8c0 14.99-12.15 27.14-27.14 27.14s-27.14-12.15-27.14-27.14v-45.83l-55.84 46.85c19.75 25.15 31.54 56.86 31.54 91.32 0 81.71-66.24 147.95-147.95 147.95S323.97 633.51 323.97 551.8s66.24-147.95 147.95-147.95c27.41 0 53.08 7.46 75.09 20.46l53.04-44.51h-35.54c-14.99 0-27.14-12.15-27.14-27.14s12.15-27.14 27.14-27.14h106.8c14.99 0 27.14 12.15 27.14 27.14z"
        fill={getIconColor(color, 1, '#d4237a')}
      />
    </Svg>
  );
};

IconTubiaozhizuomoban.defaultProps = {
  size: 18,
};

export default IconTubiaozhizuomoban;
