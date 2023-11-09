import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, Icon } from '@rneui/themed';
import SadhanaData from "../models/SadhanaData";
import { useEffect, useState } from "react";
import commonStyles from '../styles/commonStyles';

interface SadhanaModalProps {
  isVisible: boolean;
  sadhanaData: SadhanaData;
  confirmModal: (sadhanaData: SadhanaData) => void;
  closeModal: () => void;
}

const SadhanaModal: React.FC<SadhanaModalProps> = ({
  isVisible,
  sadhanaData,
  confirmModal,
  closeModal,
}) => {
  const [localSadhanaData, setLocalSadhanaData] = useState<SadhanaData>(sadhanaData);

  const handleChange = (value: string, attrName: string) => {
    console.log(localSadhanaData);
    setLocalSadhanaData({
      ...localSadhanaData,
      [attrName]: value,
    });
  }

  useEffect(() => {
    // If modal is visible, set new sadhana data
    if (isVisible) {
      setLocalSadhanaData(sadhanaData);
    }
  }, [isVisible, sadhanaData]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={closeModal}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {/* <Pressable style={styles.closeButton} onPress={closeModal}>
                <Icon name="close" />
              </Pressable> */}

              {/* <View style={styles.formField}>
                <TextInput
                  style={styles.numericInput}
                  keyboardType="numeric"
                  value={localSadhanaData?.japaRounds ? localSadhanaData.japaRounds.toString() : ''}
                  placeholder="0"
                  onChangeText={(value) => handleChange(value, 'japaRounds')}
                />
                <Text>Japa rounds</Text>
              </View> */}

              <View style={styles.formField}>
                <TextInput
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  style={commonStyles.textArea}
                  value={localSadhanaData?.note || ''}
                  placeholder="Note..."
                  onChangeText={(value) => handleChange(value, 'note')}
                />
              </View>

              <View style={styles.buttonsWrapper}>
                <Button
                  buttonStyle={styles.button}
                  onPress={() => confirmModal(localSadhanaData)}
                >
                  Confirm
                </Button>

                <Button
                  buttonStyle={[styles.button, styles.cancelButton]}
                  color="gray"
                  onPress={closeModal}>
                  Cancel
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 300,
    padding: 15,
    paddingBottom: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Add space between buttons
    gap: 10,
  },
  closeButton: {
    position: "absolute", // Overlay the button
    top: -20, // Adjust the top position as needed
    right: -20, // Adjust the right position as needed
    padding: 5, // Adjust the padding as needed
    borderRadius: 50, // Adjust the border radius as needed
    backgroundColor: 'white'
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: 127,
    elevation: 2,
  },
  buttonConfirm: {
    backgroundColor: '#F194FF',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SadhanaModal;
