import { useEffect, useState, useRef } from "react";
import {
  calculateStraightLineDistance,
  calculateTimeToDestination,
  calculateTimeToDestinationWithNavi,
  getAddressDetail,
  getRiderLocationAndTransportation,
  getRiderLocationByOrderId,
  getRiderTransportationByRiderId,
} from "../config/RiderLocation";
import WebView from "react-native-webview";
import { Image, StyleSheet, View, Text, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const RiderRealTimeLocationScreen = ({ route, navigation }) => {
  const [riderLocation, setRiderLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [mapHtml, setMapHtml] = useState("");
  const [duration, setDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [deliveryIsdone, setDeliveryIsdone] = useState(false);
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef(null);

  // const customerImage = Image.resolveAssetSource(
  //   require("../assets/my-location-marker.png")
  // ).uri;

  // const riderImage = Image.resolveAssetSource(
  //   require("../assets/rider.png")
  // ).uri;

  // const storeImage = Image.resolveAssetSource(
  //   require("../assets/store.png")
  // ).uri;

  const getRealTimeData = async (customerCoord) => {
    const orderId = route.params.orderItem.orderId; // 주문 id 뽑기
    let riderCoordAndTransportation = {
      riderLatitude: 37.48530981806404,
      riderLongitude: 127.0176355954036,
      riderTransportation: "WALK",
    };
    initialIntervalId = setInterval(async () => {
      // 원본
      // const riderCoordAndTransportation =
      //   await getRiderLocationAndTransportation(orderId);
      // newRiderLatitude = riderCoordAndTransportation.riderLatitude;
      // newRiderLongitude = riderCoordAndTransportation.riderLongitude;
      // const newRiderCoord = {
      //   latitude: newRiderLatitude,
      //   longitude: newRiderLongitude,
      // };

      // 테스트
      riderCoordAndTransportation.riderLatitude =
        riderCoordAndTransportation.riderLatitude + 0.000025;
      riderCoordAndTransportation.riderLongitude =
        riderCoordAndTransportation.riderLongitude + 0.0001;
      const newRiderCoord = {
        latitude: riderCoordAndTransportation.riderLatitude,
        longitude: riderCoordAndTransportation.riderLongitude,
      };

      console.log(newRiderCoord, "라이더 좌표");
      console.log(
        riderCoordAndTransportation.riderTransportation,
        "라이더 이동 수단"
      );

      // 이동 수단별 시간 계산
      const timeToDestination = await getTimeToDestination(
        customerCoord,
        riderCoordAndTransportation.riderTransportation,
        newRiderCoord
      );
      console.log(timeToDestination, "남은 시간");
      setIntervalId(initialIntervalId);
      if (timeToDestination !== null) {
        // timeToDestination 은 0이 될 수 있기 때문에 위와 같이 null과 비교한다.
        setDuration(timeToDestination); // 시간 저장
        setRiderLocation(newRiderCoord);
        // console.log(intervalId);
      } else {
        setDeliveryIsdone(true); //
        setDuration(timeToDestination);
        setRiderLocation(newRiderCoord);
        clearInterval(initialIntervalId); // 라이더가 5m 이내로 들어오면 실시간 위치 호출 종료
        Alert.alert("알람", "음식이 도착했어요!");
      }
    }, 1000);
  };

  const getTimeToDestination = async (
    customerCoord,
    riderTransportation,
    riderCoord
  ) => {
    let timeToDestination;
    if (riderTransportation === "WALK" || riderTransportation === "BICYCLE") {
      const geoDistanceRequest = {
        startLat: riderCoord.latitude,
        startLong: riderCoord.longitude,
        endLat: customerCoord.latitude,
        endLong: customerCoord.longitude,
      };
      const distance = await calculateStraightLineDistance(geoDistanceRequest);
      console.log(distance);
      if (distance < 0.005) return null;
      if (riderTransportation === "WALK") {
        console.log(distance, "km 도보 남은 거리");
        timeToDestination = Math.floor((distance / 3) * 60); // 걷는 속도 : 3km/h -> 시간을 분으로
      } else {
        console.log(distance, "km 자전거 남은 거리");
        timeToDestination = Math.floor((distance / 16) * 60); // 자전거 속도 : 16km/h
      }
    } else {
      let calculateRequest;
      if (riderTransportation === "MOTORBIKE") {
        calculateRequest = {
          origin: `${riderCoord.longitude},${riderCoord.latitude}`,
          destination: `${customerCoord.longitude},${customerCoord.latitude}`,
          carType: 7,
        };
      } else {
        calculateRequest = {
          origin: `${riderCoord.longitude},${riderCoord.latitude}`,
          destination: `${customerCoord.longitude},${customerCoord.latitude}`,
          carType: 1,
        };
      }
      const naviInfo = await calculateTimeToDestinationWithNavi(
        calculateRequest
      );

      if (naviInfo.routes[0].result_code === 0) {
        if (naviInfo.routes[0].summary.distance > 5) {
          console.log(naviInfo.routes[0].summary.distance, "남은 거리");
          // 5m 이내면 음식 도착 처리 진행
          timeToDestination = Math.floor(
            naviInfo.routes[0].summary.duration / 60
          ); // 시간을 분으로 표현
        } else return null;
      }
    }
    return timeToDestination;
  };

  // else if (naviInfo.routes[0].result_code === 104) {
  //   Alert.alert("알람", "음식이 5m 이내에 도착했어요!"); // timeToDestination = null
  // }

  const getCustomerCoordinate = async () => {
    console.log(route.params.orderItem.customerAddress, "고객 주소");
    const addressDetail = await getAddressDetail(
      route.params.orderItem.customerAddress
    ); // 고객 위, 경도 가져오기
    const y = parseFloat(addressDetail.documents[0].y);
    const x = parseFloat(addressDetail.documents[0].x);
    const customerCoord = { latitude: y, longitude: x };
    console.log(customerCoord, "고객 위, 경도");
    // setCustomerCoordinate(customerCoord); // 고객 좌표 저장
    return customerCoord;
  };

  const generateMapHtml = (customerCoord, riderCoord) => {
    console.log(
      "===========================카카오맵 재 렌더링==========================="
    );
    console.log(customerCoord);
    console.log(riderCoord);
    if (riderCoord && customerCoord) {
      return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
            <title>Kakao 지도 시작하기</title>
            <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a6546188cab40bea0d30c30a1d2c578d&libraries=services"></script>
          </head>
          <body>
            <div id="map" style="width:100%;height:100vh;"></div>
            <script>
                const mapContainer = document.getElementById('map');
                const locPosition = new kakao.maps.LatLng(${riderCoord.latitude}, ${riderCoord.longitude});  
                const mapOption = {
                  center: locPosition,
                  level: 6,
                };
                
                const map = new kakao.maps.Map(mapContainer, mapOption);

                const customerImageSrc = 'https://cdn-icons-png.flaticon.com/128/14831/14831599.png'; // 고객 마커이미지의 주소
                const riderImageSrc = 'https://cdn-icons-png.flaticon.com/128/7910/7910028.png'; // 라이더 마커이미지의 주소
                const storeImageSrc = 'https://cdn-icons-png.flaticon.com/128/948/948036.png'; // 가게 마커이미지의 주소

                const imageSize = new kakao.maps.Size(53, 50); // 마커이미지의 크기입니다
                const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    
                // 고객 위치 마커 이미지 설정
                const customerMarkerImage = new kakao.maps.MarkerImage(customerImageSrc, imageSize, imageOption);
                const customerMarkerPosition = new kakao.maps.LatLng(${customerCoord.latitude}, ${customerCoord.longitude}); // 마커가 표시될 위치
                    
                // 라이더 위치 마커 이미지 설정
                const riderMarkerImage = new kakao.maps.MarkerImage(riderImageSrc, imageSize, imageOption);
                const riderMarkerPosition = new kakao.maps.LatLng(${riderCoord.latitude}, ${riderCoord.longitude}); // 마커가 표시될 위치
                    
                // 가게 위치 마커 이미지 설정
                const storeMarkerImage = new kakao.maps.MarkerImage(storeImageSrc, imageSize, imageOption);
                const storeMarkerPosition = new kakao.maps.LatLng(${route.params.orderItem.storeLatitude}, ${route.params.orderItem.storeLongitude}); // 마커가 표시될 위치
                
                // 마커 생성
                const customerMarker = new kakao.maps.Marker({ position: customerMarkerPosition, image: customerMarkerImage });
                const riderMarker = new kakao.maps.Marker({ position: riderMarkerPosition, image: riderMarkerImage });
                const storeMarker = new kakao.maps.Marker({ position: storeMarkerPosition, image: storeMarkerImage });

                const contentForCustomer = '<div style="padding:5px; width:fit-content; height:100%; background-color:white; border-radius:10px; border: 1px solid lightblue; box-shadow: 2px 2px 2px #60b6f7;">픽업 장소</div>';
                const contentForRider = '<div style="padding:5px; width:fit-content; height:100%; background-color:white; border-radius:10px; border: 1px solid lightblue; box-shadow: 2px 2px 2px #60b6f7;">아빠 안 잔다</div>';
                
                // 고객 인포 윈도우
                const customOverlayForCustomer = new kakao.maps.CustomOverlay({
                  position: customerMarkerPosition,
                  content: contentForCustomer,
                  yAnchor: 3,   
                });
                
                // 라이더 인포 윈도우
                const customOverlayForRider = new kakao.maps.CustomOverlay({
                  position: riderMarkerPosition,
                  content: contentForRider,
                  yAnchor: 3.5,
                });

                customOverlayForCustomer.setMap(map);
                customOverlayForRider.setMap(map);

                // map에 마커 생성
                customerMarker.setMap(map);
                riderMarker.setMap(map);
                // storeMarker.setMap(map);
            </script>
          </body>
          </html>
          `;
    }
  };

  const initSetting = async () => {
    const customerCoord = await getCustomerCoordinate();
    const riderCoordAndTransportation = await getRiderLocationAndTransportation(
      route.params.orderItem.orderId
    );

    // 원본
    // const riderCoord = {
    //   latitude: riderCoordAndTransportation.riderLatitude,
    //   longitude: riderCoordAndTransportation.riderLongitude,
    // };

    // 테스트
    const riderCoord = {
      latitude: 37.48530981806404,
      longitude: 127.0176355954036,
    };

    setMapHtml(generateMapHtml(customerCoord, riderCoord));
    setRiderLocation(riderCoord);
    await getRealTimeData(customerCoord);
  };

  const setMarkerPosition = `
      (function() {
        riderMarker.setPosition(new kakao.maps.LatLng(${riderLocation.latitude}, ${riderLocation.longitude}));
        customOverlayForRider.setPosition(new kakao.maps.LatLng(${riderLocation.latitude}, ${riderLocation.longitude}));
      })();
    `;

  navigation.addListener("beforeRemove", () => {
    if (intervalId) {
      clearInterval(intervalId);
      console.log("실시간 위치 가져오기 종료");
    } else {
      setTimeout(() => {
        clearInterval(intervalId);
        console.log("실시간 위치 가져오기 종료");
      }, 3000);
    }
  });

  // const setDurationText = () => {
  //   let text;
  //   if (!duration) text = "음식이 곧 도착예정이예요";
  //   else if (deliveryIsdone) text = "음식이 도착했어요!";
  //   else text = `${duration}분 뒤 음식이 도착 예정이예요`;
  //   return text;
  // };
  // useEffect(() => {
  //   console.log(navigation, "뒤로가기 클릭");
  //   if (intervalId) {
  //     console.log(intervalId, "intervalID");
  //     // 뒤로 가기 하면 실시간 위치 가져오기 종료하기
  //     const unsubscribe = navigation.addListener("beforeRemove", () => {
  //       clearInterval(intervalId);
  //       console.log("실시간 위치 가져오기 종료");
  //     });
  //     // return unsubscribe;
  //   }
  // }, [navigation]);

  useEffect(() => {
    initSetting();
  }, []);

  useEffect(() => {
    if (webviewRef.current)
      webviewRef.current.injectJavaScript(setMarkerPosition);
  }, [riderLocation]);

  // useEffect(() => {
  //   setDurationText();
  // }, [duration, deliveryIsdone]);

  return (
    <View style={styles.riderLocationContainer}>
      {loading && (
        <ActivityIndicator size="20" color="#94D35C" style={styles.loading} />
      )}
      <WebView
        ref={webviewRef}
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ html: mapHtml }}
        injectedJavaScript={setMarkerPosition}
        onLoadEnd={() => setLoading(false)}
      />
      <View style={styles.timeInfo}>
        <Text style={styles.timeToDestination}>
          {deliveryIsdone
            ? "음식이 도착하였습니다!"
            : `${duration}분 뒤 음식이 도착 예정이예요`}
        </Text>
        <Text style={styles.warningMessage}>
          (실제 도착 시간은 상황에 따라 다를 수 있습니다.)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  riderLocationContainer: {
    flex: 1,
  },

  loading: {
    justifyContent: "center",
    alignSelf: "center",
  },

  webview: {
    marginTop: -10,
    marginHorizontal: -10,
    height: 500,
  },

  timeInfo: {
    paddingVertical: 10,
    backgroundColor: "#EECAD5",
    textAlign: "center",
  },

  timeToDestination: {
    fontSize: 20,
    textAlign: "center",
  },

  warningMessage: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default RiderRealTimeLocationScreen;
