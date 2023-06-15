import { Button, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import {
  VIDEOHEIGHT_LANDSCAPE,
  VIDEOHEIGHT_PORTRAIT,
  VIDEOWIDTH_LANDSCAPE,
  VIDEOWIDTH_PORTRAIT,
} from "../config/videoSize";
import { styles } from "../config/globalStyles";

const VideoSection = ({
  playStatus,
  setPlayStatus,
  rotate,
  setRotate,
  onSaveImageAsync,
  onVideoControl,
  onVideoControlNoLive,
  res,
  videoRefs,
}) => {
  return (
    <View style={!rotate ? "" : styles.rotateView}>
      <View style={!rotate ? "" : styles.rotateVideoWrapper}>
        <Video
          source={res.source}
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          ref={(el) => (videoRefs.current[res.id] = el)}
          style={{
            width: `${!rotate ? VIDEOWIDTH_PORTRAIT : VIDEOWIDTH_LANDSCAPE}%`,
            paddingTop: `${
              !rotate ? VIDEOHEIGHT_PORTRAIT : VIDEOHEIGHT_LANDSCAPE
            }%`,
            justifyContent: "center",
          }}
          onPlaybackStatusUpdate={(playStatus) => {
            setPlayStatus(() => playStatus);
          }}
        />
      </View>

      {!rotate ? (
        <>
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

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                const idx = res.id;
                onVideoControl(idx);
                // onVideoControlNoLive(idx);
              }}
            >
              <Text style={{ fontSize: 30 }}>
                {playStatus.isPlaying ? "⏸️" : "▶️"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.rotateButton}>
          <TouchableOpacity onPress={() => setRotate(!rotate)}>
            <Text style={{ fontSize: 50 }}>↩️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              onVideoControl(idx);
              // onVideoControlNoLive(idx);
            }}
          >
            <Text style={{ fontSize: 50 }}>
              {playStatus.isPlaying ? "⏸️" : "▶️"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const idx = res.id;
              const title = res.title;
              onSaveImageAsync(idx, title);
            }}
          >
            <Text style={{ fontSize: 50 }}>📷</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoSection;
