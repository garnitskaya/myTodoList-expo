import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default function SearchPanel({ onUpdateSearch }) {

    const [term, setTerm] = useState('');

    const onUpdateSearchItem = (term) => {
        setTerm(term)
        onUpdateSearch(term);
    }

    return (
        <View style={styles.searchPanel}>
            <TextInput
                value={term}
                style={styles.input}
                placeholder="Find a task"
                onChangeText={onUpdateSearchItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchPanel: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        fontFamily: 'mt-regular',
        width: '100%',
        fontSize: 20,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#e6f0ff',
    }
});
