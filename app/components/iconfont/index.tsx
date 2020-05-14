/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconDianzan11Copy from './IconDianzan11Copy';
import IconXiayige from './IconXiayige';
import IconNv from './IconNv';
import IconTubiaozhizuomoban from './IconTubiaozhizuomoban';
import IconJiahao1 from './IconJiahao1';
import IconSanjiaoxing from './IconSanjiaoxing';
import IconShezhi from './IconShezhi';
import IconArrowRight from './IconArrowRight';
import IconArrowLift from './IconArrowLift';
import IconArrowUp from './IconArrowUp';
import IconClose from './IconClose';
import IconArrowDown from './IconArrowDown';
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

export type IconNames = 'dianzan11-copy' | 'xiayige' | 'nv' | 'tubiaozhizuomoban' | 'jiahao1' | 'sanjiaoxing' | 'shezhi' | 'arrow-right' | 'arrow-lift' | 'arrow-up' | 'close' | 'arrow-down' | 'xiangshangsanjiaoxing' | 'xiangxiasanjiaoxing' | 'pinglun' | 'sousuo' | 'jiahao' | '-' | 'zhibo' | 'gengduo' | 'huabanfuben' | 'tongzhi' | 'faxian' | 'wenzhang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'dianzan11-copy':
      return <IconDianzan11Copy {...rest} />;
    case 'xiayige':
      return <IconXiayige {...rest} />;
    case 'nv':
      return <IconNv {...rest} />;
    case 'tubiaozhizuomoban':
      return <IconTubiaozhizuomoban {...rest} />;
    case 'jiahao1':
      return <IconJiahao1 {...rest} />;
    case 'sanjiaoxing':
      return <IconSanjiaoxing {...rest} />;
    case 'shezhi':
      return <IconShezhi {...rest} />;
    case 'arrow-right':
      return <IconArrowRight {...rest} />;
    case 'arrow-lift':
      return <IconArrowLift {...rest} />;
    case 'arrow-up':
      return <IconArrowUp {...rest} />;
    case 'close':
      return <IconClose {...rest} />;
    case 'arrow-down':
      return <IconArrowDown {...rest} />;
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
