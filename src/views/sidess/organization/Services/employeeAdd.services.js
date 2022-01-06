import { React } from "react";
import Axios from "axios";
import "../employee/employeeAdd.js"
import DomainPortNumber from "../../domainPortNumber";

export async function users() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/user/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function departments() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/department/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function locations() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/location/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function designations() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/designation/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function employmentTypes() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/employmentType/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function sourceOfHires() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/sourceofhire/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function usersLlist() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/user/list')
        return res.data.data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function clients() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/client/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function projects() {
    try {
        const res = await Axios.get(DomainPortNumber.server + '/api/project/list')
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export async function deleteUser(selectedUserId) {
    try {
        const res = await Axios.delete(DomainPortNumber.server + '/api/user/delete?userId=' + selectedUserId)
        return res;
    } catch (error) {
        console.log(error.message);
    }
}














