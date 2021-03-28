import { API_HOST } from "../utils/constants";
import axios from 'axios';

export function getStudents(limit, offset){
    const URL = `${API_HOST}/getStudents?limit=${limit}&offset=${offset}`

    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    return axios.get(URL, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })

}

export function getStudentDetails(ObjID){
    const URL = `${API_HOST}/getStudentsDetails/${ObjID}`

    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    return axios.get(URL, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })

}

export function createStudent(request){
    const URL = `${API_HOST}/createStudent`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    return axios.post(URL, request, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })

}

export function updateStudent(request,ObjId){
    const URL = `${API_HOST}/updateStudent`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    const updateData = {
        id: ObjId,
        FirstName: request.FirstName,
        LastName: request.LastName,
        BirthDate: request.BirthDate,
        Email: request.Email,
        Addres: request.Addres,
        Gender: request.Gender 
    }
    

    return axios.put(URL, updateData, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })

}

export function deleteStudent(ObjID){
    const URL = `${API_HOST}/deleteStudent/${ObjID}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    return axios.delete(URL, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })

}

export function getTotalDocuments(){
    const URL = `${API_HOST}/getTotalDocuments`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
        },
    };

    return axios.get(URL, params )
    .then(res => {
        return res.data;
    })
    .catch(err =>{
        console.log(err)
    })
}