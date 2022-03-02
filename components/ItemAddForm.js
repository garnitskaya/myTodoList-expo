import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ItemAddForm({ onAdd }) {
    const [label, setLabel] = useState('');

    const onChangeValue = (label) => {
        setLabel(label);
    }

    const onSubmitItem = () => {
        label && onAdd(label);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Medium);
        setLabel('');
    }

    return (
        <View style={styles.addForm}>
            <TextInput
                value={label}
                style={styles.input}
                placeholder='Add task'
                onChangeText={onChangeValue} />
            <TouchableOpacity style={styles.addFormButton} onPress={onSubmitItem}>
                <MaterialCommunityIcons
                    style={styles.addFormCircle}
                    name="plus-circle"
                    size={70}
                    color="#0d6efd" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addForm: {
        flexDirection: 'row',
        position: 'relative',
        paddingTop: 10
    },
    input: {
        fontFamily: 'mt-regular',
        width: '87%',
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#e6f0ff',
    },

    addFormButton: {
        position: 'absolute',
        top: -2,
        right: 0,
    },
    addFormCircle: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    }
});


