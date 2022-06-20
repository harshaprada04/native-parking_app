import "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Context } from "../../Context/ContextProvider";
import ParkingLot from "./ParkingLot";

describe("Parking Lot is empty",()=>{
jest.setTimeout(10000);
const contexts:any ={
    parkingLotDia:
       [ 
        {id:0,
        isBooked:true,
        checkIn:"",
        checkOut:"",
        parkingSpaceNumber:"",
        vehicleNo:""}
        ,
        {id:1,
        isBooked:false,
        checkIn:"",
        checkOut:"",
        parkingSpaceNumber:"",
        vehicleNo:""}
    ],
    setParkingLotDia:jest.fn()
}

test("render without crash",()=>{
    const test = render(<ParkingLot/>)
})

test("VD btn has press event",async ()=>{
    const test = render(<Context.Provider value = {contexts}><ParkingLot/></Context.Provider>);
    const  btn = test.getByTestId('VD-update')
    fireEvent.press(btn);
    await new Promise((r)=>setTimeout(r,4000));
    
    let backBtn = test.getByTestId("back_btn");
    fireEvent.press(backBtn);
    
    fireEvent.press(btn);
    await new Promise((r)=>setTimeout(r,4000));
    
    const input = test.getByTestId("parking-drawing-registration-input")
    expect(input).toBeDefined();

    fireEvent.changeText(input,"111");
    const vdSubmitBtn = test.getByTestId('parking-drawing-add-carbutton')
    fireEvent.press(vdSubmitBtn);

    const checkOutBtn = test.getByTestId('parking-drawing-registered-0')
    fireEvent.press(checkOutBtn)
})
})

describe("Parking Lot is full",()=>{
jest.setTimeout(10000);
const contexts:any ={
    parkingLotDia:
       [ 
        {id:0,
        isBooked:true,
        checkIn:new Date(),
        checkOut:"",
        parkingSpaceNumber:"1",
        vehicleNo:"111"}
    ],
    setParkingLotDia:jest.fn()
}

test("toast msg",async ()=>{
    const test = render(<Context.Provider value = {contexts}><ParkingLot/></Context.Provider>);
    const  btn = test.getByTestId('VD-update')
    fireEvent.press(btn);
    await new Promise((r)=>setTimeout(r,4000));
    
    const vdSubmitBtn = test.getByTestId('parking_lot_full')
    fireEvent.press(vdSubmitBtn)

    const checkOutBtn = test.getByTestId('parking-drawing-registered-0')
    fireEvent.press(checkOutBtn)
})
})
