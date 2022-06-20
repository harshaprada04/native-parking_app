import "@testing-library/react-native";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Context } from "../../Context/Context";
import CheckOut from "./CheckOut";

describe("render without crash",()=>{
    const route = {params:{id:0}};
const contexts:any = {
    setParkingLotDia:jest.fn(),
    parkingLotDia:[
        {
            id:1,
            isBooked:true,
            checkIn:new Date(),
            checkOut:new Date(),
            parkingSpaceNumber:"1",
            vehicleNo:"KA-20 MB-3123"
        },]
}
jest.setTimeout(10000)
test("render",()=>{
    const test = render(<Context.Provider value={contexts}><CheckOut route={route}/></Context.Provider>);
});
test("Payment button has press event",async()=>{
    const test = render(<Context.Provider value={contexts}><CheckOut route={route}/></Context.Provider>);

   
    
    const btn = await test.getByTestId("deregister-payment-button");
    expect(btn).toBeDefined();
    fireEvent.press(btn);
});
})