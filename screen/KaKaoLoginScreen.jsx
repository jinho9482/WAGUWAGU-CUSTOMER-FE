import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const REST_API_KEY = 'f8609808f0ad80f284bc679eb3d80315';
const REDIRECT_URI = 'http://192.168.0.15:8081/Home';

const KaKaoLoginScreen = () => {
    const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옵니다.

    const handleNavigationChange = (navState) => {
        const { url } = navState;
        const exp = "code=";
        const condition = url.indexOf(exp);

        if (condition !== -1) {
            const authorize_code = url.substring(condition + exp.length);
            console.log(authorize_code);
            // 인증 코드로 SignInScreen으로 이동
            navigation.navigate("SignupScreen", { authorize_code }); // 인증 코드와 함께 이동합니다.
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}
                scalesPageToFit={false}
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
                }}
                onNavigationStateChange={handleNavigationChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        backgroundColor: '#fff',
    },
});

export default KaKaoLoginScreen;
