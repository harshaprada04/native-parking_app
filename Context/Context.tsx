import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const Context = createContext({
parkingLotDia:[],
setParkingLotDia:(a:any)=>{},
})
function ContextProvider({children}:any) {
    const [parkingLotDia, setParkingLotDia] = useState();

    const context:any = {
        parkingLotDia,
        setParkingLotDia,
    }
    return (
        <View style={{flex:1}}>
            <Context.Provider value={context}>{children}</Context.Provider>
        </View>

    );
}

export default ContextProvider;