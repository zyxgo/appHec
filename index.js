import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

/**
 * React Native 0.54 warning message ignore.
 */
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',,
  'Module RCTImageLoader',
  'Setting a timer for a',
]);

AppRegistry.registerComponent('appHec', () => App);
