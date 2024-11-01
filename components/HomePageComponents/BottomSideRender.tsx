import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

interface BottomSideRenderProps {
    refresh: () => void;
    handleButtonPress: () => void;
    helpState: boolean;
    setHelpState: (state: boolean) => void;
}
const BottomSideRender: React.FC<BottomSideRenderProps> = ({ refresh, handleButtonPress, helpState, setHelpState }) => {
    const [buttonPressed, setButtonPressed] = useState<boolean>(false);

    const scaleValue = useSharedValue(1);
    const scaleValueYenile = useSharedValue(1);

    const handlePressIn = (isRefreshButton: boolean = false) => {
        if (isRefreshButton)
            scaleValueYenile.value = withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.exp) });
        else
            scaleValue.value = withTiming(1.2, { duration: 300, easing: Easing.out(Easing.exp) });
    };

    const handlePressOut = (isRefreshButton: boolean = false) => {
        if (isRefreshButton)
            scaleValueYenile.value = withTiming(1, { duration: 500, easing: Easing.in(Easing.exp) });
        else
            scaleValue.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.exp) });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleValue.value }],
        };
    });
    const animatedStyleYenile = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleValueYenile.value }],
        };
    });

    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 16 }}>
                <View>
                    <Pressable
                        onPress={refresh}
                        onPressIn={() => handlePressIn(true)}
                        onPressOut={() => handlePressOut(true)}
                    >
                        <Animated.View style={[
                            {
                                borderColor: '#4299E1',
                                backgroundColor: '#EBF8FF',
                                borderWidth: 1,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6,
                                paddingHorizontal: 16,
                            },
                            animatedStyleYenile,
                        ]}>
                            <Text style={{ color: '#4299E1', textAlign: 'center' }}>Yenile</Text>

                        </Animated.View>
                    </Pressable>
                </View>

                <Pressable
                    onPress={handleButtonPress}
                    onPressIn={() => handlePressIn()}
                    onPressOut={() => handlePressOut()}
                >
                    <Animated.View style={[
                        {
                            borderColor: '#10B981',
                            backgroundColor: '#EBF8FF',
                            borderWidth: 1,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 6,
                            paddingHorizontal: 16,
                        },
                        animatedStyle,
                    ]}>
                        <Text style={{ color: '#10B981', textAlign: 'center' }}>Kontrol ET</Text>
                    </Animated.View>
                </Pressable>
            </View>
        </View >
    );
};

export default BottomSideRender;
