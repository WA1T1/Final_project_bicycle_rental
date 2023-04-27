import React from 'react';
import classes from "./SelectableList.module.css";

const SelectableList = ({label, data, onChange, defaultValue}) => {
    const renderLabel = () => label && <label className={classes.label}>{ label }</label>

    return (
        <div className={classes.container}>
            {renderLabel()}
            <select onChange={onChange} defaultValue={defaultValue} className={classes.select} name={'test'}>
                {data.map((item)=> <option value={item.key} key={item.key}>{item.value}</option>)}
            </select>
        </div>
    );
};

export default SelectableList;