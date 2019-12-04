import React, {useState} from 'react';
import {Animated, SafeAreaView, Text, Dimensions, View, TouchableOpacity,} from 'react-native'
import { Input, Button } from 'react-native-ui-kitten';
import * as SecureStore from 'expo-secure-store';
import config from '../../constants/Config'
let deviceHeight = Dimensions.get('window').height;

export default function LoginScreen({setSelected, setLogged}) {
    const [fade] = useState(new Animated.Value(1));
    const [margin] = useState(new Animated.Value(1));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginServer = () => {
        console.log(config.addr);
        fetch(config.addr + '/users/sign_in?user[email]=luke@csusm.edu&user[password]=Password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authentication: 'secret',
            },
        }).then((response) => {
            let token = response.headers.get('Authorization');
            SecureStore.setItemAsync("token", token).then(() => {
                _loginDone();
            });
            return response.json()})
            .catch((error) => {
                console.error(error);
            });
    };

    const _loginDone = () => {
        Animated.timing(
            fade,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start();
        Animated.timing(
            margin,
            {
                toValue: -150,
                duration: 1000,
            }
        ).start();
        setTimeout(() => {
            setLogged(true);
        }, 1000)
    };

    return (
        <View
            style={{flex: 1}}>
            <SafeAreaView>
                <View style={{alignItems: 'flex-end', height: deviceHeight / 4, marginTop: 40, marginRight: 20}}>
                    <Animated.Text style={{fontSize: 35, fontWeight: "800", color: 'white', marginTop: margin, position: 'absolute'}}>Nice to see you</Animated.Text>
                </View>
                <Animated.View style={{margin: 20, opacity: fade}}>
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
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

LoginScreen.navigationOptions = {
};
