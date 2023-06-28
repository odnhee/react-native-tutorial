import { useQuery } from "@tanstack/react-query";
import { buoyRequest } from "../utils/axiosUtil";

const getOxygenData = async ({ queryKey }) => {
  const id = queryKey[1];
  // const pageNum = queryKey[2];
  return await buoyRequest({ url: `/${id}/oxygens/?size=10` });
};

const getPhData = async ({ queryKey }) => {
  const id = queryKey[1];
  // const pageNum = queryKey[2];
  return await buoyRequest({ url: `/${id}/phs/?size=10` });
};

export const useBuoyOxygen = (id) => {
  return useQuery(["oxygen", id], getOxygenData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    select: (data) => {
      const oxygenData = data?.data.results?.map((res) => res);
      return oxygenData;
    },
  });
};

export const useBuoyPh = (id) => {
  return useQuery(["ph", id], getPhData, {
    cacheTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
    refetchOnWindowFocus: true, // 다른 창을 갔다가 돌아왔을 시, refetch
    refetchOnMount: true,
    retry: 2, // error시 fetch 재시도
    select: (data) => {
      const phData = data?.data.results?.map((res) => res);
      return phData;
    },
  });
};
