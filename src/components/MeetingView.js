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

export default function MeetingView({setMeetingId}) {
  const {join, leave, toggleWebcam, toggleMic, meetingId, participants} = useMeeting({});
  const participantsArrId = [...participants.keys()];
  return (
    <View style={styles.container}>
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
        participantsArrId={participantsArrId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    fontSize: 18,
    padding: 12,
  },
  fontID: {
    fontWeight: 'bold',
  },
});
