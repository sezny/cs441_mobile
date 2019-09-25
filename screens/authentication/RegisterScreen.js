import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity} from 'react-native'
import { Input, Button } from 'react-native-ui-kitten';
import * as SecureStore from 'expo-secure-store';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function RegisterScreen({setSelected}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const registerToServer = () => {
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.token) {
                    SecureStore.setItemAsync("token", responseJson.token).then(() => {
                        console.log("I did it")
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View
            style={{flex: 1}}>
            <SafeAreaView>
                <View style={{alignItems: 'flex-end', height: deviceHeight / 6, marginTop: 40, marginRight: 20}}>
                    <Text style={{fontSize: 35, fontWeight: "800", color: 'white'}}>Join us</Text>
                </View>
                <View style={{margin: 20}}>
                    <Input
                        placeholder={"Your user name"}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Input
                        style={{marginTop: 20}}
                        placeholder={"Your password"}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Input
                        style={{marginTop: 20}}
                        placeholder={"Your Name"}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TouchableOpacity onPress={() => setSelected(0)}
                                      style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', marginTop: 20, fontSize: 18, textDecorationLine: 'underline'}}>Already have an account ?</Text>
                    </TouchableOpacity>
                    <Button
                        style={{marginTop: 30}}
                        status='danger'
                        size='large'
                        onPress={() => registerToServer()}>
                        Create my account
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    );
}

RegisterScreen.navigationOptions = {
};
