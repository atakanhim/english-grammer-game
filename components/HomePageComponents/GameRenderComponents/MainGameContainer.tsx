import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat, withSequence } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

interface MainGameContainerProps {
    randomData: SentenceData | undefined;
    shuffledResults: any[];
    answerData: any[];
    falseIndexs: any[];
    setAnswerData: Dispatch<SetStateAction<any[]>>;
    setShuffledResults: Dispatch<SetStateAction<any[]>>;
    setFalseIndexs: Dispatch<SetStateAction<any[]>>;
    helpState: Boolean;

    selectedShuufleIndex: number | null;
    setSelectedShuufleIndex: Dispatch<SetStateAction<number | null>>

    selectedAnswerIndex: number | null;
    setSelectedAnswerIndex: Dispatch<SetStateAction<number | null>>

}

const MainGameContainer: React.FC<MainGameContainerProps> = ({
    randomData,
    shuffledResults,
    answerData,
    setAnswerData,
    setShuffledResults,
    falseIndexs,
    setFalseIndexs,
    helpState,
    selectedShuufleIndex,
    selectedAnswerIndex,
    setSelectedAnswerIndex,
    setSelectedShuufleIndex
}) => {



    const scaleValue = useSharedValue(1);
    const scaleValueForCancel = useSharedValue(1);
    const opacityValueForCancel = useSharedValue(1);

    function removeItemFromAnswerData(selectedIndex: any) {
        let data = answerData[selectedIndex];
        if (data != null && data != "") {
            setAnswerData((prevAnswerData) => {
                const newData = [...prevAnswerData];
                newData[selectedIndex] = "";
                return newData;
            });
            setShuffledResultsFunction(data);
        }
    }

    function setShuffledResultsFunction(data: any) {
        setShuffledResults(() => {
            const newShuffledResults = [...shuffledResults];
            newShuffledResults.push(data);
            return newShuffledResults;
        });
    }

    useEffect(() => {
        if (!answerData || answerData.length === 0) {
            setAnswerData(new Array(randomData?.wordEngAry.length).fill(''));
        }
    }, [randomData, answerData, setAnswerData]);

    useEffect(() => {
        if (selectedShuufleIndex != null && selectedAnswerIndex != null && selectedAnswerIndex >= 0) {
            if (answerData[selectedAnswerIndex] != "") {
                let data = answerData[selectedAnswerIndex];
                removeItemFromAnswerData(selectedAnswerIndex);
                setShuffledResultsFunction(data);
            }
            setAnswerData((prev) => {
                const newAnswerData = [...prev];
                newAnswerData[selectedAnswerIndex] = shuffledResults[selectedShuufleIndex];
                return newAnswerData;
            });
            setSelectedAnswerIndex(null);
            setSelectedShuufleIndex(null);
            setShuffledResults((prevShuffledResults) =>
                prevShuffledResults.filter((shuffledItem, shuffledItemIndex) => {
                    return shuffledItemIndex !== selectedShuufleIndex;
                })
            );
        }
    }, [selectedShuufleIndex, selectedAnswerIndex]);

    const handlePressIn = () => {
        scaleValue.value = withSpring(1.2, { damping: 10, stiffness: 100 });
        const values = [1, 1.1, 1];
        const duration = 2000;
        const createScaleAnimation = (values: any, duration: any) => {
            return values.reduce((acc: any, value: any, index: any) => {
                if (index === 0) {
                    return withTiming(value, { duration, easing: Easing.out(Easing.exp) });
                }
                return withSequence(
                    acc,
                    withTiming(value, { duration, easing: Easing.out(Easing.exp) })
                );
            }, null);
        };
        scaleValueForCancel.value = withRepeat(createScaleAnimation(values, duration), -1, false);
    };
    const handlePressOut = () => {
        scaleValue.value = withSpring(1, { damping: 10, stiffness: 100 });
        opacityValueForCancel.value = withTiming(1, { duration: 200, easing: Easing.in(Easing.exp) });
    };

    const selectedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleValue.value }],
        };
    });

    const fadeStyle = useAnimatedStyle(() => {
        return {
            //opacity: opacityValue.value,
            transform: [{ scale: scaleValueForCancel.value }],
        };
    });

    const renderAnswerData = () => {
        return (
            <View className='flex flex-row gap-x-5  flex-wrap px-3 py-6 items-center justify-center'>
                {randomData?.wordEngAry?.map((word, index) => (
                    <Pressable key={index} className=''>
                        <Text className="p-1 font-light">{word}</Text>
                        <Animated.Text
                            style={[{
                                padding: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                                borderRadius: 4,
                                minWidth: 70,
                                backgroundColor: helpState ? (falseIndexs.includes(index) ? '#FFE5E5' : '#E5FFE5') : '#E5F0FF',
                                color: helpState ? (falseIndexs.includes(index) ? '#FF0000' : '#00FF00') : '#0000FF',
                                borderColor: answerData[index] !== "" ? '#008000' : selectedShuufleIndex == null ? '#87CEFA' : '#0000FF'
                            }, selectedStyle]}
                            onPressOut={handlePressOut}
                            onPress={() => selectedShuufleIndex == null ? removeItemFromAnswerData(index) : setSelectedAnswerIndex(index)}
                        >
                            {answerData[index]}
                        </Animated.Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View>
                {renderAnswerData()}
            </View>
            <View className="flex flex-row flex-wrap gap-3 font-extralight justify-center mt-1">
                {selectedShuufleIndex != null ? (
                    <>
                        <View className='flex flex-row   items-center gap-5 items '>
                            <Animated.Text style={[{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 999, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, marginTop: 12, borderColor: '#00FFFF', color: '#00FFFF', fontWeight: '800', transform: [{ rotate: '45deg' }] }, selectedStyle]}>
                                {shuffledResults[selectedShuufleIndex]}
                            </Animated.Text>
                            <Animated.View className="border-r border-b w-12 border-red-400  rounded-full flex items-center " style={[, fadeStyle]}>
                                <Pressable onPress={() => {
                                    setSelectedShuufleIndex(null);
                                    handlePressOut();
                                }}>

                                    <FontAwesome name={"close"} size={32} color={"red"} />
                                </Pressable>

                            </Animated.View>
                        </View>

                    </>
                ) : (
                    shuffledResults &&
                    shuffledResults.map((item: any, index: number) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setSelectedShuufleIndex(index);
                                handlePressIn();
                            }}
                        >
                            <Animated.Text style={[{ paddingVertical: 5, paddingHorizontal: 10, shadowRadius: 2, borderRadius: 999, borderWidth: 1, borderColor: '#00FFFF', color: '#00FFFF', fontWeight: '500', fontSize: 15, marginHorizontal: 3, marginVertical: 2 },]}>
                                {item}
                            </Animated.Text>
                        </Pressable>
                    ))
                )}
            </View>
        </SafeAreaView>
    );
}

export default MainGameContainer;
