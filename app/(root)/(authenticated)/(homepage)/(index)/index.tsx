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
import DraggableFlatList from "react-native-draggable-flatlist";
import index from "@/app/(root)/(unauthenticated)";
import { useAuth } from "@/contexts/AuthProvider";
import TopSideRender from "@/components/HomePageComponents/TopSideRender";
import BottomSideRender from "@/components/HomePageComponents/BottomSideRender";
import QuestionLevelRender from "@/components/HomePageComponents/QuestionLevelRender";
function createRandomData(): SentenceData {
    let data: SentenceData[] = d2;
    let selectedData = data[Math.floor(Math.random() * data.length)];
    return selectedData;
}
export default function TabOneScreen() {

    const [randomData, setRandomData] = useState<SentenceData>();
    const [shuffledResults, setShuffledResults] = useState<any[]>([]);
    const [answerData, setAnswerData] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);



    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    useEffect(() => {
        refresh();
    }, []);

    function refresh() {
        let selectedData = createRandomData();
        setRandomData(selectedData);
        setAnswerData([]);
        setShuffledResults(shuffle([...selectedData.wordEngAryResult]));
    }



    const onRefresh = () => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    };
    const handleButtonPress = async () => {
        let control = true;
        // control edicek 
        if (!(randomData || answerData))
            return
        for (let i = 0; i < randomData!.wordEngAryResult.length; i++) {

            let realData = randomData?.wordEngAryResult[i];
            let ourData = answerData[i];
            if (realData?.toString().toLowerCase() !== ourData?.toString().toLowerCase()) {
                control = false;
            }
        }

        control = true; // deneme icin true false almayı unutma
        if (control) {
            setModalMessage('Congratulations! You have completed the test. Please refresh to start a new test.');
            setModalVisible(true);
        } else {
            setModalMessage('Please try again.');
            setModalVisible(true);
        }
    };

    function renderGetAnswerData() {
        return (
            <View
                style={{
                    minHeight: 100,
                    padding: 15,
                    borderColor: 'black',
                    borderBottomWidth: 1,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                {renderAnswerDataItem()}
            </View>
        );
    }
    function renderAnswerDataItem() {
        return (
            <>


                {answerData.length > 0 ? (answerData.map((item: any, index: number) => {
                    return (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                {
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 35,
                                    backgroundColor: pressed ? '#e0f7fa' : '#ffffff',
                                    borderColor: pressed ? '#00796b' : '#00796b',

                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 2, // Android için gölge efekti
                                },
                            ]}
                            onPress={() => addToShuffledData(index)}
                        >
                            <Text style={{ fontSize: 20, color: "#00796b" }}>{item}</Text>
                        </Pressable>
                    );
                })) : (<Text style={{ fontSize: 21, padding: 3, borderBottomColor: 'gray', borderBottomWidth: 1 }}>Please click on the words below. </Text>)}
            </>
        );
    }
    function renderSetAnswerData() {
        return (
            <View
                style={{
                    minHeight: 100,
                    padding: 15,
                    marginTop: 30, // 'top' yerine 'marginTop' kullanmak daha yaygın bir yöntemdir
                    borderColor: "gray",
                    borderBottomWidth: 1,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10, // 'gap' property sadece webde çalışıyor. Onun yerine 'margin' kullanabiliriz
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                {renderShuffledDataItems()}
            </View>
        );
    }
    function renderShuffledDataItems() {
        return (
            <>
                {shuffledResults &&
                    shuffledResults.map((item: any, index: number) => {
                        return (
                            <Pressable
                                key={index}
                                style={({ pressed }) => [
                                    {
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 35,
                                        backgroundColor: pressed ? '#ffcc80' : '#ffffff',
                                        borderColor: pressed ? '#e65100' : '#e65100',

                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 2,
                                        elevation: 2, // Android için gölge efekti
                                    },
                                ]}
                                onPress={() => addToAnswerData(index)}
                            >
                                <Text style={{ fontSize: 20, color: "#e65100" }}>{item}</Text>
                            </Pressable>
                        );
                    })}
            </>
        );
    }
    function addToAnswerData(indexArray: number) {
        setAnswerData((prevAnswerData) => [
            ...prevAnswerData,
            shuffledResults[indexArray],
        ]);
        setShuffledResults((prevShuffledResults) =>
            prevShuffledResults.filter((shuffledItem, shuffledItemIndex) => {
                // Check if the current shuffled item's index matches the target index
                if (shuffledItemIndex === indexArray) {
                    return shuffledItem !== shuffledResults[indexArray]; // Remove the item at indexArray
                } else {
                    return true; // Keep all other items
                }
            })
        );
    }
    function addToShuffledData(indexArray: number) {
        setShuffledResults((prevShuffledResults) => [
            ...prevShuffledResults,
            answerData[indexArray],
        ]);

        setAnswerData((prevAnswerData) =>
            prevAnswerData.filter((prevItem) => prevItem !== answerData[indexArray])
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ width: '100%', padding: 15 }}>
                    <QuestionLevelRender />
                </View>
                <View style={{ width: '100%' }}>
                    {/* bunu yazmamızın amacı style olarak ortaladıgımız için ben direk full kaplasın istiyorum kalan yerleri */}
                    <TopSideRender randomData={randomData} score={1111} />
                </View>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{randomData?.wordEng}</Text>
                    </View>
                    {renderGetAnswerData()}
                    {renderSetAnswerData()}
                </View>
                <View style={{ width: '100%' }}>
                    {/* bunu yazmamızın amacı style olarak ortaladıgımız için ben direk full kaplasın istiyorum kalan yerleri */}
                    <BottomSideRender refresh={refresh} handleButtonPress={handleButtonPress} />
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
                                    refresh();
                                }}>
                                <Text style={styles.textStyle}>Yeni Soru Gec</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
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

    container: {
        flex: 1,
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
