import React from 'react'

const Header = ({title}) => {
  return (
    <header style={{padding:"10px"}}>
      <h1 style={{textAlign:"center",width:"100%"}}>{title}</h1>
    </header>
  )
}

export default Header
