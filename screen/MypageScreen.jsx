import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MyPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={require('../assets/Vector.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.greeting}>먹짱! 김세현</Text>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>이메일</Text>
                    <Text style={styles.value}>abc123@naver.com</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>전화번호</Text>
                    <Text style={styles.value}>010-1234-5678</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>주소</Text>
                    <Text style={styles.value}>서울특별시 서초구 효령로 335</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>찜한 가게 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>쿠폰 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>내가 쓴 리뷰 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    profile: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    infoBox: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#555555',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    separator: {
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'black',
        marginVertical: 5,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyPage;
