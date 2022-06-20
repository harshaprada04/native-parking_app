import "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import HomePage from "./screen/HomePage";

jest.setTimeout(10000)
test("render",async ()=>{
    const test = render(<HomePage/>);
    const input = test.getByTestId("Parking-create-text-input");
    fireEvent.changeText(input,'1')
    await new Promise((r)=>setTimeout(r,3000))
    expect(input).toBeDefined()
    let btn = test.getByTestId('Parking-create-submit-button');
    expect(btn).toBeDefined()
    fireEvent.press(btn)
})