import { createContext, useEffect, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducer";

export type TodosContextState = {
  todos: string[];
  dispatch: any;
};

export const TodosContext = createContext<TodosContextState | null>(null);

export default function TodosProvider({ children }: any) {
  const [todos, dispatch] = useReducer(todoReducer, [], () => []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        dispatch,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
