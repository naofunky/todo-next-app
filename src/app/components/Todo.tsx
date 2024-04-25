'use client';
import { useState } from 'react';
import { useGetTodo } from '../hooks/useGetTodo';
import { TodoType } from '../types/TodoType';
import { API_URL } from '../utils/url';

type Props = {
  todo: TodoType;
};

export const Todo = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { todos, mutate } = useGetTodo();

  // edit task
  const editTaskData = async () => {
    try {
      setIsEditing(!isEditing);
      if (isEditing) {
        const res = await fetch(`${API_URL}/edit/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editedTitle,
          }),
        });

        if (res.ok) {
          const newTodo = await res.json();
          const newTodos = todos.map((todo: TodoType) =>
            todo.id === newTodo.id ? newTodo : todo
          );
          mutate(newTodos);
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  // delete task
  const deleteTaskData = async () => {
    try {
      const res = await fetch(`${API_URL}/delete/${todo.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const newTodo = await res.json();
        const newTodos = todos.filter(
          (todo: TodoType) => todo.id !== newTodo.id
        );
        mutate(newTodos);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  // checkbox toggle Todo Completed
  const toggleTaskCompleted = async (id: number, isCompleted: boolean) => {
    try {
      const res = await fetch(`${API_URL}/edit/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompleted: !isCompleted,
        }),
      });

      if (res.ok) {
        const newtodo = await res.json();
        const newTodos = todos.map((todo: TodoType) =>
          todo.id === newtodo.id ? newtodo : todo
        );
        mutate(newTodos);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
            border-gray-300 rounded"
              onClick={() => toggleTaskCompleted(todo.id, todo.isCompleted)}
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded py-1 px-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span
                  className={`text-lg font-medium mr-2 text-gray-500 ${
                    todo.isCompleted === false ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              )}
            </label>
          </div>
          <div className={`flex items-center space-x-2 `}>
            <button
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
              onClick={() => editTaskData()}
            >
              {isEditing ? 'SAVE' : 'EDIT'}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
              onClick={() => deleteTaskData()}
            >
              DELETE
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};
