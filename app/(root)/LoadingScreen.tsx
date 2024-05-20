import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Yükleniyor...</Text>
            <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light background color
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    spinner: {
        marginBottom: 10, // Optional spacing below the spinner
    },
});

export default LoadingScreen;