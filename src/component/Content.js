import React, { useState } from 'react'
import Listitem from './Listitem';

const Content = ({items,handldel,handlechg}) => {
  
  return (
    <main>
        <ul>
          {items.map(item => 
            (
              <Listitem
              key={item.id}
              item={item}
              handldel={handldel}
              handlechg ={handlechg}
              />
            )
          )}
        </ul>
    </main>
  )
}

export default Content