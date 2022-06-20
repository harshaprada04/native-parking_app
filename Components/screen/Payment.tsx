
import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../../Context/ContextProvider';

function Payment({navigation,route}:any) {
    const contexts = useContext(Context);


    const checkOutHandler = async ()=>{
        const id = await route.params.id;
        await contexts.setParkingLotDia(contexts.parkingLotDia.map((data:any,index:number)=>{
            if(data.id === id){
                return{
                    ...data,
                    isBooked:false,
                    checkIn:"",
                    checkOut:"",
                    parkingSpaceNumber:"",
                    vehicleNo:""
                }
            }
            else{
                return data;
            }
        }))
        navigation.navigate("ParkingLot")
    }
    return (
        <View style = {styles.alignment}>
            <Text>Payment has been done</Text>
            <Button 
            testID='payment-button'
            uppercase={false}
            style={styles.btn}
            mode='contained'
            onPress={()=>{
                checkOutHandler()
            }}>Home</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    alignment:{
         flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn:{
        top:30
    }
})

export default  Payment;