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
import Skeleton from "./Skeleton";

const VideoSection = ({
  playStatus,
  setPlayStatus,
  rotate,
  setRotate,
  onSaveImageAsync,
  onVideoControl,
  res,
  videoRefs,
  isLoading,
  setIsLoading,
}) => {
  return (
    <View style={!rotate ? "" : styles.rotateView}>
      <View style={!rotate ? "" : styles.rotateVideoWrapper}>
        {!isLoading && <Skeleton width="100%" paddingTop="56.25%" />}
        <Video
          source={res.source}
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          ref={(el) => (videoRefs.current[res.id] = el)}
          style={{
            width: `${!rotate ? VIDEOWIDTH_PORTRAIT : VIDEOWIDTH_LANDSCAPE}%`,
            paddingTop: `${
              !rotate ? VIDEOHEIGHT_PORTRAIT : VIDEOHEIGHT_LANDSCAPE
            }%`,
            justifyContent: "center",
            display: isLoading ? "flex" : "none",
          }}
          onPlaybackStatusUpdate={(playStatus) =>
            setPlayStatus(() => playStatus)
          }
          onLoad={() => setIsLoading(true)}
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
