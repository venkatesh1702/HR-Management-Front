import { React } from "react";
import Axios from "axios";
import '../leaveApply';


export async function leavetype() {
    try {
        const res = await Axios.get('http://localhost:4000/api/leavetype/list')
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

