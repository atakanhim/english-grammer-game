import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

const BottomSideRender = ({ refresh, handleButtonPress }: any) => {
    const [buttonPressed, setButtonPressed] = useState<boolean>(false)
    return (
        <View className="flex flex-col items-center justify-center">
            <View className="flex flex-row justify-between w-full  mt-4">
                <View>
                    <Pressable className="border h-10 border-blue-500 py-2 px-4 rounded-md" onPress={refresh}>
                        <Text className="text-blue-500 text-center">Yenile</Text>
                    </Pressable>
                    <Pressable className={` mt-2 py-2 px-4 rounded-full border   border-r-pink-600 border-t-green-600  border-b-purple-300 ${!buttonPressed && 'border-b-blue-600'}  `} onPressIn={() => setButtonPressed(!buttonPressed)} onPressOut={() => setButtonPressed(!buttonPressed)}>
                        <Text className='text-md  font-semibold text-pink-900'>Yanlışları Göster</Text>
                    </Pressable>
                </View>


                <Pressable className="border h-10 border-green-500 py-2 px-4 rounded-md" onPress={handleButtonPress}>
                    <Text className="text-green-500 text-center  ">Kontrol ET</Text>
                </Pressable>

            </View>
        </View>
    );
};

export default BottomSideRender;

