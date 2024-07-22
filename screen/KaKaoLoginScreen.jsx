import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const REST_API_KEY = 'f8609808f0ad80f284bc679eb3d80315';
const REDIRECT_URI = 'http://192.168.0.15:8081/Home';

const KaKaoLoginScreen = () => {

    const handleNavigationChange = (navState) => {
        const { url } = navState;
        const exp = "code=";
        const condition = url.indexOf(exp);

        if (condition !== -1) {
            const authorize_code = url.substring(condition + exp.length);
            console.log(authorize_code);
            // 여기에서 authorize_code를 사용하여 인증을 완료하거나 다른 작업을 수행할 수 있습니다.
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
