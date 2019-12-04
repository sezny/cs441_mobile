import React, {useState} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {SafeAreaView, ImageBackground, Text, Dimensions, View, TouchableOpacity, ScrollView, Picker, Modal, StyleSheet, FlatList, ActiviityIndicator, RefreshControl} from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';
import WeekView from 'react-native-week-view';
import {Overlay } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import DatePicker from 'react-native-datepicker';
import SearchModal from '../components/home/EventDesc';
import SearchModal2 from '../components/home/UpdateInfo';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


export default function SettingsScreen() {

  generateDates = (hours, minutes) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    if (minutes != null) {
      date.setMinutes(minutes);
    }
    return date;
  };

   const[username, setUsername] = useState('Cnixon12');
   const[name, setName] = useState('Curtis Nixon');
   const[email, setEmail] = useState('CN@gmail.com');
   const[major, setMajor] = useState('CS');
   const[school, setSchool] = useState('San Marcos');
   const[startDate, setStartDate] = useState(new Date());
   const[endDate, setEndDate] = useState(new Date());
   const[eventDesc, setDesc] = useState('');
   const[eventName, setEventName] = useState('');
   const[eventModalVisible, setEventModalVisible] = useState(false);
   const[updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);
   const[date, setDate] = useState(new Date().toString());
   const[displayedEvent, setDisplay] = useState('');
   const[eventList,setEventList]= useState([
       {id:1,
       description:'This is a description',
       startDate: this.generateDates(0),
       endDate:  this.generateDates(1),
       color: 'blue',}
   ]);

   const[refreshing, setRefreshing] = React.useState(false);


    function createEvent(){
        console.log("Hello")
    }

    selectedDate = new Date();

       function createEvent(){
         var eDate = new Date(endDate);
         var sDate = new Date(startDate);
         console.log(eDate);
         console.log(sDate);

        var newEvent = {
          id: eventList.length +1,
          description: eventDesc,
          startDate: sDate,
          endDate: eDate,
          color: 'blue',
        };
        eventList.push(newEvent);
       }

       function showEvent(event){
         setDisplay(event);
         setEventModalVisible(true);
       }



    const getInfo = () => {
        //Get info from Server(Name, Email, School, Major, and Schedule)
        //go to https://facebook.github.io/react-native/docs/network for example
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
            setUpdateInfoModalVisible(true);
    };


    return (
        <ScrollView>
            <View style = {styles.row}>
                <Text style = {styles.item}>Username</Text>
                <Text style = {styles.info}>{username}</Text>
            </View>
            <View style = {styles.row}>
                <Text style = {styles.item}>Name</Text>
                <Text style = {styles.info}>{name}</Text>
            </View>
            <View style = {styles.row}>
                <Text style = {styles.item}>Email</Text>
                <Text style = {styles.info}>{email}</Text>
            </View>
            <View style = {styles.row}>
                <Text style = {styles.item}>Major</Text>
                <Text style = {styles.info}>{major}</Text>
            </View>
            <View style = {styles.row}>
                <Text style = {styles.item}>School</Text>
                <Text style = {styles.info}>{school}</Text>
            </View>
            <View style={styles.scheduleDisplay}>
                <SearchModal visible={eventModalVisible} setEventModalVisible={setEventModalVisible} displayedEvent={displayedEvent}/>
                <WeekView id="weekView" onEventPress={(event)=>showEvent(event)} selectedDate={new Date()} numberOfDays={3} headerStyle={styles.headerStyle} locale='fr' events={eventList}>
                </WeekView>
            </View>
            <View style = {styles.addEventView}>
                <Text style={styles.addEventText}>Add Event to Schedule</Text>
                <Input placeholder="Event Title" value={eventName} onChangeText={text => setEventName(text)} style={styles.inputStyle}/>
                <DatePicker customStyles={{
                    datePicker: { backgroundColor: '#222'  },
                    datePickerCon: { backgroundColor: '#333' },
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    },
                    dateText: {
                        color: 'black'
                    },
                    // ... You can check the source to find the other keys.
                }} style={styles.datePicker} date={startDate} mode='datetime' placeholder={date} format="YYYY-MM-DD HH:mm" minDate={new Date()} maxDate="2020-12-31 23:59" onDateChange={date=>setStartDate(date)} confirmBtnText ='Confirm' cancelBtnText='Cancel'/>
                <DatePicker customStyles={{
                    datePicker: { backgroundColor: '#222'  },
                    datePickerCon: { backgroundColor: '#333' },
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    },
                    dateText: {
                        color: 'black'
                    },
                    // ... You can check the source to find the other keys.
                }} style={styles.datePicker} date={endDate} mode='datetime' placeholder={date} format="YYYY-MM-DD HH:mm" minDate={new Date()} maxDate="2020-12-31 23:59" onDateChange={date=>setEndDate(date)} confirmBtnText ='Confirm' cancelBtnText='Cancel' />
                <Input placeholder="Add event description here" value={eventDesc} style={styles.addEventText} onChangeText = {text => setDesc(text)}/>
                <Button style={{marginTop:30}} status='danger' size="large" onPress={() => createEvent()}>Add Event</Button>
            </View>
            <View>
                <SearchModal2 visible={updateInfoModalVisible} setUpdateInfoModalVisible={setUpdateInfoModalVisible} username={username} name={name} email={email} major={major} school={school} setUsername={setUsername} setName={setName} setEmail={setEmail} setMajor={setMajor} setSchool={setSchool}/>
                <Button style={{marginTop: 30}} status="danger" size= "large" onPress={() => {getInfo()}}>Update Personal Info</Button>
            </View>
        </ScrollView>
    );
}

SettingsScreen.navigationOptions = {
    title: 'Profile',

};
const styles = StyleSheet.create({
    datePicker:{
        flex: 1,
        width: 200
    },
    inputStyle:{
        textAlign: 'center'
    },
    addEventView:{
        borderColor: "red",
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 30,
        backgroundColor: '#4286f4'
    },
    addEventText:{
        textAlign: 'center',
        fontSize: 20
    },
    headerStyle:{
        backgroundColor: '#4286f4'
    },
    row:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        borderRadius:4,
        borderWidth: 1,
        marginTop:30,
        backgroundColor: '#4286f4'
    },
    item:{
        textAlign: 'center',
        flex:1,
        fontSize: 30,
        color: '#fff'
    },
    info:{
        textAlign: 'center',
        flex:1,
        fontSize: 10,
        color:'#fff'
    },
    scheduleDisplay:{
        borderColor: "red",
        borderRadius:4,
        borderWidth: 1,
        height: 400,
        marginTop: 30
    }
});
