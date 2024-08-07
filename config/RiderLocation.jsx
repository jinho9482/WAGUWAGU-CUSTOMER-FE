import axios from "axios";
import { riderLocationApi } from "./RiderLocationNetwork";

export const getRiderLocationByOrderId = async (orderId) => {
  try {
    const res = await riderLocationApi(
      `/api/v1/rider-locations/${orderId}`,
      "get"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in getRiderLocationByOrderId:", error);
    throw error;
  }
};

// 주소로 위, 경도 정보 가져오기 with kakao api
export const getAddressDetail = async (address) => {
  const res = await axios.get(
    "https://dapi.kakao.com/v2/local/search/address.JSON",
    {
      headers: { Authorization: "KakaoAK 74b51e0ee741798daeac1fce607512b2" },
      params: { query: address },
    }
  );
  console.log(res);
  return res.data;
};

// 라이더 현재 위치 ~ 배달지까지 걸리는 시간 with kakao navi api
export const calculateTimeToDestination = async (params) => {
  const res = await axios.get(
    "https://apis-navi.kakaomobility.com/v1/directions",
    {
      headers: { Authorization: "KakaoAK 74b51e0ee741798daeac1fce607512b2" },
      params: {
        origin: params.origin,
        destination: params.destination,
        car_type: params.carType, // 1 : 소형차, 7 : 이륜차 (오토바이)
      },
    }
  );
  //   console.log(res);
  return res.data;
};

// 라이더 이동수단을 가져옴 (카카오 내비에서 차종에 따라 배달지까지 남은 시간을 계산하기 위함)
export const getRiderTransportationByRiderId = async (riderId) => {
  try {
    const res = await riderLocationApi(`/api/v1/riders/${riderId}`, "get");
    console.log(res.data, " from api getRiderTransportationByRiderId");
    return res.data;
  } catch (error) {
    console.error("Error in getRiderTransportationByRiderId:", error);
  }
};
