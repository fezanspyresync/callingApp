import {RTCView, useParticipant} from '@videosdk.live/react-native-sdk';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from './Button';
import Backicon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

function ParticipantView({participantId}) {
  const {webcamStream, webcamOn, displayName} = useParticipant(participantId);

  return webcamOn && webcamStream ? (
    <View style={styles.webcamOnContainer}>
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={styles.RTCView}
      />
    </View>
  ) : (
    <View style={styles.NOMEDIA}>
      <Text style={styles.NOMEDIAInnerText}>NO MEDIA</Text>
    </View>
  );
}
export default function ParticipantList({participants, setMeetingId}) {
  console.log('array length', participants);
  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({item}) => {
        return <ParticipantView participantId={item} />;
      }}
    />
  ) : (
    <View style={styles.container}>
      {/* <Button onPress={()=>console.log('clicked')} buttonText="back" backgroundColor="black" />
       */}
      <TouchableOpacity onPress={() => setMeetingId(null)} style={styles.backButtonPosition}>
        <Backicon name="arrow-back" size={30} color={colors.blue} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {/* <Image source={{uri:"https://i.ytimg.com/vi/NAN4cCMGCEI/maxresdefault.jpg"}} style={styles.image}/> */}
        <LottieView
          source={require('../../images/animation_lm7ej5g8.json')}
          autoPlay
          loop
          style={styles.image}
        />
      </View>
      <Text style={styles.messageText}>
        Press Join button to enter meeting.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webcamOnContainer: {
    height: 250,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  RTCView: {
    height: 250,
  },
  NOMEDIA: {
    backgroundColor: colors.gray,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  NOMEDIAInnerText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  imageContainer: {
    height: 300,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  backButtonPosition: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  messageText: {
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
    color: colors.black,
  },
});
