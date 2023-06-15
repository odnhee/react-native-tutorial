import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { ResizeMode, Video } from "expo-av";

import {
  VIDEOHEIGHT_LANDSCAPE,
  VIDEOWIDTH_LANDSCAPE,
} from "../config/videoSize";
import { styles } from "../config/globalStyles";

const LandscapeVideo = ({
  rotate,
  setRotate,
  onSaveImageAsync,
  res,
  videoRefs,
}) => {
  return (
    <View key={res.id} style={styles.rotateView}>
      <View style={styles.rotateVideoWrapper}>
        <Video
          source={res.source}
          shouldPlay
          ref={(el) => (videoRefs.current[res.id] = el)}
          style={{
            width: `${VIDEOWIDTH_LANDSCAPE}%`,
            paddingTop: `${VIDEOHEIGHT_LANDSCAPE}%`,
            justifyContent: "center",
          }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      </View>

      <View style={styles.rotateButton}>
        <TouchableOpacity
          onPress={() => {
            const idx = res.id;
            const title = res.title;
            onSaveImageAsync(idx, title);
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>SHOT</Text>
        </TouchableOpacity>
        <Button title={`FULL`} onPress={() => setRotate(!rotate)} />
      </View>
    </View>
  );
};

export default LandscapeVideo;
