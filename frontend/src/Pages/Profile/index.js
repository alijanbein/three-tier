import React, { useContext, useEffect, useState } from 'react'
import TaskTable from '../../components/Table'
import UseHttp from "../../hooks/http-hook"
import AuthContext from '../../context/authContext'
const Profile = () => {
    const [isLoading, error, sendRequest] = UseHttp()
    const [data,setData] = useState([])
    const auth = useContext(AuthContext)
    useEffect(() =>{
        const fetchData = async () => {
            const response = await sendRequest('user/get_user_tasks',"GET",null,{
                authorization: "Bearer "+ auth.token
            })
            console.log(response);
            setData(response.tasks)
        }
        fetchData()
    },[])
    console.log(data);
  return (
        <div className='profile'>
            {data && <TaskTable data ={data}/>}
        </div>
    )
}

export default Profile