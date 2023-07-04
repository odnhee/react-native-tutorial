import { View, Text, Pressable, Alert } from "react-native";
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
  onVideoControlNoLive,
  res,
  videoRefs,
  isLoading,
  setIsLoading,
  onSendPush,
  onSoundControl,
  videoUrl,
  sendSMS,
  smsAvailable,
}) => {
  const buttonContents = [
    {
      onPress: () => setRotate(!rotate),
      text: "🔄",
    },
    {
      onPress: () => {
        const idx = res.id;
        onVideoControl(idx);
        // onVideoControlNoLive(idx);
      },
      text: `${playStatus.isPlaying ? "⏸️" : "▶️"}`,
    },
    {
      onPress: () => {
        const idx = res.id;
        onSoundControl(idx);
      },
      text: `${!playStatus.isMuted ? "🔇" : "🔊"}`,
    },
    {
      onPress: () => {
        const idx = res.id;
        const title = res.title;
        onSaveImageAsync(idx, title);
      },
      text: "📷",
    },
    {
      onPress: () => {
        Alert.alert("", "해양 경찰서에 신고 문자를 보내시겠습니까?", [
          { text: "취소", onPress: () => null },
          { text: "확인", onPress: () => sendSMS() },
        ]);
      },
      text: "🚨",
    },
    {
      onPress: async () => {
        const type = "warning";
        await onSendPush(type);
      },
      text: "🔔",
    },
  ];

  return (
    <View style={!rotate ? "" : styles.rotateView}>
      <View style={!rotate ? "" : styles.rotateVideoWrapper}>
        {!isLoading && (
          <Skeleton
            width={`${!rotate ? VIDEOWIDTH_PORTRAIT : VIDEOWIDTH_LANDSCAPE}%`}
            paddingTop={`${
              !rotate ? VIDEOHEIGHT_PORTRAIT : VIDEOHEIGHT_LANDSCAPE
            }%`}
          />
        )}
        <Video
          source={!res.source ? { uri: `${videoUrl}` } : res.source}
          shouldPlay
          isMuted
          resizeMode={ResizeMode.CONTAIN}
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

      <View style={!rotate ? styles.defaultButton : styles.rotateButton}>
        {buttonContents.map((content) => (
          <Pressable onPress={content.onPress} key={content.text}>
            <Text style={styles.buttonText}>{content.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default VideoSection;
