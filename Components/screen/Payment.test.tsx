import "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Context } from "../../Context/ContextProvider";
import Payment from "./Payment";

describe("renders without crash", () => {
  const route = { params: { id: 1 } };
  const contexts: any = {
    setParkingLotDia: jest.fn(),
    parkingLotDia: [
      {
        id: 1,
        isBooked: true,
        checkIn: new Date(),
        checkOut: new Date(),
        parkingSpaceNumber: "1",
        vehicleNo: "KA-20 MB-3123",
      },
      {
        id: 2,
        isBooked: false,
        checkIn: "",
        checkOut: "",
        parkingSpaceNumber: "",
        vehicleNo: "",
      },
    ],
  };
  test("render", () => {
    const text = render(<Payment route={route} />);
  });

  test("Payment btton has press event", () => {
    const text = render(
      <Context.Provider value={contexts}>
        <Payment route={route} />
      </Context.Provider>
    );
    const btn = text.getByTestId("payment-button");
    expect(btn).toBeDefined();
    fireEvent.press(btn);
  });
});
