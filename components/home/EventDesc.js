import Modal from "react-native-modal";
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export default function EventDesc({visible, setEventModalVisible, displayedEvent}){
  const [thisEvent, setEvent] = useState("");

  var sDate =  (new Date(displayedEvent.startDate)).toString();
  sDate = sDate.substr(0,24);
  var eDate = (new Date(displayedEvent.endDate)).toString();
  eDate = eDate.substr(0,24);
  return(
    <Modal
          onSwipeComplete={() => setEventModalVisible(false)}
          swipeDirection="down"
          isVisible={visible}>
          <View style={styles.modal}>
            <View style={styles.exitView}>
              <TouchableOpacity style={styles.clear} onPress={()=>setEventModalVisible(false)}>
                <MaterialIcons style={{marginRight:15}} name="clear" size={30} color='#274BDB'/>
              </TouchableOpacity>
            </View>
            <View style={styles.eventView}>
              <View style={styles.descRow}>
                <Text style={styles.item}>Event Information</Text>
                <Text style={styles.info}>{displayedEvent.description}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.item}>Event Start Time</Text>
                <Text style={styles.info}>{sDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.item}>Event End Time</Text>
                <Text style={styles.info}>{eDate}</Text>
              </View>
            </View>
          </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        width: deviceWidth,
        height: (deviceHeight/3),
        marginLeft: -20,
        marginBottom: -20,
        marginTop: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    eventView: {
      width: deviceWidth,
      height: (deviceHeight/3),
    },
    item:{
        textAlign: 'center',
        flex:1,
        fontSize: 20
    },
    info:{
        textAlign: 'center',
        flex:1,
        fontSize: 15
    },
    exitView:{
      width: deviceWidth,
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'flex-end'

    },
    clear: {
      marginLeft: 10,
      alignItems: 'flex-end',
    },
    row:{
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: '#000000',
      borderRadius:4,
      borderWidth: 1,
      marginTop:30
    },
    descRow:{
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: '#000000',
      borderRadius:4,
      borderWidth: 1,
      marginTop:30
    }
});
