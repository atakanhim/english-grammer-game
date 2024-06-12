import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ setOnAnimationFinish, appReady }: { setOnAnimationFinish?: React.Dispatch<React.SetStateAction<boolean>>, appReady: boolean }) => {
    const animation = useRef<LottieView>(null);
    const [animationState, setAnimationState] = useState(Boolean)

    useEffect(() => {
        if (appReady && animationState)
            setOnAnimationFinish!(true);
    }, [appReady, animationState])
    return (
        <View style={styles.container}>
            <LottieView
                ref={animation}
                autoPlay
                onAnimationFinish={() => setAnimationState(true)}
                style={{ width: '100%', height: 500 }}
                source={require('@/assets/lottie/netflix.json')} // Lottie animasyon dosyasının yolu
                loop={false}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});

export default LoadingScreen;
