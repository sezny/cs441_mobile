import Modal from "react-native-modal";
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Picker} from 'react-native'
import {
    Input,
    Layout,
    Button
} from 'react-native-ui-kitten';
const {height, width} = Dimensions.get('window');
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import config from "../../constants/Config";
import * as SecureStore from "expo-secure-store";
export default function Create({visible, setCreateVisible, get}) {
    const [search, setSearch] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");

    const createNewEvent = () => {
        SecureStore.getItemAsync("token").then( token => {
            fetch(config.addr + '/events/create?event[title]='+ search +'&event[description]=' + description, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                },
            }).then((response) => {
                return response.json()}).then(responseJson => {
                console.log(responseJson);
                setCreateVisible(false)
            }).catch((error) => {
                console.error(error);
            });
        });

    };

    return (
        <Modal
            onSwipeComplete={() => setCreateVisible(false)}
            swipeDirection="down"
            isVisible={visible}>
            <View style={styles.modalContainer}>
                <View>
                    <Text style={styles.textInfo}>Event name</Text>
                        <Input
                            style={styles.input}
                            value={search}
                            size='small'
                            onChangeText={data => setSearch(data)}
                            placeholder='Active'
                        />
                        <View style={{justifyContent: 'flex-end'}}>
                            <Text style={styles.textInfo}>Description</Text>
                        </View>
                    <Input
                        style={styles.inputDescription}
                        value={description}
                        size='small'
                        onChangeText={data => setDescription(data)}
                        placeholder='Active'
                    />
                    <Text style={{textAlign: 'center', fontWeight: '300'}}>Choose type of event</Text>
                    <Picker   style={{height: 30}}
                              selectedValue={user} onValueChange={user => setUser(user)}>
                        <Picker.Item label="Steve" value="steve" />
                        <Picker.Item label="Ellen" value="ellen" />
                        <Picker.Item label="Maria" value="maria" />
                    </Picker>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Button style={[styles.botButtons, {flexGrow: 1}]} onPress={() => {

                        setCreateVisible(false)
                    }}
                            status='danger'>Cancel</Button>
                    <Button onPress={() => {
                        createNewEvent();
                    }} style={[styles.botButtons, {flexGrow: 4}]}>Save event</Button>
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
        marginTop: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
        justifyContent: 'space-between'

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
        width:  320
    },
    inputDescription: {
        flex: 1,
        width:  320,
        minHeight: 80
    },
    botButtons:{
        margin: 10
    },
    textInfo: {
        textDecorationLine: 'underline',
        textDecorationColor: '#D9E4FF',
        color: '#2E3A59',
        marginBottom: 3,
        width: 100
    }
});