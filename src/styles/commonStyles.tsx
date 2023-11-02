import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    height: 40,
  },
  btnLg: {
    height: 40,
  },
  touchableBtnLg: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 3,
  },
  touchableBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default styles;