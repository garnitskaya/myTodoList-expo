import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

export default function ItemsFilter({ onFilterChange, filter }) {

    const buttons = [
        { name: 'all', label: 'all' },
        { name: 'active', label: 'active' },
        { name: 'done', label: 'done' },
        { name: 'important', label: 'important' },
    ]

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => onFilterChange(item.name)}>
                <Text style={[styles.btnFilter, filter === item.name && styles.btnFilterActive]}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.itemFilter}>
            <FlatList horizontal data={buttons} renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    itemFilter: {
        marginBottom: 15,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    btnFilter: {
        fontFamily: 'mt-regular',
        fontSize: 19,
        color: '#6c757d',
        lineHeight: 25,
        paddingHorizontal: 12,
        paddingVertical: 6,
        textShadowColor: 'rgba(155, 152, 152, 0.3)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10,
    },
    btnFilterActive: {
        color: '#6610f2',
        fontSize: 22,
        textShadowColor: 'rgba(102, 16, 242, .3)',
    }
});
