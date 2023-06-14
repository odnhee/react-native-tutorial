/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import {
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

  return (
    <SafeAreaView style={[backgroundStyle, {height: '50%'}]}>
      <View>
        <VLCPlayer
          style={{width: '100%', height: '100%'}}
          videoAspectRatio="16:9"
          source={{
            uri: 'rtsp://172.30.1.17/11',
          }}
          resizeMode="contain"
          // autoAspectRatiod={false}
        />
        {/* <VlCPlayerView
          autoplay={false}
          style={{width: '100%', height: '100%'}}
          url="rtsp://172.30.1.17/11"
          // Orientation={Orientation}
          // ggUrl=""
          // showGG={true}
          // showTitle={true}
          // title="Big Buck Bunny"
          // showBack={true}
          // onLeftPress={() => {}}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
