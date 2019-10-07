import React, {useState} from 'react';
import { ViewPager } from 'react-native-ui-kitten';
import LoginScreen from './LoginScreen';
import {View, Text, ImageBackground, Dimensions} from 'react-native'
import RegisterScreen from './RegisterScreen';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function AuthenticationScreen({setLogged}) {
    const [selected, setSelected] = useState(0);

    const onIndexChange = (index) => {
        console.log("New index => " + index)
    };

    return (
        <ImageBackground
            style={{width: deviceWidth, height: deviceHeight, flex: 1}}
            blurRadius={100}
            source={require('../../assets/images/shutterstock_1068141515.jpg')}>
            {selected === 0 ? (
                <LoginScreen setSelected={setSelected} setLogged={setLogged}>
                    <Text>Tab 1</Text>
                </LoginScreen>
            ) : (
                <RegisterScreen setSelected={setSelected}>
                    <Text>Tab 1</Text>
                </RegisterScreen>
            )}
        </ImageBackground>
    );
}

AuthenticationScreen.navigationOptions = {
    header: null,
};