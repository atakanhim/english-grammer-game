import { Link } from "expo-router";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Modal
} from "react-native";
import d2 from "@/constants/ExampleData";
import { useEffect, useState } from "react";

import TopSideRender from "@/components/HomePageComponents/TopSideRender";
import BottomSideRender from "@/components/HomePageComponents/BottomSideRender";
import QuestionLevelRender from "@/components/HomePageComponents/QuestionLevelRender";
import { Choosens } from "@/constants/Enums/Choosen";
import MainGameContainer from "@/components/HomePageComponents/GameRenderComponents/MainGameContainer";

export default function TabOneScreen() {

    // page refresh state
    const [refreshing, setRefreshing] = useState(false);
    const [refreshed, setRefreshed] = useState(false);
    // arrays data
    const [falseIndexs, setFalseIndexs] = useState<any[]>([])
    const [randomData, setRandomData] = useState<SentenceData>();
    const [shuffledResults, setShuffledResults] = useState<any[]>([]);
    const [answerData, setAnswerData] = useState<any[]>([]);


    // button states
    const [helpState, setHelpState] = useState<boolean>(false);
    const [showChoosen, setShowChoosen] = useState(false); // showChoosen false onaylanmıs demek render edilebilir

    // modal messages
    const [modalMessage, setModalMessage] = useState('');
    const [modalButtonMessage, setModalButtonMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // questionrender gonderilecek
    const [choosenLevel, setChoosenLevel] = useState<{
        range: { start: null, end: null },
        single: Choosens | undefined,
        selected: 'range' | 'single'
    }>({
        range: { start: null, end: null },
        single: Choosens.Random,
        selected: 'single'
    });


    // slected indexs
    const [selectedShuufleIndex, setSelectedShuufleIndex] = useState<number | null>(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    // end
    const filterData = (data: SentenceData[]): SentenceData[] => {
        if (choosenLevel.selected === 'single' && choosenLevel.single !== Choosens.Random) {
            return data.filter(item => item.level === choosenLevel.single);

        } else if (choosenLevel.selected === 'range' && choosenLevel.range) {
            const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
            const startIndex = levels.indexOf(choosenLevel.range.start as any);
            const endIndex = levels.indexOf(choosenLevel.range.end as any);
            return data.filter(item => {
                const levelIndex = levels.indexOf(item.level as any);
                return levelIndex >= startIndex && levelIndex <= endIndex;
            });
        }
        return data; // random (all data)
    };
    async function createRandomData(): Promise<SentenceData> {
        let filteredData = filterData(d2);
        let selectedData = await filteredData[Math.floor(Math.random() * filteredData.length)];
        return selectedData;
    }
    async function refresh() {
        let selectedData = await createRandomData();
        setRandomData(selectedData);
        setAnswerData([]);
        if (selectedData.wordEngAryResult)
            setShuffledResults(shuffle([...selectedData.wordEngAryResult]));
        setFalseIndexs([]);
        setSelectedShuufleIndex(null);
        setSelectedAnswerIndex(null);
    }
    const onRefresh = () => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    };
    function controlDataResults() {
        let control = true;
        let array = [];
        if (!(randomData || answerData))
            throw "bu hata";

        if (randomData && randomData.wordEngAryResult.length > 0)
            for (let i = 0; i < randomData.wordEngAryResult.length; i++) {

                let realData = randomData?.wordEngAryResult[i];
                let ourData = answerData[i];
                if (realData?.toString().toLowerCase() !== ourData?.toString().toLowerCase()) {
                    control = false;
                    array.push(i);
                }
            }
        setFalseIndexs(array);
        return control;
    }
    const handleButtonPress = async () => {

        let control = controlDataResults();
        if (control) {
            setModalMessage('Congratulations! You have completed the test. Please refresh to start a new test.');
            refresh();
            setModalButtonMessage('Next')
            setModalVisible(true);


        } else {
            setModalMessage('Please try again.');
            setModalButtonMessage('Try Again')
            setModalVisible(true);
            setHelpState(true);
        }
    };

    // use effectss
    useEffect(() => {
        if (showChoosen == false)
            refresh();
    }, [showChoosen]);

    useEffect(() => {
        controlDataResults();
    }, [answerData])
    useEffect(() => {
        if (helpState === true && modalVisible === false) {
            setTimeout(() => {
                setHelpState(false);
            }, 3000);
        }
    }, [helpState, modalVisible])
    // use effects
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ width: '100%', padding: 8 }}>
                    <QuestionLevelRender showChoosen={showChoosen} setShowChoosen={setShowChoosen} choosenLevel={choosenLevel} setChoosenLevel={setChoosenLevel} />
                </View>


                <View className="flex-1 w-full " >
                    <View className="px-10">
                        <TopSideRender randomData={randomData} />
                        <BottomSideRender helpState={helpState} setHelpState={setHelpState} refresh={refresh} handleButtonPress={handleButtonPress} />
                    </View>
                    <MainGameContainer selectedAnswerIndex={selectedAnswerIndex} setSelectedAnswerIndex={setSelectedAnswerIndex} setSelectedShuufleIndex={setSelectedShuufleIndex} selectedShuufleIndex={selectedShuufleIndex} helpState={helpState} falseIndexs={falseIndexs} setFalseIndexs={setFalseIndexs} randomData={randomData} shuffledResults={shuffledResults} answerData={answerData} setAnswerData={setAnswerData} setShuffledResults={setShuffledResults} ></MainGameContainer>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{modalMessage}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>{modalButtonMessage}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView >
    );
}
function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },

    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    titleContainer: {
        minHeight: 50,
        padding: 15,
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    word: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    resultText: {
        fontSize: 16,
    },
});
