import { loadCurrentUser } from '@/storage/storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
interface TopSideRenderProps {
    randomData: SentenceData | undefined;
}
const TopSideRender: React.FC<TopSideRenderProps> = ({ randomData }) => {
    const { t } = useTranslation();

    return (
        <View className="flex-1  flex-row justify-between p-2" >
            <Text>{t("level")} : <Text className="font-bold">{randomData?.level}</Text> </Text>
            <Text>{t("tense")} : <Text className='font-bold'>{randomData?.tense}</Text></Text>
        </View>
    );
};

export default TopSideRender;
