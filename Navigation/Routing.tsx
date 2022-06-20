import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../Components/screen/HomePage";
import ParkingLot from "../Components/screen/ParkingLot";
import CheckOut from "../Components/screen/CheckOut";
import Payment from "../Components/Payment";
import { NavigationContainer } from "@react-navigation/native";
import ContextProvider from "../Context/Context";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack: any = createNativeStackNavigator();

function Routing() {
  return (
  
     <ContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ParkingLot" component={ParkingLot} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
    </ContextProvider> 
   
  );
}

export default Routing;
