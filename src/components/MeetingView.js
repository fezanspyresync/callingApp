import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ControlsContainer from './ControllContainer';
import ParticipantList from './ParticipantList';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import { colors } from '../constants/colors';
import { useState } from 'react';
import ChatScreen from '../screens/ChatScreen';

export default function MeetingView({setMeetingId}) {
  const {join, leave, toggleWebcam, toggleMic, meetingId, participants} = useMeeting({});
  const [showChat,setShowChat]=useState(false)
  const chatModalHandler=()=>{
    setShowChat(true);
  }
  const chatModalHideHandler=()=>{
    setShowChat(false);
  }

  const participantsArrId = [...participants.keys()];
  return !showChat? (
    <SafeAreaView style={styles.container}>
      {meetingId ? (
        <Text style={styles.font}>
          <Text style={styles.fontID}>Meeting Id</Text>: {meetingId}
        </Text>
      ) : null}
      <ParticipantList
        setMeetingId={setMeetingId}
        participants={participantsArrId}
      />
     
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
        chatModalHandler={chatModalHandler}
        participantsArrId={participantsArrId}
      />
    </SafeAreaView>
  ):<ChatScreen chatModalHideHandler={chatModalHideHandler} participantsArrId={participantsArrId} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  font: {
    fontSize: 18,
    padding: 12,
  },
  fontID: {
    fontWeight: 'bold',
  },
});
