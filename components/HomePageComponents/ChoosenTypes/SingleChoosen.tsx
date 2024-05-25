import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const SingleChoosen = ({ levels, handleSelect, setModalVisible2 }: any) => {
    return (
        <Pressable
            className="flex-1 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
            onPress={() => setModalVisible2(false)}
        >
            <View className=" w-40 border border-black" >
                <View className="border border-gray-200 rounded-lg p-5 w-50 min-h-75 items-center justify-center bg-white">
                    <FlatList
                        data={levels}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => handleSelect(item, 'none')}
                                className="p-2 border border-black rounded-lg my-1.5"
                            >
                                <Text className="text-center">{item}</Text>
                            </Pressable>
                        )}
                    />

                </View>
            </View>
        </Pressable>
    );
};

export default SingleChoosen;
