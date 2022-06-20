import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Context } from "../../Context/ContextProvider";

function ParkingLot({ navigation }: any) {
  const [vehicleDetailsModal, setVehicleDetailsModal] =useState<Boolean>(false);
  const [isParkingLotIsFull, setIsParkingLotIsFull] = useState<Boolean>(false);
  const [vehicleNo, setVehicleNo] = useState<string>("");
  const contexts: any = useContext(Context);

  const BookHandler = async () => {
    // const randomId = await contexts.parkingLotDia.findIndex((data: any) => {
    //   return data.isBooked === false;
    // });
    const randomId = await Math.floor(
      Math.random() * contexts.parkingLotDia?.length
    );
    contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any, index: number) => {
        if (index === randomId) {
          return {
            ...data,
            isBooked: true,
            checkIn: new Date(),
            parkingSpaceNumber: randomId,
            vehicleNo: vehicleNo,
          };
        } else {
          return data;
        }
      })
    );
  };

  const vehicleDetailsUpdater = async () => {
    setVehicleNo("");
    const allotedVehicleDetails = await contexts.parkingLotDia.filter(
      (data: any) => {
        return data.isBooked === true;
      }
    );
    if (allotedVehicleDetails.length === contexts.parkingLotDia.length) {
      await setIsParkingLotIsFull(true);
    } else {
      setVehicleDetailsModal(true);
    }
  };

  const checkOutHandler = async (id: number) => {
    await contexts.setParkingLotDia(
      contexts.parkingLotDia.map((data: any, index: number) => {
        if (index === id) {
          return {
            ...data,
            checkOut: new Date(),
          };
        } else {
          return data;
        }
      })
    );
    navigation.navigate("CheckOut", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: vehicleDetailsModal || isParkingLotIsFull ? "none" : "flex",
          flex: 1,
        }}
      >
        <View style={styles.vdBtn}>
          <Button
            testID="VD-update"
            mode="contained"
            uppercase={false}
            onPress={() => {
              vehicleDetailsUpdater();
            }}
          >
            Vehicle Details
          </Button>
        </View>
        <View style={styles.parkingSpaceContainer}>
          <FlatList
            numColumns={3}
            data={contexts.parkingLotDia}
            renderItem={(itemData) => {
              return (
                <View
                  style={styles.parkingSpaceBtn}
                  testID={`parking-drawing-space-${itemData.index}`}
                >
                  <Button
                    testID={`parking-drawing-space-number-${itemData.index}`}
                    style={styles.btn}
                    mode="contained"
                    disabled={itemData.item.isBooked}
                  >
                    {itemData.item.id}
                  </Button>
                  {itemData.item.isBooked && (
                    <Button
                      uppercase={false}
                      testID={`parking-drawing-registered-${itemData.index}`}
                      style={styles.chechOutBtn}
                      color="#FF8886"
                      mode="contained"
                      onPress={() => {
                        checkOutHandler(itemData.item.id);
                      }}
                    >
                      X
                    </Button>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
      {vehicleDetailsModal && (
        <View style={styles.vdContainer}>
          <TextInput
            style={styles.input}
            testID="parking-drawing-registration-input"
            mode="outlined"
            onChangeText={setVehicleNo}
            value={vehicleNo}
            label="Vehicle Number"
          />
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Button
              testID="parking-drawing-add-carbutton"
              uppercase={false}
              style={styles.vdSubmitBtn}
              mode="contained"
              disabled={!vehicleNo}
              onPress={() => {
                BookHandler();
                setVehicleDetailsModal(false);
              }}
            >
              Submit
            </Button>
            <Button
              testID="back_btn"
              uppercase={false}
              style={styles.vdCancelBtn}
              mode="contained"
              color="red"
              onPress={() => {
                setVehicleDetailsModal(false);
              }}
            >
              Back
            </Button>
          </View>
        </View>
      )}
      {isParkingLotIsFull && (
        <View style={styles.parkingFullContainer}>
          <View style={styles.toast}>
            <Text>Parking Lot is Full..</Text>
            <Button
              testID="parking_lot_full"
              mode="text"
              color="red"
              onPress={() => {
                setIsParkingLotIsFull(false);
              }}
            >
              X
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vdBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  parkingSpaceContainer: {
    flex: 5,
    alignItems: "center",
  },
  parkingSpaceBtn: {
    marginLeft: 20,
    marginTop: 20,
  },
  btn: {
    height: 100,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  chechOutBtn: {
    height: 35,
    width: 20,
    marginTop: -35,
  },
  vdContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vdSubmitBtn: {
    top: 30,
    marginRight: -5,
  },
  vdCancelBtn: {
    top: 30,
    marginLeft: 30,
  },
  parkingFullContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toast: {
    backgroundColor: "#ADD8E6",
    position: "relative",
    width: 200,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  input: {
    height: 50,
    width: "50%",
  },
});

export default ParkingLot;
