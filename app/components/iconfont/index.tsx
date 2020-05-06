/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconXiangshangsanjiaoxing from './IconXiangshangsanjiaoxing';
import IconXiangxiasanjiaoxing from './IconXiangxiasanjiaoxing';
import IconPinglun from './IconPinglun';
import IconSousuo from './IconSousuo';
import IconJiahao from './IconJiahao';
import Icon from './Icon';
import IconZhibo from './IconZhibo';
import IconGengduo from './IconGengduo';
import IconHuabanfuben from './IconHuabanfuben';
import IconTongzhi from './IconTongzhi';
import IconFaxian from './IconFaxian';
import IconWenzhang from './IconWenzhang';

export type IconNames = 'xiangshangsanjiaoxing' | 'xiangxiasanjiaoxing' | 'pinglun' | 'sousuo' | 'jiahao' | '-' | 'zhibo' | 'gengduo' | 'huabanfuben' | 'tongzhi' | 'faxian' | 'wenzhang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'xiangshangsanjiaoxing':
      return <IconXiangshangsanjiaoxing {...rest} />;
    case 'xiangxiasanjiaoxing':
      return <IconXiangxiasanjiaoxing {...rest} />;
    case 'pinglun':
      return <IconPinglun {...rest} />;
    case 'sousuo':
      return <IconSousuo {...rest} />;
    case 'jiahao':
      return <IconJiahao {...rest} />;
    case '-':
      return <Icon {...rest} />;
    case 'zhibo':
      return <IconZhibo {...rest} />;
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
