import videoTest from "./assets/test.mp4";

/** ref 렌더링 문제로 인해 id를 직접 입력하여 사용해야 함 */
export const data = [
  {
    id: 0,
    source: { uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
    title: "Bunny Video",
  },
  {
    id: 1,
    source: videoTest,
    title: "Drone Test Video",
  },
  {
    id: 2,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    title: "Elephants Dream Video",
  },
  {
    id: 3,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    title: "For Bigger Blazes Video",
  },
  {
    id: 4,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    title: "For Bigger Escapes Video",
  },
  // {
  //   id: 5,
  //   source: { uri: "rtsp://172.30.1.17/11" },
  //   title: "Cam_1",
  // },
  // {
  //   id: number,
  //   source: { uri: "http://221.156.189.42:8080" },
  // },
];
