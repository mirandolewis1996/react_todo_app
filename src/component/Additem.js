import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa';

const Additem = ({aditm,setAditm,handlesubmit}) => {
    const inpref = useRef()
  return (
    <form className='addForm' onSubmit={handlesubmit}>
            <label htmlFor='addItem'>Add Item</label>
            <input
                autoFocus
                id='addItem'
                type='text'
                ref={inpref}
                placeholder='Add Item'
                required
                value={aditm}
                onChange={(e) => setAditm(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                onClick={()=>inpref.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
  )
}

export default Additem
