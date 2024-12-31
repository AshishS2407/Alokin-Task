import update from "immutability-helper";

/**
 * Get the list of todo items and print their priority and due date.
 * @return {Array}
 */
export function getAll() {
  const todos = [
    {
      id: 1,
      text: "Learn Javascript",
      completed: false,
      priority: "Medium", // Default priority added
      dueDate: "2024-12-31", // Example due date
    },
    {
      id: 2,
      text: "Learn React",
      completed: false,
      priority: "High", // Default priority added
      dueDate: "2025-01-10", // Example due date
    },
    {
      id: 3,
      text: "Build a React App",
      completed: false,
      priority: "Low", // Default priority added
      dueDate: "2025-02-01", // Example due date
    },
  ];

  // Print all todo items with their priority and due date
  todos.forEach(todo => {
    console.log(`Todo: ${todo.text}, Priority: ${todo.priority}, Due Date: ${todo.dueDate}`);
  });

  return todos;
}

/**
 * Get a single item by its ID.
 * @param {number} itemId
 * @return {Object | undefined}
 */
export function getItemById(itemId) {
  return getAll().find((item) => item.id === itemId);
}

/**
 * Update the status of a todo item.
 * Adds confirmation to avoid accidental updates.
 * @param {Array} items - Current list of todo items.
 * @param {number} itemId - ID of the item to update.
 * @param {boolean} completed - New completion status.
 * @return {Array} Updated list of todo items.
 */
export function updateStatus(items, itemId, completed) {
  const index = items.findIndex((item) => item.id === itemId);

  // Ensure the item exists
  if (index === -1) {
    console.error(`Item with ID ${itemId} not found.`);
    return items;
  }

  // Add confirmation before updating the status
  const confirmationMessage = completed
    ? "Are you sure you want to mark this task as completed?"
    : "Are you sure you want to mark this task as incomplete?";

  const confirmUpdate = window.confirm(confirmationMessage);
  if (!confirmUpdate) {
    return items; // Return the original list if user cancels
  }

  // Return a new list of data with the updated item
  return update(items, {
    [index]: {
      completed: { $set: completed },
    },
  });
}

/**
 * A counter to generate a unique ID for a todo item.
 * Can be removed when the todo is created using backend/database logic.
 */
let todoCounter = 1;

/**
 * Generate the next unique ID.
 * @return {number} The next unique ID.
 */
function getNextId() {
  return getAll().length + todoCounter++;
}

/**
 * Add a new item to the todo list and return the updated list (immutable).
 * @param {Array} list - Current list of todo items.
 * @param {Object} data - Data for the new todo item.
 * @return {Array} Updated list with the new item.
 */
export function addToList(list, data) {
  const newItem = {
    id: getNextId(),
    priority: data.priority || "Medium", // Default to "Medium" if no priority is provided
    dueDate: data.dueDate || "", // Default to empty string if no due date is provided
    text: data.text, // Ensure the text is included
    completed: false, // Default completed status as false
  };

  // Log the new todo with its priority and due date
  console.log(`Added Todo: ${newItem.text}, Priority: ${newItem.priority}, Due Date: ${newItem.dueDate}`);

  return list.concat([newItem]);
}

/**
 * Update the priority of a todo item.
 * @param {Array} items - Current list of todo items.
 * @param {number} itemId - ID of the item to update.
 * @param {string} priority - New priority (High, Medium, Low).
 * @return {Array} Updated list of todo items.
 */
export function updatePriority(items, itemId, priority) {
  const index = items.findIndex((item) => item.id === itemId);

  // Ensure the item exists
  if (index === -1) {
    console.error(`Item with ID ${itemId} not found.`);
    return items;
  }

  // Log the priority change
  console.log(`Updated Todo ID: ${itemId}, New Priority: ${priority}`);

  // Return a new list of data with the updated priority
  return update(items, {
    [index]: {
      priority: { $set: priority },
    },
  });
}


/**
 * Update the due date of a todo item.
 * @param {Array} items - Current list of todo items.
 * @param {number} itemId - ID of the item to update.
 * @param {string} dueDate - New due date (in format "YYYY-MM-DD").
 * @return {Array} Updated list of todo items.
 */
export function updateDueDate(items, itemId, dueDate) {
  const index = items.findIndex((item) => item.id === itemId);

  // Ensure the item exists
  if (index === -1) {
    console.error(`Item with ID ${itemId} not found.`);
    return items;
  }

  // Log the due date change
  console.log(`Updated Todo ID: ${itemId}, New Due Date: ${dueDate}`);

  // Return a new list of data with the updated due date
  return update(items, {
    [index]: {
      dueDate: { $set: dueDate },
    },
  });
}

