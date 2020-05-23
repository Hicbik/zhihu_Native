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

const IconWenti: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0a512 512 0 1 0 0 1024A512 512 0 1 0 512 0z m-1.901714 767.268571a53.540571 53.540571 0 0 1-52.882286-54.272c0-29.988571 23.698286-54.345143 52.809143-54.345142 29.257143 0 52.955429 24.283429 52.955428 54.345142 0 29.988571-23.698286 54.272-52.955428 54.272zM657.554286 425.837714c-6.729143 13.312-15.506286 25.6-25.965715 36.278857-10.020571 10.24-28.013714 27.355429-54.125714 51.492572a218.477714 218.477714 0 0 0-17.188571 17.92 70.217143 70.217143 0 0 0-9.654857 14.043428 71.533714 71.533714 0 0 0-4.900572 12.8c-1.901714 7.533714-3.657143 14.994286-5.266286 22.528-3.949714 22.893714-16.530286 34.230857-37.741714 34.230858a37.741714 37.741714 0 0 1-27.648-11.190858c-7.533714-7.460571-11.264-18.505143-11.264-33.28 0-18.285714 2.779429-34.304 8.192-47.689142 5.485714-13.458286 12.8-25.307429 21.942857-35.547429 9.069714-10.093714 21.357714-22.308571 36.717715-36.278857 13.531429-12.214857 23.332571-21.504 29.257142-27.794286 6.070857-6.290286 11.190857-13.165714 15.286858-20.845714a59.026286 59.026286 0 0 0-12.726858-69.339429 67.437714 67.437714 0 0 0-48.64-18.066285c-23.186286 0-40.301714 6.070857-51.273142 18.212571-11.044571 12.141714-20.333714 30.061714-27.940572 53.76-7.168 24.795429-20.772571 37.083429-40.96 37.083429a39.497143 39.497143 0 0 1-29.915428-12.946286 40.521143 40.521143 0 0 1-12.141715-28.086857c0-20.845714 6.436571-41.910857 19.309715-63.341715 12.873143-21.284571 31.744-38.985143 56.393142-53.028571 24.722286-14.043429 53.613714-20.992 86.528-20.992 30.72 0 57.782857 5.851429 81.188572 17.554286 23.405714 11.702857 41.618286 27.721143 54.418286 47.762285 12.8 20.187429 19.090286 42.130286 19.090285 65.755429 0 18.651429-3.657143 35.035429-10.971428 49.005714z"
        fill={getIconColor(color, 0, '#1C75F5')}
      />
    </Svg>
  );
};

IconWenti.defaultProps = {
  size: 18,
};

export default IconWenti;
