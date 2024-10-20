import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const Sidebar = memo(() => {
  
    const navigate = useNavigate()
  return (
    <div style={{padding: "20px", width: '250px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-start", position: "sticky", top: "0", bottom:"0", backgroundColor: "#16161e", height: "100vh"}}>
        <h2 style={{color: "white", fontSize: "2rem"}}>SIDEBAR</h2>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/products')}>Products</Button>
        <Button onClick={() => navigate('/categories')}>Categories</Button>
    </div>
  )
})

export default Sidebar;