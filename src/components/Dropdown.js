import React, { useState } from "react";

const Dropdown = ({ data = [], className, name = "data", day }) => {
    const [selected, setSelected] =  useState(day);

    return (
        <>
           <label htmlFor={name}>{`${name[0].toUpperCase()}${name.substring(1)}`}</label> 
           <select className={className} id={name} defaultValue={selected} onChange={e => setSelected(e.target.value)}>
            { data.map((currentVal, i) => <option key={i}>{currentVal}</option>) }
           </select>
        </>
    )
}

export default Dropdown;