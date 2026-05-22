import React from "react";
import { MdDelete } from "react-icons/md";

const Listitem = ({item,handldel,handlechg}) => {
  return (
    <>
      <li className="item">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => handlechg(item.id)}
        />
        <label style={item.checked ? {textDecoration:"line-through"}: null}>{item.item}</label>
        <MdDelete onClick={() => handldel(item.id)} />
      </li>
    </>
  );
};

export default Listitem;
