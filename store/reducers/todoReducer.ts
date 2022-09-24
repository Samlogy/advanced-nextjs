const contextDefaultValues: any = {
  todos: [],
  addTodo: () => {},
};

export const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          todo: action.todo,
        },
      ];
    default:
      return state;
  }
};
