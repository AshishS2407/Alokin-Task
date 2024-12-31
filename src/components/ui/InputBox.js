import React from 'react';
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
    const { value, priority, dueDate, handleChange, handleKeyUp, handlePriorityChange, handleDueDateChange } = props;
  
    return (
      <div>
        <input
          autoFocus
          type="text"
          className="form-control add-todo"
          value={value}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          placeholder="Add New"
        />
  
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="form-control mt-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
  
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="form-control mt-2"
        />
      </div>
    );
  }
  

export default enhance(InputBox);
