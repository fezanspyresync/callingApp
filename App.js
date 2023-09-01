import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "./src/api";
import JoinScreen from "./src/screens/JoinScreen";
import MeetingView from "./src/components/MeetingView";

export default function App() {
  
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingId = async (id) => {
    const meetingId = id == null ? await createMeeting({ token }) : id;
    setMeetingId(meetingId);
  };

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
    flex: 1, backgroundColor: "#F6F6FF"
  }
})