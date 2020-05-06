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

const IconXiangshangsanjiaoxing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M882.12992 795.01824a25.6 25.6 0 0 0 8.6528-35.15392L560.16896 213.34528a56.32 56.32 0 0 0-19.03616-19.03616c-26.61376-16.09728-61.2352-7.5776-77.3376 19.03616L133.18144 759.86432a25.6 25.6 0 0 0 21.90336 38.85056h713.79456a25.6 25.6 0 0 0 13.25056-3.69664zM155.0848 849.91488c-42.41408 0-76.8-34.38592-76.8-76.8a76.8 76.8 0 0 1 11.08992-39.75168L419.98848 186.84416c30.73536-50.80576 96.83968-67.07712 147.64544-36.34176a107.52 107.52 0 0 1 36.34688 36.34176l330.61376 546.51904c21.95456 36.29056 10.32704 83.5072-25.9584 105.46176a76.8 76.8 0 0 1-39.7568 11.08992H155.0848z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconXiangshangsanjiaoxing.defaultProps = {
  size: 18,
};

export default IconXiangshangsanjiaoxing;
