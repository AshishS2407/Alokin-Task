import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import { getAll, addToList, updateStatus } from '../../services/todo';

class StateProvider extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      mode: MODE_CREATE,
      filter: FILTER_ALL,
      list: getAll(),
      priority: 'Medium',
      dueDate: '',  
    };
  }

  render() {
    let children = wrapChildrenWith(this.props.children, {
      data: this.state,
      actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'changePriority', 'changeDueDate']),
    });

    return <div>{children}</div>;
  }

  addNew(text) {
    const { priority, dueDate } = this.state; 
    console.log('Adding new Todo with Due Date:', dueDate);  
    let updatedList = addToList(this.state.list, { text, completed: false, priority, dueDate }); 
    this.setState({ list: updatedList });
  }

  changePriority(priority) {
    this.setState({ priority });
  }

  changeDueDate(dueDate) {
    console.log('DUE', dueDate);
    this.setState({ dueDate });  
  }

  changeFilter(filter) {
    this.setState({ filter });
  }

  changeStatus(itemId, completed) {
    const updatedList = updateStatus(this.state.list, itemId, completed);
    this.setState({ list: updatedList });
  }

  changeMode(mode = MODE_NONE) {
    this.setState({ mode });
  }

  setSearchQuery(text) {
    this.setState({ query: text || '' });
  }
}

export default StateProvider;
