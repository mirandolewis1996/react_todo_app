import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
       <h5>&copy; {year}</h5>
    </footer>
  )
}

export default Footer