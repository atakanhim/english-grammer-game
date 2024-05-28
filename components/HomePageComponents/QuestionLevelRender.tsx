
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, Pressable, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SingleChoosen from './ChoosenTypes/SingleChoosen';
import ArrayChoosen from './ChoosenTypes/ArrayChoosen';
import { Choosens } from '@/constants/Enums/Choosen';

interface QuestionLevelRenderProps {
    choosenLevel: {
        range: {
            start: null;
            end: null;
        };
        single: Choosens | undefined;
        selected: "range" | "single";
    },
    setChoosenLevel: Dispatch<SetStateAction<{
        range: {
            start: null;
            end: null;
        };
        single: Choosens | undefined;
        selected: "range" | "single";
    }>>,
    showChoosen: boolean,
    setShowChoosen: Dispatch<SetStateAction<boolean>>

}
const levels = Object.values(Choosens).filter(level => level !== Choosens.Random);

const QuestionLevelRender: React.FC<QuestionLevelRenderProps> = ({ choosenLevel, setChoosenLevel, showChoosen, setShowChoosen }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [range, setRange] = useState({ start: null, end: null });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    useEffect(() => {
        if (selectedIndex === 0 && choosenLevel.selected !== "single")
            setChoosenLevel(prev => ({ ...prev, selected: 'single' }));
        else if (selectedIndex === 1 && choosenLevel.selected !== "range")
            setChoosenLevel(prev => ({ ...prev, selected: 'range' }));
    }, [selectedIndex])

    useEffect(() => {
        if (!(range.end == null || range.start == null))
            setChoosenLevel(prev => ({ ...prev, range: range, selected: 'range' }));
    }, [range]);

    const handleSelect = (level: Choosens, type: 'start' | 'end' | 'none') => {
        if (type === 'start')
            setRange(prev => ({ ...prev, start: level }) as any);
        else if (type === 'none') {
            setChoosenLevel(prev => ({ ...prev, single: level, selected: 'single' }));
            setModalVisible2(false);
        }
        else
            setRange(prev => ({ ...prev, end: level }) as any);

    };
    const performAction = () => {
        if (showChoosen)
            setModalVisible(false)
        setShowChoosen(!showChoosen);
    };

    const renderChoosenTypeText = () => {
        return <>
            <Text className='mt-3'> {
                choosenLevel.selected === "single" ?
                    (choosenLevel.single ? choosenLevel.single : "Choose Level") :
                    (choosenLevel.range.start && choosenLevel.range.end ? `Range: ${choosenLevel.range.start} to ${choosenLevel.range.end}` : "Random")
            }</Text>
        </>
    }
    return (
        <View style={{ flex: 1 }}>
            <View className="flex flex-row justify-between " >
                {renderChoosenTypeText()}
                <Pressable style={styles.chooseButton} onPress={performAction}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>{showChoosen ? "Confirm" : "Choose Level"}</Text>
                </Pressable>
            </View>
            {showChoosen && <>
                <SegmentedControl
                    values={['Single Level', 'Level Range']}
                    selectedIndex={selectedIndex}
                    onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
                />
                <Pressable onPress={() => {
                    if (selectedIndex === 0) {
                        setModalVisible2(true)
                    }
                    else {
                        setModalVisible(true)
                    }

                }} style={styles.selectLevelButton}>
                    <Text>
                        {selectedIndex === 0 ?
                            (choosenLevel.single ? choosenLevel.single : "Choose Level") :
                            (choosenLevel.range.start && choosenLevel.range.end ? `Range: ${choosenLevel.range.start} to ${choosenLevel.range.end}` : "Choose Level Range")}

                    </Text>
                </Pressable>
            </>}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >

                <ArrayChoosen levels={levels} handleSelect={handleSelect} range={range} setModalVisible={setModalVisible} />
            </Modal>

            <Modal
                visible={modalVisible2}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible2(false)}
            >
                <SingleChoosen levels={levels} handleSelect={handleSelect} setModalVisible2={setModalVisible2} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 20,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    column: {
        flex: 1,
        alignItems: 'center'
    },
    levelButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginVertical: 5,
        width: 80,
        alignItems: 'center'
    },
    selectedButton: {
        backgroundColor: 'lightgray'
    },
    levelText: {
        textAlign: 'center'
    },
    confirmButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    confirmText: {
        textAlign: 'center'
    },
    chooseButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        minWidth: 150
    },
    selectLevelButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20
    }
});

export default QuestionLevelRender;
