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

const IconGuanzhu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1496 1024" width={size} height={size} {...rest}>
      <Path
        d="M561.049904 230.618708c-84.423246 0-153.018979 68.831965-153.018979 153.550501s68.595733 153.5505 153.018979 153.5505c84.423246 0 153.018979-68.831965 153.01898-153.5505S645.473151 230.618708 561.049904 230.618708z m0 409.448315c-140.764468 0-255.011946-114.631354-255.011946-255.897814 0-141.26646 114.247478-255.927343 255.011946-255.927344 140.764468 0 255.011946 114.660883 255.011947 255.927344S701.814373 640.067023 561.049904 640.067023zM561.049904 0.292958C306.037958 0.292958 88.23248 159.483486 0 384.169209c88.23248 224.685722 306.037958 383.87625 561.049904 383.87625 255.277707 0 472.817425-159.190528 561.049905-383.87625C1033.867329 159.483486 816.327611 0.292958 561.049904 0.292958z"
        fill={getIconColor(color, 0, '#C3C3C3')}
      />
    </Svg>
  );
};

IconGuanzhu.defaultProps = {
  size: 18,
};

export default IconGuanzhu;
