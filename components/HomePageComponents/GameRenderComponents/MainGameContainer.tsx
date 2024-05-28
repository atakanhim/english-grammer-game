import { View, Text, Pressable, GestureResponderEvent, Alert } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
interface MainGameContainerProps {
    randomData: SentenceData | undefined;
    shuffledResults: any[];
    setAnswerData: Dispatch<SetStateAction<any[]>>;
    setShuffledResults: Dispatch<SetStateAction<any[]>>;
    answerData: any[];
}
const MainGameContainer: React.FC<MainGameContainerProps> = ({ randomData, shuffledResults, answerData, setAnswerData, setShuffledResults }) => {

    const [helpState, setHelpState] = useState<boolean>(false);

    const [selectedShuufleIndex, setSelectedShuufleIndex] = useState<number | null>(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

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
        })
    }
    useEffect(() => {
        if (!answerData || answerData.length === 0) {
            setAnswerData(new Array(randomData?.wordEngAry.length).fill(''));
        }
    }, [randomData, answerData, setAnswerData]);
    useEffect(() => {
        if (selectedShuufleIndex != null && selectedAnswerIndex != null && selectedAnswerIndex >= 0 && selectedAnswerIndex >= 0) {
            console.log("shuffle : ", selectedShuufleIndex)
            console.log("answer : ", selectedAnswerIndex)
            if (answerData[selectedAnswerIndex] != "") {
                let data = answerData[selectedAnswerIndex];
                removeItemFromAnswerData(selectedAnswerIndex);
                setShuffledResultsFunction(data);
            }
            setAnswerData((prev) => {
                const newAnswerData = [...prev];
                newAnswerData[selectedAnswerIndex] = shuffledResults[selectedShuufleIndex];
                return newAnswerData;
            })
            setSelectedAnswerIndex(null);
            setSelectedShuufleIndex(null);
            setShuffledResults((prevShuffledResults) =>
                prevShuffledResults.filter((shuffledItem, shuffledItemIndex) => {
                    // Check if the current shuffled item's index matches the target index
                    if (shuffledItemIndex === selectedShuufleIndex) {
                        return shuffledItem !== shuffledResults[selectedShuufleIndex]; // Remove the item at indexArray
                    } else {
                        return true; // Keep all other items
                    }
                })
            );
        }
    }, [selectedShuufleIndex, selectedAnswerIndex])



    const renderAnswerData = () => {
        return (
            <>
                <View className='mb-5 flex flex-row justify-between p-4'>
                    <Text> Yardımı ac kapat </Text>
                    <Pressable onPress={() => setHelpState(!helpState)} className='px-5 py-2 border-cyan-400 border'>
                        <Text>  AÇ / KAPA </Text>
                    </Pressable>
                </View>
                <View className='flex flex-row flex-wrap  py-6  items-center justify-center'>

                    {randomData?.wordEngAry?.map((word, index) => (
                        <Pressable key={index} className='ml-5' >
                            <Text className="p-1 font-light" >{word}</Text>
                            <Text
                                className={`p-1 border-b border-l rounded-md min-w-[70px] 
                      ${answerData[index] !== "" ? "border-green-700"
                                        : selectedShuufleIndex == null ? "border-blue-300"
                                            : "border-blue-600 scale-125"}`}
                                onPress={() => selectedShuufleIndex == null ? removeItemFromAnswerData(index) : setSelectedAnswerIndex(index)}
                            >
                                {answerData[index]}
                            </Text>

                        </Pressable>
                    ))}
                </View>
            </>
        )

    }

    return (
        <SafeAreaView>
            <View>
                {renderAnswerData()!}
            </View>
            <View className="flex flex-row flex-wrap gap-3 font-extralight justify-center mt-1  ">
                {
                    selectedShuufleIndex != null ? <>
                        <Text className='px-10  py-5 shadow-2xl rotate-3  font-extrabold border-cyan-400 text-cyan-400 shadow-cyan-200 border-b border-l rounded-full mt-3'>{shuffledResults[selectedShuufleIndex]}</Text>
                    </> :
                        shuffledResults &&
                        shuffledResults.map((item: any, index: number) => {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => setSelectedShuufleIndex(index)}
                                >
                                    <Text className='py-2 px-5 font-medium text-xs border-cyan-400 text-cyan-400 shadow-cyan-200 border-b border-l rounded-full'>{item}</Text>
                                </Pressable>
                            );
                        })

                }

            </View>
        </SafeAreaView>
    )
}

export default MainGameContainer