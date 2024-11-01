import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MotiView } from 'moti';
import verbsjson from "@/constants/VerbsJson";
const filterData = (data: IVerbs[]): IVerbs[] => {
    return data; // random (all data)
};
async function createRandomData(): Promise<IVerbs> {
    let filteredData = filterData(verbsjson);
    let selectedData = await filteredData[Math.floor(Math.random() * filteredData.length)];
    return selectedData;
}
const verbsgame = () => {
    const [randomVerb, setRandomVerb] = useState<IVerbs | null>(null);
    const [pastSimple, setPastSimple] = useState('');
    const [pastParticiple, setPastParticiple] = useState('');
    const [feedback, setFeedback] = useState('');

    const fetchData = async () => {
        const data = await createRandomData();
        setRandomVerb(data);
        setPastSimple('');
        setPastParticiple('');
        setFeedback('');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = () => {
        if (randomVerb) {
            if (pastSimple === randomVerb.past_simple && pastParticiple === randomVerb.past_participle) {
                fetchData();
            } else if (pastSimple === randomVerb.past_simple) {
                setFeedback("past simple dogru ,past participle yanlis")
            } else if (pastParticiple === randomVerb.past_participle) {
                setFeedback("past participle dogru , past simple yanlis")
            }
            else {
                setFeedback("her 2 side yanlis");
            }
        }
    };

    const handleSkip = () => {
        fetchData(); // Fetch new random verb without checking answers
    };

    return (
        <MotiView
            style={styles.container}
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
        >
            {randomVerb ? (
                <View className='w-9/12'>
                    <Text style={styles.text}>Base Form: {randomVerb.base_form}</Text>
                    <View style={styles.inputContainer}>
                        <Text>Past Simple:</Text>
                        <TextInput
                            style={styles.input}
                            value={pastSimple}
                            onChangeText={(text) => setPastSimple(text.toLowerCase())}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Past Participle:</Text>
                        <TextInput
                            style={styles.input}
                            value={pastParticiple}
                            onChangeText={(text) => setPastParticiple(text.toLowerCase())}
                        />
                    </View>
                    <Button title="Kontrol Et" onPress={handleSubmit} />
                    <Button title="Geç" onPress={handleSkip} />
                    <Text className='text-green-500' >{feedback}</Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
        </MotiView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginLeft: 8,
        flex: 1,
    },
    feedback: {
        marginTop: 8,
        fontSize: 16,
        color: 'green',
    },
});
export default verbsgame