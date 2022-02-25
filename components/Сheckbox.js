import { Pressable, StyleSheet } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from '@expo/vector-icons';

export default function Checkbox({ done, onToggleDone }) {
    return (
        <Shadow distance={5} startColor={done ? 'rgba(255, 0, 0, 0.3)' : 'rgba(32, 201, 151, 0.3)'}>
            <Pressable
                style={[styles.checkboxBase, done && styles.checkboxChecked]}
                onPress={onToggleDone}
            >
                {done && <FontAwesome name="check" size={14} color="white" />}
            </Pressable>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(32, 201, 151, .3)',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
    },
})