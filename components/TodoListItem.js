import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Checkbox from './Сheckbox';

export default function TodoListItem({ item, onDeleteItem, onToggleImportant, onToggleDone }) {

    return (
        <View style={[styles.listItem, item.done && styles.listItemDone]}>
            <View style={styles.listItemBox}>
                <Checkbox done={item.done} onToggleDone={onToggleDone} />
                <TouchableOpacity style={styles.listItemBox} onPress={onToggleImportant}>
                    <Text
                        style={[
                            styles.listItemText,
                            item.important && styles.textImportant,
                            item.done && styles.textDone]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listItemButtons}>
                <View style={styles.listItemButton}>
                    <FontAwesome style={item.important ? styles.important : styles.star} name="star" size={24} color="#ffd700" />
                </View>
                <TouchableOpacity onPress={onDeleteItem} style={styles.listItemButton}>
                    <FontAwesome name="trash" size={24} color="#e5383b" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: 10,
        paddingLeft: 15,
        marginBottom: 10,
        backgroundColor: '#e9fcf6',
        borderRadius: 30,
    },
    listItemDone: {
        backgroundColor: '#fbe9eb',
    },
    listItemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    listItemText: {
        flex: 1,
        fontFamily: 'mt-regular',
        fontSize: 18,
        lineHeight: 22,
        paddingHorizontal: 10,
        color: '#212529',
    },
    listItemButtons: {
        flexDirection: 'row',
    },
    listItemButton: {
        padding: 6
    },
    star: {
        opacity: 0,
        transform: [{ translateX: 0 }]
    },
    important: {
        opacity: 1,
        transform: [{ scaleX: 1 }]
    },
    textImportant: {
        color: '#ffd700',
    },
    textDone: {
        color: '#c4c4c4',
        textDecorationLine: 'line-through',
        fontStyle: 'italic',
    }
});
