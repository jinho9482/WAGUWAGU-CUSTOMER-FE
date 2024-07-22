import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import SpeechBubble from '../components-common/SpeechBubble'; // 경로를 확인하세요

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSignup = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{11}$/;
        if (!emailPattern.test(email)) {
            Alert.alert('유효하지 않은 이메일', '올바른 이메일 형식이 아닙니다!');
            return;
        }
        if (!email || !nickname || !phone || !address) {
            Alert.alert('빈 칸 오류', '빈 칸 없이 모두 입력해주세요!');
            return;
        }
        if (!phonePattern.test(phone)) {
            Alert.alert('유효하지 않은 전화번호', '전화번호는 11자리 숫자로 입력해주세요!');
            return;
        }

        navigation.replace('Main');
    };

    return (
        <View>
            <View style={styles.container}>
                <Image
                    source={require('../assets/food icon.png')} // 첫 번째 이미지 경로
                    style={styles.iconImage}
                />
                <Image
                    source={require('../assets/waguwagu.png')} // 두 번째 이미지 경로
                    style={styles.logoImage}
                    resizeMode="contain" // 이미지가 버튼에 맞게 조정되도록 설정
                />
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>이메일</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.infoText}>닉네임</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nickname"
                    value={nickname}
                    onChangeText={setNickname}
                />
                <Text style={styles.infoText}>전화번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="numeric" // 숫자 입력 전용
                />
                <Text style={styles.infoText}>배달주소</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TouchableOpacity onPress={handleSignup}>
                    <SpeechBubble
                        content="가입 완료"
                        backgroundColor="#ffffff"
                        textColor="#634F4F"
                        onPress={() => console.log("가입완료 Pressed")}
                        height={50}
                        width="100%"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    iconImage: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    logoImage: {
        width: 250, // 두 번째 이미지의 너비
    },
    infoBox: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    infoText: {
        fontSize: 20,
        color: '#4C241D',
        marginBottom: 10,
    },
    input: {
        width: '100%', // 가로 길이를 화면의 100%로 설정
        height: 40, // 높이를 40으로 설정
        borderColor: '#634F4F', // 테두리 색상
        borderWidth: 1, // 테두리 두께
        borderRadius: 25, // 모서리를 둥글게 설정
        paddingHorizontal: 16, // 좌우 패딩
        fontSize: 16, // 텍스트 크기
        backgroundColor: '#FFFFFF', // 배경색
        marginBottom: 20,
    },
});

export default SignupScreen;
