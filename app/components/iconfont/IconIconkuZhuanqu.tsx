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

const IconIconkuZhuanqu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M763.093333 149.333333H260.906667A111.573333 111.573333 0 0 0 149.333333 260.906667v502.186666A111.573333 111.573333 0 0 0 260.906667 874.666667h502.186666A111.573333 111.573333 0 0 0 874.666667 763.093333V260.906667A111.573333 111.573333 0 0 0 763.093333 149.333333z m-55.808 390.570667h-167.381333v167.381333h-55.808v-167.381333h-167.381333v-55.808h167.381333v-167.381333h55.808v167.381333h167.381333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIconkuZhuanqu.defaultProps = {
  size: 18,
};

export default IconIconkuZhuanqu;
