/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import Orientation from 'react-native-orientation-locker';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    function _onOrientationDidChange(orientation) {
      if (orientation == 'PORTRAIT') {
        Orientation.lockToLandscapeLeft();
      }
      console.log(orientation);
    }
    Orientation.lockToLandscapeLeft();
    Orientation.addOrientationListener(_onOrientationDidChange);

    //cleanup optional code
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(_onOrientationDidChange);
    };
  });

  return (
    <>
      <VLCPlayer
        style={{width: '100%', height: '50%'}}
        videoAspectRatio="16:9"
        source={{
          // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          uri: 'rtsp://172.30.1.17/11',
        }}
        // autoAspectRatiod={false}
      />
      <Button title="test" />
    </>
  );
}

export default App;
