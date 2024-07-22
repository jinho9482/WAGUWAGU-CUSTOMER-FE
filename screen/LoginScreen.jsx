import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const LoginScreen = ({ navigation }) => {
    const handleLogin = () => {
        // 로그인 성공 시 메인 화면으로 이동
        navigation.replace('SignUp');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/food icon.png')}
                    style={styles.iconImage}
                />
                <Image
                    source={require('../assets/waguwagu.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>킹왕짱 김부자 어플ㅋㅋ</Text>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Image
                        source={require('../assets/kakao_login_medium_wide.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconImage: {
        width: 95,
        height: 95,
    },
    logoImage:{
        width: 300, 
    },
    logoText:{
        color: '#4C241D',
        fontSize:16,
        marginBottom: 20,
    }
});

export default LoginScreen;
