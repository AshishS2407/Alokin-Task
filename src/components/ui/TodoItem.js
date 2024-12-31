import React from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');
    console.log("DATA", data)

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={data.completed} onChange={handleChange} />
                    {data.text} - {data.priority} - {data.dueDate ? data.dueDate : 'No due date'}
                </label>
            </div>
        </li>
    );
}
