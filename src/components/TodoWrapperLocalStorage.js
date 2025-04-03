// import React, {useState, useEffect} from 'react'
// import { TodoForm } from './TodoForm'
// import { v4 as uuidv4 } from 'uuid';
// import { Todo } from './Todo';
// import { EditTodoForm } from './EditTodoForm';
// uuidv4();

// export const TodoWrapperLocalStorage = () => {
//     const [todos, setTodos] = useState([])

//     useEffect(() => {
//         const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//         setTodos(savedTodos);
//     }, []);

//     const addTodo = todo => {
//         const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
//         setTodos(newTodos);
//         localStorage.setItem('todos', JSON.stringify(newTodos));
//     }

//     const toggleComplete = id => {
//         const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
//         setTodos(newTodos);
//         localStorage.setItem('todos', JSON.stringify(newTodos));
//     }

//     const deleteTodo = id => {
//         const newTodos = todos.filter(todo => todo.id !== id);
//         setTodos(newTodos);
//         localStorage.setItem('todos', JSON.stringify(newTodos));
//     }

//     const editTodo = id => {
//         setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
//     }

//     const editTask = (task, id) => {
//         const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
//         setTodos(newTodos);
//         localStorage.setItem('todos', JSON.stringify(newTodos));
//     }
//   return (
//     <div className='TodoWrapper'>
//         <h1>Ajoutez vos notes ici!</h1>
//         <TodoForm addTodo={addTodo} />
//         {todos.map((todo, index) => (
//             todo.isEditing ? (
//                 <EditTodoForm editTodo={editTask} task={todo} />
//             ) : (
//                 <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
//             )
            
//         ))}
         
//     </div>
//   )
// }

import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState(([]) => {
        // Initialisation synchrone depuis localStorage
        try {
            const savedTodos = localStorage.getItem('todos');
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (error) {
            console.error("Error reading localStorage", error);
            return [];
        }
    });

    // Sauvegarde automatique quand todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = todo => {
        setTodos(prev => [
            ...prev, 
            {
                id: uuidv4(), 
                task: todo, 
                completed: false, 
                isEditing: false
            }
        ]);
    }

    const toggleComplete = id => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }

    const deleteTodo = id => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    const editTodo = id => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
        ));
    }

    const editTask = (task, id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, task, isEditing: false} : todo
        ));
    }

    return (
        <div className='TodoWrapper'>
            <h1>Ajoutez vos notes ici!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
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
                        toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo} 
                        editTodo={editTodo} 
                    />
                )
            ))}
        </div>
    )
}