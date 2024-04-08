import React from 'react'
import { useSelector } from 'react-redux';


function SubAdminDashboard() {
    const {sub_admin} = useSelector(state=> state.role)
  return (
    <div>
      Sub admin dashboard
      <div>
        <h1> Assigned category : {sub_admin.assignedCategory}</h1>
      </div>
      <div>
        <p>Tags: {sub_admin.tags[0]}</p>
        <p>Tags: {sub_admin.tags[1]}</p>
        <p>Tags: {sub_admin.tags[2]}</p>
      </div>
    </div>
  )
}

export default SubAdminDashboard;
