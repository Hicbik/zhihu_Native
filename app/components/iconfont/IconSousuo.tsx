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

const IconSousuo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M592.592593 583.111111m-402.962963 0a402.962963 402.962963 0 1 0 805.925926 0 402.962963 402.962963 0 1 0-805.925926 0Z"
        fill={getIconColor(color, 0, '#6160F4')}
        fill-opacity=".1"
      />
      <Path
        d="M284.444444 587.851852a56.888889 56.888889 0 1 1 0-113.777778 56.888889 56.888889 0 0 1 0 113.777778zM483.555556 587.851852a56.888889 56.888889 0 1 1 0-113.777778 56.888889 56.888889 0 0 1 0 113.777778zM682.666667 587.851852a56.888889 56.888889 0 1 1 0-113.777778 56.888889 56.888889 0 0 1 0 113.777778z"
        fill={getIconColor(color, 1, '#6160F4')}
      />
      <Path
        d="M747.406222 829.487407a37.925926 37.925926 0 1 1 53.636741-53.63674L908.325926 883.124148a37.925926 37.925926 0 1 1-53.636741 53.636741L747.406222 829.487407z"
        fill={getIconColor(color, 2, '#635FF1')}
      />
      <Path
        d="M474.074074 967.111111C222.72 967.111111 18.962963 763.354074 18.962963 512S222.72 56.888889 474.074074 56.888889s455.111111 203.757037 455.111111 455.111111-203.757037 455.111111-455.111111 455.111111z m0-75.851852c209.455407 0 379.259259-169.803852 379.259259-379.259259S683.529481 132.740741 474.074074 132.740741 94.814815 302.544593 94.814815 512s169.803852 379.259259 379.259259 379.259259z"
        fill={getIconColor(color, 3, '#655CF4')}
      />
    </Svg>
  );
};

IconSousuo.defaultProps = {
  size: 18,
};

export default IconSousuo;
