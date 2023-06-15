import { Button, View } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";

import { VIDEOHEIGHT_PORTRAIT, VIDEOWIDTH_PORTRAIT } from "../config/videoSize";
import { styles } from "../config/globalStyles";

const PortraitVideo = ({
  rotate,
  setRotate,
  onSaveImageAsync,
  res,
  videoRefs,
}) => {
  return (
    <View key={res.id}>
      <Video
        source={res.source}
        shouldPlay
        ref={(el) => (videoRefs.current[res.id] = el)}
        style={{
          width: `${VIDEOWIDTH_PORTRAIT}%`,
          paddingTop: `${VIDEOHEIGHT_PORTRAIT}%`,
        }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />

      <View style={styles.button}>
        <Button
          title={`${res.title} Screen Shot`}
          onPress={() => {
            const idx = res.id;
            const title = res.title;
            onSaveImageAsync(idx, title);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button title={`Full Screen`} onPress={() => setRotate(!rotate)} />
      </View>
    </View>
  );
};

export default PortraitVideo;
