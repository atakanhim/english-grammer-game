import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

const ArrayChoosen = ({ levels, handleSelect, range, setModalVisible }: any) => {
    return (
        <Pressable className="flex-1 flex  justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }} onPress={() => setModalVisible(false)}>
            <View className="p-5 bg-white rounded-lg">
                <View className="flex flex-row justify-between">
                    <View className="flex-1 mr-2">
                        <Text className="mb-2">Select Start</Text>
                        <FlatList
                            data={levels}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelect(item, 'start')}
                                    className={`p-2 border border-black rounded-lg mb-1.5 ${range.start === item ? 'bg-blue-500' : ''}`}
                                >
                                    <Text className={`text-center ${range.start === item ? 'text-white' : ''}`}>{item}</Text>
                                </Pressable>
                            )}
                        />
                    </View>
                    <View className="flex-1 ml-2">
                        <Text className="mb-2">Select End</Text>
                        <FlatList
                            data={levels}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelect(item, 'end')}
                                    className={`p-2 border border-black rounded-lg mb-1.5 ${range.end === item ? 'bg-blue-500' : ''}`}
                                >
                                    <Text className={`text-center ${range.end === item ? 'text-white' : ''}`}>{item}</Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
                <Pressable
                    onPress={() => setModalVisible(false)}
                    className="mt-4 p-2 bg-blue-500 rounded-lg"
                >
                    <Text className="text-white text-center">Confirm</Text>
                </Pressable>
            </View>
        </Pressable>

    );
};

export default ArrayChoosen;
