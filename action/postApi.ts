import axios from "axios";

const postAPI = axios.create({
    baseURL:"https://httpstat.us/200"
});

export function postData (currentVehicle:any){
    const data = JSON.stringify({vehicle_details: currentVehicle});
    postAPI.post("/vehicle_details",data);
}