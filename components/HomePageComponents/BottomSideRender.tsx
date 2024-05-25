import { View, Text, Pressable } from 'react-native';
import React from 'react';

const BottomSideRender = ({ refresh, handleButtonPress }: any) => {
    return (
        <View className="flex flex-col items-center justify-center p-4">
            <View className="flex flex-row justify-between w-full px-4 mt-4">
                <Pressable className="bg-blue-500 py-2 px-4 rounded-md" onPress={refresh}>
                    <Text className="text-white text-center">Yenile</Text>
                </Pressable>
                <Pressable className="bg-green-500 py-2 px-4 rounded-md" onPress={handleButtonPress}>
                    <Text className="text-white text-center">Kontrol ET</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default BottomSideRender;

