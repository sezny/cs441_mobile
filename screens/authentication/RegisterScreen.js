import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity, ScrollView, Picker, Modal} from 'react-native'
import { Input, Button } from 'react-native-ui-kitten';
import * as SecureStore from 'expo-secure-store';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export default function RegisterScreen({setSelected}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [school, setSchool] = useState('');


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
                    console.log(school);
                    console.log(major);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        
        <ScrollView
            style={{flex: 1}}>
            <SafeAreaView>
                <View style={{alignItems: 'flex-end', height: deviceHeight / 6, marginTop: 40, marginRight: 20}}>
                    <Text style={{fontSize: 35, fontWeight: "800", color: 'white'}}>Join us</Text>
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
                    <Input
                        style={{marginTop: 20}}
                        placeholder={"Your Name"}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <Input
                        style={{marginTop: 20}}
                        placeholder={"Your Email"}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <View style={{alignItems:'center'}}>
                        <Text style = {{
                                marginTop:20,
                                fontSize: 20,
                                color: 'white'
                                
                            }
                        }>Select School Below</Text>
                    
                    </View>
                    <Picker     style={{height:80}} 
                                    itemStyle={{height:80}}
                                    selectedValue = {school}
                                    onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
                                    >
                        <Picker.Item label = "CalState San Marcos" value = "San Marcos" />
                        <Picker.Item label = "San Diego Sate University" value = "SD State" />
                        <Picker.Item label = "University of San Diego" value = "USD" />
                        <Picker.Item label = "University of California San Diego" value= "UCSD" />
                    </Picker>
                    <View style={{alignItems:'center'}}>
                        <Text style = {{
                                marginTop:20,
                                fontSize: 20,
                                color: 'white'
                                
                            }
                        }>Select Major Below</Text>
                    </View>
                    <Picker     style={{height:80}} 
                                    itemStyle={{height:80}}
                                    selectedValue = {major}
                                    onValueChange={(itemValue, itemIndex) => setMajor(itemValue)}
                                    >
                        <Picker.Item label = "Computer Science" value = "Computer Science" />
                        <Picker.Item label = "Nursing" value = "Nursing" />
                        <Picker.Item label = "Business" value = "Business" />
                        <Picker.Item label = "Computer Information Systems" value= "CIS" />
                    </Picker>
                    <TouchableOpacity onPress={() => setSelected(0)}
                                      style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', marginTop: 20, fontSize: 18, textDecorationLine: 'underline'}}>Already have an account?</Text>
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
        </ScrollView>
    );
}

RegisterScreen.navigationOptions = {
};
