import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import uuid from 'react-native-uuid';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppHeaderInfo from './components/AppHeaderInfo';
import ItemAddForm from './components/ItemAddForm';
import ItemsFilter from './components/ItemsFilter';
import SearchPanel from './components/SearchPanel';
import TodoList from './components/TodoList';

const fonts = () => Font.loadAsync({
    'mt-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'mt-regular': require('./assets/fonts/Montserrat-Regular.ttf')
});

export default function App() {
    const [todos, setTodos] = useState([]);
    const [font, setFont] = useState(false);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadTodos()
    }, []);

    const saveTodos = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('data', jsonValue)
        } catch (e) {
            alert('Application Error. Cannot load data.')
        }
    }

    const loadTodos = async () => {
        try {
            const getTodos = await AsyncStorage.getItem('data')
            const parsedTodos = JSON.parse(getTodos)
            setTodos(parsedTodos || []);
        } catch (e) {
            alert('Application Error. Cannot load data.')
        }
    };

    const addItem = (label) => {
        const newItem = {
            label,
            done: false,
            important: false,
            id: uuid.v4()
        };

        setTodos(todos => {
            const newTodos = [...todos, newItem];
            saveTodos(newTodos);
            return newTodos;
        });
    }

    const deleteItem = (id) => {
        setTodos(todos => {
            const newTodos = todos.filter(item => item.id !== id)
            saveTodos(newTodos);
            return newTodos;
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Medium);
    }

    const onToggleImportant = (id) => {
        setTodos(todos.map(item => item.id === id ? { ...item, important: !item.important } : item));
    };

    const onToggleDone = (id) => {
        setTodos(todos.map(item => item.id === id ? { ...item, done: !item.done } : item));
    };

    const searchItem = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => item.label.toLowerCase()
            .indexOf(term.toLowerCase()) > -1)
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const filterItem = (items, filter) => {
        switch (filter) {
            case 'done':
                return items.filter(item => item.done);
            case 'active':
                return items.filter(item => !item.done);
            case 'important':
                return items.filter(item => item.important);
            default:
                return items;
        }
    }

    const onFilterChange = (filter) => {
        setFilter(filter);
    }

    const visible = filterItem((searchItem(todos, term)), filter);

    if (font) {
        return (
            <View style={styles.container}>
                <AppHeaderInfo todos={todos} />
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <ItemsFilter
                    filter={filter}
                    onFilterChange={onFilterChange} />
                <TodoList
                    data={visible}
                    onDeleteItem={deleteItem}
                    onToggleImportant={onToggleImportant}
                    onToggleDone={onToggleDone}
                />
                <ItemAddForm onAdd={addItem} />
                <StatusBar style="auto" />
            </View>
        );
    } else {
        return (
            <AppLoading
                startAsync={fonts}
                onFinish={() => setFont(true)}
                onError={console.warn}
            />)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
});