/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import App from './App';
import { name as appName } from './app.json';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'A few seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
  },
});

AppRegistry.registerComponent(appName, () => App);
