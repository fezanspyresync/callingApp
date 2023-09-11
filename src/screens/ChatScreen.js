// import {View, Text, TextInput, Platform} from 'react-native';
// import React, {useEffect, useState, Alert} from 'react';
// import {usePubSub} from '@videosdk.live/react-native-sdk';
// import Cancel from 'react-native-vector-icons/Entypo';
// import Send from 'react-native-vector-icons/Ionicons';
// import {colors} from '../constants/colors';

// export default function ChatScreen({chatModalHideHandler, participantsArrId}) {
//   console.log('participantsArrId', participantsArrId);
//   const {publish, messages} = usePubSub('CHAT', {onOldMessagesReceived});
//   const [uniqueId, setUniqueId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const sendMessage = () => {
//     if (messageInput) {
//       const message = messageInput;
//       publish(message, {persist: true});

//       setMessageInput('');
//     } else {
//       console.log('empty');
//     }
//   };
//   const pullCurrentId = () => {
//     const currentAddObject = messages[-1];
//     setUniqueId(currentAddObject?.senderId);
//   };
//   function onOldMessagesReceived(messages) {
//     setReceivedMessages(messages);
//   }
//   console.log('send messages', messages);
//   console.log('received messages', receivedMessages);
//   useEffect(() => {
//     pullCurrentId();
//   }, [messages.length]);
//   console.log(uniqueId);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.white,
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         bottom: 0,
//         zIndex: 1,
//       }}>
//       <View>
//         <Text
//           onPress={() => chatModalHideHandler()}
//           style={{marginTop: 10, marginHorizontal: 5, textAlign: 'right'}}>
//           <Cancel name="circle-with-cross" size={30} color={colors.blue} />
//         </Text>
//       </View>
//       <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: 10}}>
//         <View style={{paddingBottom: 50}}>
//            {/* sender view */}
//            {messages.length > 0 &&
//             messages.map((data, index) => {
//               return data.senderId === participantsArrId[0] ? (
//                 <View
//                   key={index}
//                   style={{alignItems: 'flex-end', paddingHorizontal: 10,}}>
//                   <View
//                     style={{
//                       maxWidth: '60%',
//                       backgroundColor: colors.blue,
//                       marginBottom: 10,
//                       padding: 10,
//                       borderRadius: 15,
//                     }}>
//                     <Text style={{color: colors.white}}>{data.message}</Text>
//                   </View>
//                 </View>
//               ) : null;
//             })}
//           {/* receiver view */}
//           {receivedMessages.length > 0 &&
//             receivedMessages.map((data, index) => {
//               return data?.senderId !== participantsArrId[0] ? (
//                 <View key={index} style={{paddingHorizontal: 10}}>
//                  <View
//   style={{
//     maxWidth: '60%',
//     backgroundColor: colors.blue,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 15,
//     alignSelf: 'flex-start', // Add this line for iOS compatibility
//   }}>
//   <Text style={{ color: colors.white }}>{data.message}</Text>
// </View>
//                 </View>
//               ) : null;
//             })}

//         </View>
//         <View
//           style={{
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             // position:"absolute",
//             // bottom:10,
//             // backgroundColor:"blue"
//           }}>
//           <TextInput
//             placeholder="Enter message"
//             value={messageInput}
//             onChangeText={setMessageInput}
//             style={{
//               backgroundColor: colors.white,
//               width: '80%',
//               borderRadius: 20,
//               paddingHorizontal: 20,
//               borderColor: colors.blue,
//               borderWidth: 2,
//               height:50
//             }}
//           />
//           <Send
//             name="send"
//             color={colors.blue}
//             size={35}
//             onPress={sendMessage}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { usePubSub } from '@videosdk.live/react-native-sdk';
import Cancel from 'react-native-vector-icons/Entypo';
import Send from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ChatScreen({ chatModalHideHandler, participantsArrId }) {
  const { publish, messages } = usePubSub('CHAT', { onOldMessagesReceived });
  const [messageInput, setMessageInput] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const yourRef = useRef(null);

  function onOldMessagesReceived(messages) {
    setReceivedMessages(messages);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const scrollToBottom = () => {
    if (yourRef.current) {
      yourRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (messageInput) {
      const message = messageInput;
      publish(message, { persist: true });
      setMessageInput('');
    } else {
      console.log('empty');
    }
  };

  // Filter out messages with duplicate IDs
  const filteredMessages = messages.filter((message) => {
    return !receivedMessages.some((receivedMessage) => receivedMessage.id === message.id);
  });

  const renderMessageItem = ({ item }) => {
    const isSender = item.senderId === participantsArrId[0];
    return (
      <View
        style={[styles.message, isSender ? styles.messageSend : styles.messageReceived]}
      >
        <View
          style={[styles.messageContainer, isSender ? styles.messageContainerSenderColor : styles.messageContainerReceiverColor]}
        >
          <Text style={isSender ? styles.messageContainerSenderTextColor : styles.messageContainerReceiverTextColor}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View >
        <Text
          onPress={() => chatModalHideHandler()}
          style={styles.cancelBtnStyle}
        >
          <Cancel name="circle-with-cross" size={30} color={colors.blue} />
        </Text>
      </View>
      <View style={styles.flatListContainerStyle}>
        <FlatList
          ref={yourRef}
          data={receivedMessages.concat(filteredMessages)}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id.toString()}
          onContentSizeChange={scrollToBottom} // Automatically scroll to bottom on content size change
          // inverted={true}
        />
      </View>

      <View
        style={styles.sendMessageInputContainer}
      >
        <TextInput
          placeholder="Enter message"
          value={messageInput}
          onChangeText={setMessageInput}
          style={styles.textInputStyle}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Send name="send" color={colors.blue} size={35} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  message: {
    paddingHorizontal: 10,
  },
  messageSend: {
    alignItems: 'flex-end',
  },
  messageReceived: {
    alignItems: 'flex-start',
  },
  messageContainer: {
    maxWidth: '60%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContainerSenderColor: {
    backgroundColor: colors.blue,
  },
  messageContainerReceiverColor: {
    backgroundColor: colors.white,
  },
  messageContainerSenderTextColor: {
    color: colors.white,
  },
  messageContainerReceiverTextColor: {
    color: colors.black,
  },
  keyboardAvoidStyle: {
    flex: 1, backgroundColor: colors.white,
  },
  cancelBtnStyle: {
    marginTop: 10, marginHorizontal: 5, textAlign: 'right',
  },
  flatListContainerStyle: {
    flex: 1, justifyContent: 'flex-end', paddingVertical: 10,
  },
  sendMessageInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textInputStyle: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderColor: colors.blue,
    borderWidth: 2,
    height: 50,
  },
});
