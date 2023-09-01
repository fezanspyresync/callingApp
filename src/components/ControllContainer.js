import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from './Button';
import Joinicon from 'react-native-vector-icons/Entypo';
import Webcamicon from 'react-native-vector-icons/Feather';
import WebcamCrossicon from 'react-native-vector-icons/Feather';
import Micicon from 'react-native-vector-icons/Feather';
import MicCrossicon from 'react-native-vector-icons/Feather';
import Leaveicon from 'react-native-vector-icons/MaterialIcons';
import Camera from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import { colors } from '../constants/colors';

export default function ControlsContainer({
  join,
  leave,
  toggleWebcam,
  toggleMic,
  participantsArrId,
}) {
  const [toggleWebicon, setToggleWebicon] = useState(true);
  const [toggleMicicon, setToggleMicicon] = useState(true);
  const [togglecamera, setTogglecamera] = useState(false);
  const {changeWebcam, getWebcams} = useMeeting();

  const onPress = async () => {
    // Change Webcam in Meeting
    const webcams = await getWebcams(); // returns all webcams

    const {deviceId, label} = webcams[togglecamera ? 0 : 1]; // 0th : Rear Cam, 1st : Front Cam

    changeWebcam(deviceId);
  };
  // justifyContent:participantsArrId.length===0? "center":'space-evenly',
  return (
    <View
      style={[
        styles.container,
        participantsArrId.length === 0 ? styles.isCenter : styles.isEvenly,
      ]}>
      {participantsArrId.length === 0 ? (
        <Button
          buttonText={'JOIN'}
          onPress={() => {
            join();
          }}
        />
      ) : (
        <>
          <Button
            onPress={() => {
              // toggleWebcam();
              // setToggleWebicon(!toggleWebicon)
              onPress();
              setTogglecamera(!togglecamera);
            }}
            buttonText={'Toggle Webcam'}
            icon={
              <Camera name="camera-reverse-outline" size={30} color={colors.white} />
            }
          />
          <Button
            onPress={() => {
              toggleWebcam();
              setToggleWebicon(!toggleWebicon);
            }}
            icon={
              <WebcamCrossicon
                name={toggleWebicon ? 'video-off' : 'video'}
                size={30}
                color={colors.white}
              />
            }
          />
          <Button
            onPress={() => {
              toggleMic();
              setToggleMicicon(!toggleMicicon);
            }}
            icon={
              <Micicon
                name={toggleMicicon ? 'mic-off' : 'mic'}
                size={30}
                color={colors.white}
              />
            }
          />
          <Button
            onPress={() => {
              leave();
            }}
            buttonText={'Leave'}
            icon={<Leaveicon name="call-end" size={30}color={colors.white} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
  },
  isCenter: {
    justifyContent: 'center',
  },
  isEvenly: {
    justifyContent: 'space-evenly',
  },
});
