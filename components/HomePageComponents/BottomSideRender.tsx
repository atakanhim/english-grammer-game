import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const BottomSideRender = ({ refresh, handleButtonPress }: any) => {
    return (
        <View style={styles.buttonsContainer}>
            <Pressable style={[styles.customButton, styles.refreshButton]} onPress={refresh}>
                <Text style={styles.buttonText}>Yenile</Text>
            </Pressable>
            <Pressable style={[styles.customButton, styles.checkButton]} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Kontrol ET</Text>
            </Pressable>
        </View>
    );
};

export default BottomSideRender;

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    customButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    refreshButton: {
        backgroundColor: 'lightblue',
    },
    checkButton: {
        backgroundColor: 'lightgreen',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
});
