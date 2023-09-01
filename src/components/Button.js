import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { colors } from '../constants/colors';

export const Button = ({onPress, buttonText, backgroundColor, icon}) => {
  // width:buttonText==='JOIN'?'100%':null,

  console.log(buttonText)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        buttonText === 'JOIN' ? styles.btnContainerJoin:null,
        buttonText === 'Leave' ? styles.btnLeave:null,
      ]}>
      {icon === undefined ? (
        <Text
          style={[styles.btnText, buttonText === 'JOIN' && styles.joinBtnText]}>
          {buttonText}
        </Text>
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 100,
    width: null,
  },
  btnLeave:{
    backgroundColor: colors.error,
  },
  btnContainerJoin: {
    width: '100%',
  },
  btnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: null,
  },
  joinBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
