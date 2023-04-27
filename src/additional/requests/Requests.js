import {Gateway, Method} from "../Gateway/Gateaway";

export function SignUpRequest({email, password, clientId, firstName, lastName, approved}) {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', Method.POST, {email, password, clientId, firstName, lastName, approved}).then((request)=>{return request.data})
}

export function SignInRequest({email, password}) {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', Method.POST, {email, password}).then((request)=>{return request.data})
}

export function AuthRequest() {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/auth/', Method.GET).then((request)=>{return request.data})
}

export function CreateCaseRequest({licenseNumber, ownerFullName, type, color, date, officer, description}) {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/cases/', Method.POST, {licenseNumber, ownerFullName, type, color, date, officer, description}).then((request)=>{return request.data})
}

export function CreateCasePublicRequest({licenseNumber, ownerFullName, type, clientId, color, date, description}) {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/public/report', Method.POST, {licenseNumber, ownerFullName, type, clientId, color, date, description}).then((request)=>{return request.data})
}

export function EditCaseRequest({id, status, licenseNumber, ownerFullName, type, color, date, officer, description, resolution}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, Method.PUT, {status, licenseNumber, ownerFullName, type, color, date, officer, description, resolution}).then((request)=>{return request.data})
}

export function DeleteCaseRequest({id}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, Method.DELETE).then((request)=>{return request.data})
}

export function GetAllCasesRequest() {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/cases/', Method.GET).then((request)=>{return request.data})
}

export function GetOneCaseRequest({id}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, Method.GET).then((request)=>{return request.data})
}

export function CreateOfficerRequest({email, password, firstName, lastName, approved}) {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/officers', Method.POST, {email, password, firstName, lastName, approved}).then((request)=>{return request.data})
}

export function UpdateOfficerRequest({id, password, firstName, lastName, approved}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, Method.PUT, {password, firstName, lastName, approved}).then((request)=>{return request.data})
}

export function DeleteOfficerRequest({id}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, Method.DELETE).then((request)=>{return request.data})
}

export function GetAllOfficersRequest() {
    return Gateway('https://sf-final-project-be.herokuapp.com/api/officers/', Method.GET).then((request)=>{return request})
}

export function GetOfficerRequest({id}) {
    return Gateway(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, Method.GET).then((request)=>{return request.data})
}