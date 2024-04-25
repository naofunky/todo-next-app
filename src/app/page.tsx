'use client';
import { FormEvent, useRef } from 'react';
import { Todo } from './components/Todo';
import { useGetTodo } from './hooks/useGetTodo';
import { TodoType } from './types/TodoType';
import { API_URL } from './utils/url';

export default function Home() {
  const { todos, isLoading, error, mutate } = useGetTodo();
  const ref = useRef<HTMLInputElement | null>(null);

  // create task
  const addTaskData = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: ref.current?.value,
          completed: false,
        }),
      });
      if (res.ok) {
        const newTodo = await res.json();
        mutate([...todos, newTodo]);
        if (ref.current) {
          ref.current.value = '';
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">Error...</div>
    );
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={(e) => addTaskData(e)}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent
        border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
        focus:outline-none"
            type="text"
            placeholder="Add a task"
            ref={ref}
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todos?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
