import React, { useContext, useEffect, useState } from 'react';
import { Text, View , StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { postData } from '../../action/postApi';
import { Context } from '../../Context/ContextProvider';

function CheckOut({navigation,route}:any) {
    const [currentVehicle, setCurrentVehicle] = useState<any>({})
    const [amount, setAmount] = useState<number>()
    const contexts = useContext(Context);
    

    const paymentUpdater = async()=>{
        const id:number = await route.params.id;
        setCurrentVehicle(contexts.parkingLotDia[id]);
        let checkIn:any = await contexts.parkingLotDia[id]["checkIn"];
        console.log(checkIn)
        let checkOut:any = await contexts.parkingLotDia[id]["checkOut"];
        const timeDifference = Math.ceil((checkOut.getTime()-checkIn.getTime())/(1000*60*60));
        if(timeDifference<=2){
            setAmount(10)
        }
        else{
            setAmount(10+(timeDifference-2)*10)
        }

    }

    const paymentGateWay = async (id:number)=>{
           await postData(currentVehicle);
           navigation.navigate("Payment",
           {
            id,
           })
    }

    useEffect(()=>{
        paymentUpdater();
    },[])
   
    return (
        <View style ={styles.container}>
       
        <View style ={styles.alignment}>
            <Text style={styles.text}>Vehicle Number : {Object.keys(currentVehicle).length>0?currentVehicle.vehicleNo:"loading"}</Text>
            <Text style={styles.text}>Parking Space Number : {Object.keys(currentVehicle).length>0?currentVehicle.parkingSpaceNumber:"loading"} </Text>
            <Text style={styles.text} testID='deregister-time-spent'>Check-In : {Object.keys(currentVehicle).length>0?currentVehicle.checkIn.toString():"loading"} </Text>
            <Text style={styles.text} testID='deregister-time-spent'>Check-Out : {Object.keys(currentVehicle).length>0?currentVehicle.checkOut.toString():"loading"}</Text>
            <Text style={styles.text} testID='deregister-charge'>Amount : ${amount} </Text>
            <Button 
            testID ='deregister-payment-button'
            style={styles.btn}
            mode='contained' 
            onPress={()=>{
               paymentGateWay(currentVehicle.id)
            }}>Pay ${amount}</Button>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent: 'center',
    },
    alignment:{
         flex:1,
        
         justifyContent: 'center',
         marginLeft:15
    },
    text:{
        marginTop:15
    },
    btn:{
        width:150,
        top:30
    }
})

export default CheckOut;