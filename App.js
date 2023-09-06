import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from "@videosdk.live/react-native-sdk";

import JoinScreen from "./src/screens/JoinScreen";
import MeetingView from "./src/components/MeetingView";
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { colors } from "./src/constants/colors";
import { createMeeting, token } from "./src/services/api";

export default function App() {
  
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingId = async (id) => {
    const meetingId = id == null ? await createMeeting({ token }) : id;
    setMeetingId(meetingId);
  };
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      console.log('hide me');
    }, 1000);
  }, []);
  return meetingId ? (
    <SafeAreaView style={styles.container}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: "Test User",
        }}
        token={token}
      >
        <MeetingView setMeetingId={setMeetingId} />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId}  />
  );
}

const styles=StyleSheet.create({
  container:{
    flex: 1, backgroundColor: colors.white
  }
})