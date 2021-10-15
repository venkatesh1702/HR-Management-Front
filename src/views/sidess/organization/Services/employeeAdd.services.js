import { React } from "react";
import Axios from "axios";
import "../employee/employeeAdd.js"


export async function users() {
    try {
        const res = await Axios.get('http://localhost:4000/api/user/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function departments() {
    try {
        const res = await Axios.get('http://localhost:4000/api/department/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function locations() {
    try {
        const res = await Axios.get('http://localhost:4000/api/location/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function designations() {
    try {
        const res = await Axios.get('http://localhost:4000/api/designation/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function employmentTypes() {
    try {
        const res = await Axios.get('http://localhost:4000/api/employmentType/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function sourceOfHires() {
    try {
        const res = await Axios.get('http://localhost:4000/api/sourceofhire/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function usersLlist() {
    try {
        const res = await Axios.get('http://localhost:4000/api/user/list')
        return res.data.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function clients() {
    try {
        const res = await Axios.get('http://localhost:4000/api/client/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function projects() {
    try {
        const res = await Axios.get('http://localhost:4000/api/project/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function deleteUser(selectedUserId) {
    try {
        const res = await Axios.delete('http://localhost:4000/api/user/delete?userId=' + selectedUserId)
        return res;
    } catch (error) {
        console.log(error.message);
    }
}














