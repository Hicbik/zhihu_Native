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

const IconXiangxiasanjiaoxing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M141.84448 228.97664a25.6 25.6 0 0 0-8.6528 35.15392l330.61376 546.51392a56.32 56.32 0 0 0 19.03616 19.03616c26.61376 16.1024 61.24032 7.5776 77.34272-19.03616l330.61376-546.51392A25.6 25.6 0 0 0 868.8896 225.28H155.09504a25.6 25.6 0 0 0-13.25056 3.69664zM868.8896 174.08c42.4192 0 76.8 34.38592 76.8 76.8a76.8 76.8 0 0 1-11.0848 39.75168l-330.61376 546.51392c-30.73536 50.81088-96.83968 67.08224-147.65056 36.34688a107.52 107.52 0 0 1-36.34176-36.34688L89.38496 290.6368c-21.95456-36.3008-10.33216-83.51232 25.9584-105.472A76.8 76.8 0 0 1 155.09504 174.08h713.79456z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconXiangxiasanjiaoxing.defaultProps = {
  size: 18,
};

export default IconXiangxiasanjiaoxing;
