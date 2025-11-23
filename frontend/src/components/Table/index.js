import React, { useContext, useState } from 'react'
import "./style.css"
import AuthContext from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import UseHttp from '../../hooks/http-hook'
import EditModal from '../EditModal'
const TaskTable = ({data}) => {
  const [isLoading, error,sendRequest] = UseHttp()
  const [showEditModal,setShoweditModal] = useState(false)
  const [targetData,setTargetData] = useState({})
  const auth = useContext(AuthContext)
  const navigator = useNavigate()
  const deleteHandler = async(id) => {
    const response = await sendRequest(`user/delete_task/${id}`, "DELETE", null, {
      "authorization" : "Bearer "+ auth.token
    });  
    if (response.status == "sucess") {
      window.location.reload()
    }
  }

  const closeHander = () => {
    setShoweditModal(false)
  }

  const openEditModal = (data) =>{
    setShoweditModal(true);
    setTargetData(data);
  }
  
  return (
    <>
    {showEditModal  && targetData && <EditModal onClose = {closeHander} data ={targetData}/>}
    <table>

  <caption>My Task</caption>
  <thead>
    <tr>
      <th scope="col">Project</th>
      <th scope="col">Due Date</th>
      <th scope="col">Amount</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {data.map((item,index) => {
    return  <tr key={index}>
      <td data-label="Account">{item.title}</td>
      <td data-label="Due Date">{item.due_date}</td>
      <td data-label="Amount">{item.amount}</td>
      <td data-label="Action" className='buttons'>
        <button className='edit' onClick={() =>{openEditModal(item)}}>edit</button>
        <button className='delete' onClick={() =>{deleteHandler(item._id)}}> delete</button>
      </td>
    </tr>
   })}
  
  </tbody>
</table>
    </>
  )
}

export default TaskTable