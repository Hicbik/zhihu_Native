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

const IconBi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M255.021755 1023.881166a45.517619 45.517619 0 0 1-6.578304 0H45.68315a53.050838 53.050838 0 0 1-45.623721-47.215245l16.021353-192.892846a55.809481 55.809481 0 0 1 15.17254-45.305415l597.564635-602.551414 260.904019 269.498255-597.670736 602.657516a51.459312 51.459312 0 0 1-37.029485 15.809149z m702.923598-687.326652L697.041334 67.268462l18.143386-18.35559A158.197598 158.197598 0 0 1 829.456225 0.212203a158.197598 158.197598 0 0 1 114.271504 48.700669l31.830502 33.52813a167.85285 167.85285 0 0 1 47.427449 117.985063 168.383359 168.383359 0 0 1-47.427449 117.985062l-18.037284 18.143387z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBi.defaultProps = {
  size: 18,
};

export default IconBi;
