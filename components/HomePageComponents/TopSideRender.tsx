import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopSideRender = ({ randomData, score }: any) => {
    return (
        <View style={styles.topContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.label}>Seviye:</Text>
                <Text style={styles.value}>{randomData?.level}</Text>
                <Text style={styles.label}>Zaman:</Text>
                <Text style={styles.value}>{randomData?.tense}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.label}>Toplam Puanın:</Text>
                <Text style={styles.value}>{score}</Text>
                <Text style={styles.label}>Sorunun Puanı:</Text>
                <Text style={styles.value}>100</Text>
            </View>
        </View>
    );
};

export default TopSideRender;

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        marginBottom: 5,
    },
});
