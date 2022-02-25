import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import uuid from 'react-native-uuid';
import * as Haptics from 'expo-haptics';

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
    const dataItems = [
        { label: 'Купить машину', done: true, important: true, id: 1 },
        { label: 'Поехать на море ', done: false, important: true, id: 2 },
        { label: 'Пополнить интернет Пополнить интернет Пополнить интернет ', done: true, important: true, id: 3 },
    ]

    const [data, setData] = useState(dataItems);
    const [font, setFont] = useState(false);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const addItem = (label) => {
        const newItem = {
            label,
            done: false,
            important: false,
            id: uuid.v4()
        };

        setData((data) => [...data, newItem])
    }

    const deleteItem = (id) => {
        setData(data.filter(item => item.id !== id));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }

    const onToggleImportant = (id) => {
        setData(data.map(item => item.id === id ? { ...item, important: !item.important } : item));
    };

    const onToggleDone = (id) => {
        setData(data.map(item => item.id === id ? { ...item, done: !item.done } : item));
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

    const visible = filterItem((searchItem(data, term)), filter);


    if (font) {
        return (
            <View style={styles.container}>
                <AppHeaderInfo data={data} />
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