import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

enum Choosens {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
    Random = "Random"
}

const levels = Object.values(Choosens).filter(level => level !== Choosens.Random);

const QuestionLevelRender = () => {
    const [selectionType, setSelectionType] = useState<'single' | 'range'>('single');
    const [choosenLevel, setChoosenLevel] = useState<Choosens | undefined>(undefined);
    const [rangeStart, setRangeStart] = useState<Choosens | undefined>(undefined);
    const [rangeEnd, setRangeEnd] = useState<Choosens | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [rangeModalVisible, setRangeModalVisible] = useState(false);
    const [isSelectingRangeStart, setIsSelectingRangeStart] = useState(true);

    const handleSelect = (level: Choosens) => {
        if (selectionType === 'single') {
            setChoosenLevel(level);
        } else {
            if (isSelectingRangeStart) {
                setRangeStart(level);
                setIsSelectingRangeStart(false);
            } else {
                setRangeEnd(level);
                setRangeModalVisible(false);
                setIsSelectingRangeStart(true);
            }
        }
        setModalVisible(false);
    };

    const selectRandomLevel = () => {
        if (rangeStart && rangeEnd) {
            const startIndex = levels.indexOf(rangeStart as any);
            const endIndex = levels.indexOf(rangeEnd as any);
            if (startIndex >= 0 && endIndex >= 0 && startIndex <= endIndex) {
                const randomIndex = Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
                setChoosenLevel(levels[randomIndex]);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>QuestionLevelRender</Text>

            <View style={styles.radioContainer}>
                <TouchableOpacity onPress={() => setSelectionType('single')} style={styles.radio}>
                    <View style={[styles.radioCircle, selectionType === 'single' && styles.selectedRadio]} />
                    <Text style={styles.radioText}>Single Level</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectionType('range')} style={styles.radio}>
                    <View style={[styles.radioCircle, selectionType === 'range' && styles.selectedRadio]} />
                    <Text style={styles.radioText}>Level Range</Text>
                </TouchableOpacity>
            </View>

            {selectionType === 'single' ? (
                <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
                    <Text style={styles.dropdownText}>
                        {choosenLevel ? choosenLevel : "Select a level"}
                    </Text>
                </TouchableOpacity>
            ) : (
                <>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setRangeModalVisible(true)}>
                        <Text style={styles.dropdownText}>
                            {rangeStart ? `Start: ${rangeStart}` : "Select start level"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setRangeModalVisible(true)}>
                        <Text style={styles.dropdownText}>
                            {rangeEnd ? `End: ${rangeEnd}` : "Select end level"}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={selectRandomLevel}>
                <Text style={styles.buttonText}>Select Random Level</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={Object.values(Choosens)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item as Choosens)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                visible={rangeModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setRangeModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setRangeModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={levels}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item as Choosens)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default QuestionLevelRender;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadio: {
        backgroundColor: '#000',
    },
    radioText: {
        marginLeft: 5,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '60%',
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
});
