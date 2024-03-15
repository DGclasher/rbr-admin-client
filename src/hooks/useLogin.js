import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import Cookies from "universal-cookie"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axiosInstance from "../axios/axiosConfig"
export const useLogin = () =>{
    const nav = useNavigate()
    const [error, setError] = useState(null)
    
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email, password)=>{
        setIsLoading(true);
        setError(null)
        
        const data={
            'email' : email,
            'password' : password,
        }

        const response = await axiosInstance.post('/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = response.data

        
        if(response.status === 200)
        {
            // Decode the JWT token
            const decodedData = jwtDecode(json.token)
            // Save the decoded data to cookies
            const cookies = new Cookies()
            cookies.set('token', json.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }) //expires in 7 days
            toast.success('Logged in successfully')
            localStorage.setItem('user', JSON.stringify({ ...json.data, type: decodedData.type }));
            
            //update AuthContext
            dispatch({type:'LOGIN', payload: { ...json.data, type: decodedData.type }})
            nav(`/admin/dashboard`)
            setIsLoading(false)
            setError(null)
            
        }
        else
        {
            setIsLoading(false)
            console.log(json.message)
            toast.error('Invalid credentials')
        }
    }
   

    return {login, error, isLoading }
}