import { View, Text, StyleSheet } from 'react-native';

export default function AppHeaderInfo({ data }) {

    const all = data.length;
    const done = data.filter(item => item.done).length;
    const line = all ? ((done / all) * 100).toFixed(0) : 0;

    return (
        <View style={styles.appHeader}>
            <Text style={styles.appHeaderTitle}>All Tasks</Text>
            <View style={styles.appHeaderInfo}>
                <View style={[styles.line, { width: `${line}%` }]}></View>
                <Text style={styles.info}>
                    <Text style={{ fontWeight: 'bold' }}> {done} </Text>
                    of
                    <Text style={{ fontWeight: 'bold' }}> {all} </Text>
                    tasks done
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    appHeaderTitle: {
        fontFamily: 'mt-bold',
        color: '#212529',
        textShadowColor: 'rgba(155, 152, 152, 0.5)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 12,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },

    appHeaderInfo: {
        position: 'relative',
        fontFamily: 'mt-regular',
        width: '80%',
        height: 27,
        borderWidth: 1,
        borderColor: '#ffe866',
        borderRadius: 5,
        shadowColor: '#000',
        backgroundColor: '#fff',
        elevation: 20,
    },
    line: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#ffe866',
        zIndex: -1

    },
    info: {
        fontFamily: 'mt-regular',
        fontSize: 17,
        textAlign: 'center',
        padding: 2
    }

});
