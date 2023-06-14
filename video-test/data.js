import videoTest from "./assets/test.mp4";

/** ref 렌더링 문제로 인해 id를 직접 입력하여 사용해야 함 */
export const data = [
  {
    id: 0,
    source: {
      uri: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
    },
    title: "m3u8 source",
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
  //   source: {
  //     uri: "https://vod-archive-kr-cdn-z01.afreecatv.com/v101/hls/vod/20210424/870/232654870/REGL_65205AD9_232654870_1.smil/original/both/playlist.m3u8",
  //   },
  //   title: "Afreeca tv",
  // },
  // {
  //   id: number,
  //   source: { uri: "http://221.156.189.42:8080" },
  // },
];
