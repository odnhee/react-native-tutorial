import { useQuery } from "@tanstack/react-query";
import { videoRequest } from "../utils/axiosUtil";

const getVideoUrl = async () => {
  return await videoRequest({ url: "" });
};

export const useLiveVideo = () => {
  return useQuery(
    ["video"],
    // ["buoy"] -> queryFn
    getVideoUrl,
    {
      cacheTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
      refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
      refetchOnMount: true,
      retry: 2, // error시 fetch 재시도
      // refetchInterval: 5000, // polling (시간에 따라 refetch)
      // refetchIntervalInBackground: false,
      // enabled: false,
      select: (res) => {
        const exp = "kerning0\n";
        var condition = res.data.indexOf(exp);
        const https = res.data.substring(condition + exp.length);
        const video = https.slice(0, -1);

        return video;
      },
    }
  );
};
