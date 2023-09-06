import {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors} from '../constants/colors';

export default function JoinScreen(props) {
  const [meetingVal, setMeetingVal] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [error, errorHandler] = useState(false);
  const inputRef = useRef(null);

  const idHandler = id => {
    setMeetingVal(id);
    errorHandler(false);
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.textContainer}>
          <Image source={require("../assets/images/meetup.png")} resizeMode='contain' style={styles.logo} />
        </View>
        <View style={[styles.toggleBtnContainer]}>
          <TouchableOpacity
            onPress={() => {
              setActiveTab(0);
            }}
            style={[
              styles.tab0Actve,
              activeTab !== 0 && styles.tab0UnActve,
              {borderRightWidth: activeTab === 1 ? 0 : 1},
            ]}>
            <Text
              style={[
                styles.createActiveText,
                activeTab !== 0 && styles.createUnActiveText,
              ]}>
              CREATE MEETING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab1UnActive,
              activeTab === 1 && styles.tab1Active,
              {
                borderLeftWidth: activeTab === 0 ? 0 : 1,
              },
            ]}
            onPress={() => {
              setActiveTab(1);
            }}>
            <Text
              style={[
                styles.joinUnActiveText,
                activeTab === 1 && styles.joinActiveText,
              ]}>
              JOIN MEETING
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../assets/images/animation_llxfre4g.json")}
            style={styles.image}
          />
        </View>

        {activeTab == 1 ? (
          <>
            <TextInput
              value={meetingVal}
              ref={inputRef}
              onChangeText={idHandler}
              placeholder={'XXXX-XXXX-XXXX'}
              style={styles.input}
            />
            {error && <Text style={styles.error}>Please enter the meeting id*</Text>}
          </>
        ) : null}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (activeTab == 0) {
              props.getMeetingId();
            } else {
              if (meetingVal) {
                props.getMeetingId(meetingVal);
                return;
              } else {
                errorHandler(true);
              }
            }
          }}>
          <Text style={[styles.btnText]}>
            {activeTab === 0 ? 'Create' : 'Join'}
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    marginTop: "10%"
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding:20,
  
  },
  meetText: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
  toggleBtnContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 10,
  },
  tab0Actve: {
    padding: 12,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    width: '50%',

    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.blue,
  },
  tab0UnActve: {
    borderColor: colors.gray,
  },
  tab1UnActive: {
    padding: 12,

    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    width: '50%',
    borderColor: colors.gray,
  },
  tab1Active: {
    borderColor: colors.blue,
  },
  createActiveText: {
    color: colors.blue,
    alignSelf: 'center',
    fontSize: 14,
  },
  createUnActiveText: {
    color: colors.gray,
  },
  joinUnActiveText: {
    color: colors.gray,
    alignSelf: 'center',
    fontSize: 14,
  },
  joinActiveText: {
    color: colors.blue,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    fontStyle: 'italic',
    marginTop: 30,
    color:colors.black
  },
  error: {
    color: colors.error,
    marginTop: 4,
    fontStyle: 'italic',
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.blue,
    marginTop: 20,
    backgroundColor: colors.blue,
  },
  btnText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 18,
  },
  lottieContainer: {
    height: 250,
    marginTop: 1,
    backgroundColor: colors.white,
  },
});
