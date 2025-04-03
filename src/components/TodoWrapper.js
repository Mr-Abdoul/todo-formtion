// import React, { useState } from "react";
// import { Todo } from "./Todo";
// import { TodoForm } from "./TodoForm";
// import { v4 as uuidv4 } from "uuid";
// import { EditTodoForm } from "./EditTodoForm";

// export const TodoWrapper = () => {
//   const [todos, setTodos] = useState([]);

//   const addTodo = (todo) => {
//     setTodos([
//       ...todos,
//       { id: uuidv4(), task: todo, completed: false, isEditing: false },
//     ]);
//   }

//   const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   }

//   const editTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
//       )
//     );
//   }

//   const editTask = (task, id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
//       )
//     );
//   };

//   return (
//     <div className="TodoWrapper">
//       <h1>Ajoutez vos notes ici!</h1>
//       <TodoForm addTodo={addTodo} />
//       {/* display todos */}
//       {todos.map((todo) =>
//         todo.isEditing ? (
//           <EditTodoForm editTodo={editTask} task={todo} />
//         ) : (
//           <Todo
//             key={todo.id}
//             task={todo}
//             deleteTodo={deleteTodo}
//             editTodo={editTodo}
//             toggleComplete={toggleComplete}
//           />
//         )
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  // Chargement initial depuis localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Sauvegarde automatique dans localStorage quand todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() === "") return; // Empêche l'ajout de tâches vides
    
    setTodos([
      ...todos,
      { 
        id: uuidv4(), 
        task: todo, 
        completed: false, 
        isEditing: false,
        createdAt: new Date().toISOString() // Ajout d'un timestamp
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    if (task.trim() === "") { // Empêche les tâches vides
      deleteTodo(id);
      return;
    }
    
    setTodos(
      todos.map((todo) =>
        todo.id === id 
          ? { ...todo, task, isEditing: false, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  // Trier les tâches par date de création (les plus récentes en premier)
  const sortedTodos = [...todos].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="TodoWrapper">
      <h1>Ajoutez vos notes ici!</h1>
      <TodoForm addTodo={addTodo} />
      
      <div className="todo-list">
        {sortedTodos.length === 0 ? (
          <p className="empty-message">Aucune tâche pour le moment. Ajoutez-en une !</p>
        ) : (
          sortedTodos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm 
                key={todo.id} 
                editTodo={editTask} 
                task={todo} 
              />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
              />
            )
          )
        )}
      </div>
      
      {/* {todos.length > 0 && (
        <div className="todo-stats">
          <p>
            {todos.filter(t => t.completed).length} / {todos.length} tâches complétées
          </p>
        </div>
      )} */}
    </div>
  );
};