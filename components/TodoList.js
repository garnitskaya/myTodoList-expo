import { FlatList, StyleSheet, View } from 'react-native';
import TodoListItem from './TodoListItem';

export default function TodoList({ data, onDeleteItem, onToggleImportant, onToggleDone }) {
    return (
        <View style={styles.container}>
            <FlatList data={data} renderItem={({ item }) => (
                <TodoListItem
                    item={item}
                    onDeleteItem={() => onDeleteItem(item.id)}
                    onToggleImportant={() => onToggleImportant(item.id)}
                    onToggleDone={() => onToggleDone(item.id)}
                />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
