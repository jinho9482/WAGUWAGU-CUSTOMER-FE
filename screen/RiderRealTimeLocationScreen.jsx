import { useEffect, useState, useRef } from "react";
import {
  calculateTimeToDestination,
  getAddressDetail,
  getRiderLocationAndTransportation,
  getRiderLocationByOrderId,
  getRiderTransportationByRiderId,
} from "../config/RiderLocation";
import WebView from "react-native-webview";
import { Image, StyleSheet, View, Text, Alert } from "react-native";

const RiderRealTimeLocationScreen = ({ route, navigation }) => {
  const [riderLocation, setRiderLocation] = useState({
    riderLatitude: 37.484918,
    riderLongitude: 127.01629,
  });

  const [mapHtml, setMapHtml] = useState("");
  const [timeToDestination, setTimeToDestination] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  //   const [customerCoordinate, setCustomerCoordinate] = useState(null);
  const webviewRef = useRef(null);

  const customerImage = Image.resolveAssetSource(
    require("../assets/my-location-marker.png")
  ).uri;

  const riderImage = Image.resolveAssetSource(
    require("../assets/rider.png")
  ).uri;

  const storeImage = Image.resolveAssetSource(
    require("../assets/store.png")
  ).uri;

  const getRealTimeData = async (customerCoord, riderCoord) => {
    console.log(
      "============================고객 위, 경도 체크==========================="
    );
    console.log(customerCoord);

    const orderId = route.params.orderItem.orderId; // 주문 id 뽑기
    const riderId = route.params.orderItem.riderId; // 라이더 id 뽑기

    intervalId = setInterval(async () => {
      //   const riderInfo = await getRiderLocationAndTransportation(orderId);

      console.log(riderCoord, "..............................");

      newRiderLatitude = riderCoord.riderLatitude + 0.00005;
      newRiderLongitude = riderCoord.riderLongitude + 0.0001;
      const newRiderCoord = {
        riderLatitude: newRiderLatitude,
        riderLongitude: newRiderLongitude,
      };

      console.log(
        "============================라이더 좌표==========================="
      );
      console.log(newRiderCoord);

      console.log(
        "============================라이더 이동수단==========================="
      );

      const calculateRequest = {
        origin: `${newRiderCoord.riderLongitude},${newRiderCoord.riderLatitude}`,
        destination: `${customerCoord.longitude},${customerCoord.latitude}`,
        carType: 1,
      }; // 라이더, 고객 위치 및 차종 설정
      const res = await calculateTimeToDestination(calculateRequest); // 카카오 내비 반환 값 가져오기
      console.log(
        "===========================카카오 내비 반환 값==========================="
      );
      console.log(res.routes[0].summary.duration);
      if (res.routes[0].result_code === 0) {
        const time = Math.floor(res.routes[0].summary.duration / 60); // 시간을 분으로 표현
        console.log(
          "===========================남은 시간==========================="
        );
        console.log(time);
        setTimeToDestination(time); // 시간 저장
        setRiderLocation(newRiderCoord);
        console.log(intervalId);
        // const timeoutId = setTimeout(
        //   () => getRealTimeData(customerCoord, newRiderCoord),
        //   1000
        // );
        // setTimeoutId(timeoutId);
        // console.log(timeoutId, "#######################################");
        // intervalId.coord = intervalId
        setIntervalId(intervalId);
      } else if (res.routes[0].result_code === 104) {
        Alert.alert("알람", "음식이 5m 이내에 도착했어요!");
        setRiderLocation(newRiderCoord);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const getCustomerCoordinate = async () => {
    const addressDetail = await getAddressDetail(
      route.params.orderItem.storeAddress
    ); // 고객 위, 경도 가져오기
    const y = parseFloat(addressDetail.documents[0].y);
    const x = parseFloat(addressDetail.documents[0].x);
    const customerCoord = { latitude: y, longitude: x };
    console.log(
      "===========================고객 위, 경도==========================="
    );
    console.log(customerCoord);
    // setCustomerCoordinate(customerCoord); // 고객 좌표 저장
    return customerCoord;
  };

  const generateMapHtml = (customerCoord) => {
    console.log(
      "===========================카카오맵 재 렌더링==========================="
    );
    console.log(riderLocation);
    console.log(customerCoord);
    if (riderLocation && customerCoord) {
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
              
            //   const KakaoMap = () => {
                const mapContainer = document.getElementById('map');
                const locPosition = new kakao.maps.LatLng(${riderLocation.riderLatitude}, ${riderLocation.riderLongitude});  
                const mapOption = {
                  center: locPosition,
                  level: 6,
                };
                
                const map = new kakao.maps.Map(mapContainer, mapOption);

                const customerImageSrc = '${customerImage}'; // 고객 마커이미지의 주소
                const riderImageSrc = '${riderImage}'; // 라이더 마커이미지의 주소
                const storeImageSrc = '${storeImage}'; // 가게 마커이미지의 주소

                const imageSize = new kakao.maps.Size(53, 50); // 마커이미지의 크기입니다
                const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    
                // 고객 위치 마커 이미지 설정
                const customerMarkerImage = new kakao.maps.MarkerImage(customerImageSrc, imageSize, imageOption);
                const customerMarkerPosition = new kakao.maps.LatLng(${customerCoord.latitude}, ${customerCoord.longitude}); // 마커가 표시될 위치
                    
                // 라이더 위치 마커 이미지 설정
                const riderMarkerImage = new kakao.maps.MarkerImage(riderImageSrc, imageSize, imageOption);
                const riderMarkerPosition = new kakao.maps.LatLng(${riderLocation.riderLatitude}, ${riderLocation.riderLongitude}); // 마커가 표시될 위치
                    
                // 가게 위치 마커 이미지 설정
                const storeMarkerImage = new kakao.maps.MarkerImage(storeImageSrc, imageSize, imageOption);
                const storeMarkerPosition = new kakao.maps.LatLng(${route.params.orderItem.storeLatitude}, ${route.params.orderItem.storeLongitude}); // 마커가 표시될 위치
                
                // 마커 생성
                const customerMarker = new kakao.maps.Marker({ position: customerMarkerPosition, image: customerMarkerImage });
                const riderMarker = new kakao.maps.Marker({ position: riderMarkerPosition, image: riderMarkerImage });
                const storeMarker = new kakao.maps.Marker({ position: storeMarkerPosition, image: storeMarkerImage });
                
                // map에 마커 생성
                customerMarker.setMap(map);
                riderMarker.setMap(map);
                storeMarker.setMap(map);
            //   };
            //   KakaoMap();
            </script>
          </body>
          </html>
          `;
    }
  };

  const initSetting = async () => {
    const customerCoord = await getCustomerCoordinate();
    console.log("1111111111111111111111111111111111111111111");
    setMapHtml(generateMapHtml(customerCoord));
    console.log("2222222222222222222222222222222222222");
    await getRealTimeData(customerCoord, riderLocation);
    console.log("33333333333333333333333333333333333333333");
  };

  const setMarkerPosition = `
      (function() {
        riderMarker.setPosition(new kakao.maps.LatLng(${riderLocation.riderLatitude}, ${riderLocation.riderLongitude}));
      })();
    `;

  useEffect(() => {
    if (intervalId) {
      console.log(intervalId, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log(navigation);
      const unsubcribe = navigation.addListener("beforeRemove", () => {
        console.log(
          "뒤로가기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ"
        );
        clearInterval(intervalId);
      });
    }
    // return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    initSetting();
  }, []);

  useEffect(() => {
    console.log("=========================WebView===========================");
    console.log(webviewRef);
    if (webviewRef.current) {
      console.log(setMarkerPosition);
      webviewRef.current.injectJavaScript(setMarkerPosition);
    }
  }, [riderLocation]);

  return (
    <View style={styles.riderLocationContainer}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ html: mapHtml }}
        injectedJavaScript={setMarkerPosition}
      />
      <View style={styles.timeInfo}>
        <Text style={styles.timeToDestination}>
          {timeToDestination}분 뒤 음식이 도착 예정이예요
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

  webview: {
    marginTop: -10,
    marginHorizontal: -10,
    height: 500,
  },

  timeInfo: {
    paddingVertical: 10,
    backgroundColor: "#94D35C",
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
