/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { register } from "@videosdk.live/react-native-sdk";
import 'react-native-gesture-handler';
register();

AppRegistry.registerComponent(appName, () => App);
