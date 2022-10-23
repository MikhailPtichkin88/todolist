import {instance} from "./instance";
import {ResponseType} from "./todolist-api";

export type LoginDataType={
    email:string
    password: string
    rememberMe?: boolean
   captcha?:boolean
}

export const authApi = {
    me() {
        return instance.get<ResponseType<{id:number,email:string,login:string}>>(`/auth/me`)
    },
    login(data:LoginDataType) {
        return instance.post<ResponseType<{userId:number}>>(`/auth/login`,data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>(`/auth/login`)
    }
}