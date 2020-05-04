/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconGengduo from './IconGengduo';
import IconHuabanfuben from './IconHuabanfuben';
import IconTongzhi from './IconTongzhi';
import IconFaxian from './IconFaxian';
import IconWenzhang from './IconWenzhang';

export type IconNames = 'gengduo' | 'huabanfuben' | 'tongzhi' | 'faxian' | 'wenzhang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'gengduo':
      return <IconGengduo {...rest} />;
    case 'huabanfuben':
      return <IconHuabanfuben {...rest} />;
    case 'tongzhi':
      return <IconTongzhi {...rest} />;
    case 'faxian':
      return <IconFaxian {...rest} />;
    case 'wenzhang':
      return <IconWenzhang {...rest} />;
  }

  return null;
};

export default IconFont;
