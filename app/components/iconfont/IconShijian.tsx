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

const IconShijian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 51.2c254.087 0 460.8 206.714 460.8 460.8S766.088 972.8 512 972.8 51.2 766.086 51.2 512 257.912 51.2 512 51.2M512 0C229.225 0 0 229.229 0 512c0 282.772 229.225 512 512 512 282.769 0 512-229.228 512-512C1024 229.229 794.768 0 512 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M767.999 512.003h-232.73V209.456c0-12.863-10.43-23.272-23.271-23.272-12.84 0-23.274 10.408-23.274 23.272v325.816c0 12.842 10.434 23.272 23.274 23.272h256.001c12.84 0 23.273-10.431 23.273-23.272-0.002-12.86-10.433-23.269-23.273-23.269z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconShijian.defaultProps = {
  size: 18,
};

export default IconShijian;
