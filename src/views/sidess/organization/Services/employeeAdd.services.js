import {React} from "react";
import Axios from "axios";
import "../employee/employeeAdd.js"


// export function Common() {
//     Axios.get('http://localhost:4000/api/user/list')
//         .then(res => {
//             console.log(res,"res");
//             return res;
//         })
// }


export async function users() {
    try {
        const res = await Axios.get('http://localhost:4000/api/user/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}













