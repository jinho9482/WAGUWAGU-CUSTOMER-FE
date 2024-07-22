import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import SpeechBubble from '../components-common/SpeechBubble';

const MyPage = () => {
    const [modify, setModify] = useState(false);
    const [nickname, setNickname] = useState('김세현');
    const [address, setAddress] = useState('서울특별시 서초구 효령로 335');

    const handleModify = () => {
        if (modify) {
            setModify(false); // Exit edit mode
        } else {
            setModify(true); // Enter edit mode
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={require('../assets/김세현ㅋㅋ.png')}
                    style={styles.profileImage}
                    resizeMode="cover" // Adjust this as needed
                />
                <Text style={styles.greeting}>먹짱! {nickname}</Text>
            </View>
            <View style={styles.infoBox}>
                {modify ? (
                    <>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>닉네임</Text>
                            <TextInput
                                style={styles.input}
                                value={nickname}
                                onChangeText={setNickname}
                                textAlign="right" // Align text to the right
                            />
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>주소    </Text>
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={setAddress}
                                textAlign="right" // Align text to the right
                            />
                        </View>
                    </>
                ) : (
                    <>
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
                            <Text style={styles.value}>{address}</Text>
                        </View>
                    </>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleModify}>
                    <SpeechBubble
                        content={modify ? "저장하기" : "수정하기"}
                        backgroundColor="#ffffff"
                        textColor="black"
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
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10
    },
    value: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        fontSize: 18,
        borderColor: '#ddd',
        borderBottomWidth: 1,
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
