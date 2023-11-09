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
    padding: 5,
    height: 28,
  },
  numericInput: {
    width: 30,
    height: 28,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 5,
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