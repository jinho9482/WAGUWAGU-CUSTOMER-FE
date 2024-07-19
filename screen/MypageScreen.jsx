import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import SpeechBubble from '../components-common/SpeechBubble';

const MyPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={require('../assets/김세현ㅋㅋ.png')}
                    style={styles.profileImage}
                    resizeMode="cover" // Adjust this as needed
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <SpeechBubble
                        content="수정하기"
                        backgroundColor="#ffffff"
                        textColor="black"
                        onPress={() => console.log("수정하기 Pressed")}
                        height={50}
                        width="100%"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <SpeechBubble
                        content="찜한 가게 보기"
                        backgroundColor="#ffffff"
                        textColor="black"
                        onPress={() => console.log("찜한 가게 보기 Pressed")}
                        height={50}
                        width="100%"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <SpeechBubble
                        content="쿠폰 보기"
                        backgroundColor="#ffffff"
                        textColor="black"
                        onPress={() => console.log("수정하기 Pressed")}
                        height={50}
                        width="100%"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <SpeechBubble
                        content="내가 쓴 리뷰 보기"
                        backgroundColor="#ffffff"
                        textColor="black"
                        onPress={() => console.log("내가 쓴 리뷰 보기 Pressed")}
                        height={50}
                        width="100%"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <SpeechBubble
                        content="로그아웃"
                        backgroundColor="#ffffff"
                        textColor="black"
                        onPress={() => console.log("로그아웃 Pressed")}
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
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profile: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40, // Half of the width/height
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
    buttonContainer: {
        width: '100%', // Ensure the container takes full width
        marginBottom: 10,
    },
});

export default MyPage;
