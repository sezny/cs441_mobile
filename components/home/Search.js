import Modal from "react-native-modal";
import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {
    Input,
    Layout,
} from 'react-native-ui-kitten';
const {height, width} = Dimensions.get('window');
import {AntDesign, MaterialIcons} from '@expo/vector-icons'

export default function Search({visible, setSearchVisible}) {
    const [search, setSearch] = useState("");
    return (
        <Modal
            onSwipeComplete={() => setSearchVisible(false)}
            swipeDirection="down"
            isVisible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        value={search}
                        size='small'
                        onChangeText={data => setSearch(data)}
                        placeholder='Active'
                    />
                    <TouchableOpacity style={styles.clear} onPress={() => {
                        setSearchVisible(false)
                    }}>
                        <MaterialIcons style={{marginRight: 15}} name="clear" size={30} color="#274BDB" />
                    </TouchableOpacity>
                </View>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                </View>
                <View>
                    
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
        marginLeft: -20,
        marginBottom: -20,
        marginTop: 80,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
    },
    clear: {
        marginLeft: 10,
        marginRight: 15
    },
    inputContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        flex: 1,
        width:  300
    },
    divider: {
        width: width / 1.1,
        height: 1,
        backgroundColor: '#dfdfdf',
        marginTop: 20,
    },
    dividerContainer: {
        width: width,
        justifyContent: 'center'
    }
});