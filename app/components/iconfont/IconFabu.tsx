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

const IconFabu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928.77816 5.756762L57.588204 467.960772c-31.98201 17.97389-32.749578 54.177525-8.763071 74.006371l209.162346 138.673996c17.398214 9.210819 34.796427 9.210819 52.258605-9.274783l461.692298-443.718408 17.462178 9.210819-418.196765 471.478793c-8.699107 9.274783-8.699107 18.549566-8.699106 27.760385v203.405584c0 18.421638 8.699107 36.90724 26.09732 46.182023 17.462178 9.210819 34.860391 0 43.559498-9.274783l104.581173-110.913611 209.098382 147.948779c33.453183 19.89281 61.213567 9.722531 69.720782-27.760385L989.671907 61.213567c9.210819-46.054095-18.549566-73.878443-60.957711-55.456805z"
        fill={getIconColor(color, 0, '#86A2F9')}
      />
    </Svg>
  );
};

IconFabu.defaultProps = {
  size: 18,
};

export default IconFabu;
