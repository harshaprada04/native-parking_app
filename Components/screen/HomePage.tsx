import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Context } from "../../Context/ContextProvider";

function HomePage({ navigation }: any) {
  const [space, setSpace] = useState<string>("");
  const contexts = useContext(Context);

  const parkingSpaceCreater = async () => {
    let array = [];
    for (let i = 0; i < parseInt(space); i++) {
      let object = {
        id: i,
        isBooked: false,
        checkIn: "",
        checkOut: "",
        parkingSpaceNumber: "",
        vehicleNo: "",
      };
      await array.push(object);
    }
    await contexts.setParkingLotDia(array);
    navigation.navigate("ParkingLot");
  };

  return (
    <View style={styles.alignment}>
      <TextInput
        style={styles.input}
        testID="Parking-create-text-input"
        keyboardType="number-pad"
        autoComplete="off"
        mode="outlined"
        label="Space"
        onChangeText={setSpace}
        value={space}
      />
      <Button
        testID="Parking-create-submit-button"
        uppercase={false}
        style={styles.btn}
        mode="contained"
        onPress={() => {
          parkingSpaceCreater();
        }}
        disabled={!space}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  alignment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "50%",
  },
  btn: {
    top: 30,
  },
});

export default HomePage;
