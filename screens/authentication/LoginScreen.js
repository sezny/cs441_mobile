import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity} from 'react-native'
import { Input, Button } from 'react-native-ui-kitten';
import * as SecureStore from 'expo-secure-store';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function LoginScreen({setSelected}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginServer = () => {
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
                <View style={{alignItems: 'flex-end', height: deviceHeight / 4, marginTop: 40, marginRight: 20}}>
                    <Text style={{fontSize: 35, fontWeight: "800", color: 'white'}}>Nice to see you</Text>
                </View>
                <View style={{margin: 20}}>
                    <Input
                        placeholder={"Your username"}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Input
                        style={{marginTop: 20}}
                        placeholder={"Your password"}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setSelected(1)}
                        style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', marginTop: 20, fontSize: 18, textDecorationLine: 'underline'}}>No account yet?</Text>
                    </TouchableOpacity>
                    <Button
                        style={{marginTop: 30}}
                        status='danger'
                        size='large'
                        onPress={() => loginServer()}>
                        Login
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    );
}

LoginScreen.navigationOptions = {
};
