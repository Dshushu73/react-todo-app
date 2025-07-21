import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    {/*useState React Hook enables Todo.jsx component to manage nand preserve state
    of our list across re-renders. Here, we initialize the to-do list from localStorage
    (persistent storage in browser). If no saved list, initialize as an empty array.
    "todos" is just a key string I choose to identify the data in local storage. 
    localStorage.getItem("todos") retrieves a stringified version of the array of
    todos, or returns null if it doesn't exist yet. If it does, we use JSON.parse()
    to parse the JSON string and convert it back into a JavaScript object.
    When we call setToDoList() later, it updates the todoList state, which triggers
    a re-render of the Todo.jsx component so it can display the new state. And in useEffect, 
    we persist this updated list back into localStorage using the same key "todos".*/}
    const [todoList, setToDoList] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    {/*Access the value inside the input field without needing it to be part
    of React state. useRef is a React Hook that creates a mutable reference object. 
    This object will persist across re-renders without cuasing re-renders when it changes. It
    returns an object. The <input ref={inputRef} > links the hook to a DOM element (<input>).
    So now inputRef.current points to the input DOM element and .value() gives the current text. */}
    const inputRef = useRef();

    {/* Add a new todo object to the list when the user clicks the ADD + button. 
    On clicking add, a new array is created by copying the previous items
    and adding the new one at the end. React sees this state update and saves the new
    array as a new todoList, and rerenders the UI so that .map() renders the updated list.
    React stores state in memory, and state persists across re-renders.*/}
    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
        return null;
        }   
        const newTodo = {
            id: Date.now(), //unique ID using timestamp
            text: inputText, 
            isComplete: false,
        }

        {/*Instead of passing the new state directly, we are passing an "updater" function
        to the setter function. This is useful when the new state depends on the previous state.
        React automatically calls this updater function with the current (or "previous") state
        value as its argument. The updater function returns the new state value. React state
        should be treated as immutable, so we should not modify the original todoList array.
        We instead create a new array, using spread syntax to create a shallow copy of the 
        existing array and add a new todo without mutating the original list */}
        setToDoList((prev)=> [ ...prev, newTodo]); //add new todo. square brackets for returning an array
        inputRef.current.value = "";  //clear input

    }   

    {/*Delete a todo by filtering out the item with the given id.
    .filter() creates a new array by keeping only the todo items whose id is not
    equal to the one passed in. */}
    const deleteTodo = (id) => {
        setToDoList((prvTodos)=> {
            return prvTodos.filter((todo) => todo.id !== id)
        })
    }

    {/*Toggle isComplete boolean value of a todo. .map() creates a new array
    based on the previous one. It iterates over every single item, and for each one
    it runs a callback function that returns a new object {}. In this case the callback 
    function checks if the id matches that of the one clicked on. If it matches, a new object
    is returned in the new array with a flipped isComplete flag. If not, it still
    returns the current unchanged object to the new array. .map() builds a new array
    from all return values. In JavaScript object literals, when two properties with the
    same key appear, the later one overrides the earlier one. So with the ...todo spread
    syntax (spread all key-value pairs from todo object into new object) combined with the 
    isComplete update we are overriding isComplete from the original object. */}
    const toggle = (id) => {
        setToDoList((prevTodos)=> {
            return prevTodos.map((todo)=>{ //.map() overall returns an array. Within .map(), we return objects.
                if(todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete} //curly braces because returning an object within .map()
                }
                return todo;
            })
        })
    }   

    {/*React hook that lets Todo.jsx perform "side effect" after rendering. useEffect is
    how we react to state updates, in this case syncing data with an external system (local storage). 
    We pass a callback function as the first argument, setItem() in this case, which contains the code
    for our side effect. The optional second argument is a dependency array that, if any
    of its elements change, will trigger the effect to run. Here, whenever todoList
    changes, we save the new list (as a string) to local storage. This syncs state
    to localStorage. That is the side effect (independent from rendering) */}
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

    {/*Return JSX layout: title/header with icon, input box with button, and rendered
    list of todos via .map() */}
    return (
    <div className='bg-white place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[550px] rounded-xl'>

        {/* title */}
       <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt=""/>
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
       </div>

        {/* input box */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task'/>
            <button onClick={add} className='border-none rounded-full bg-orange-600 
            w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>

        {/* todo list */}  
        <div>
        {/* .map() iterates over the todoList array of todo items. For each todo, it calls 
        a callback function, which returns a <TodoItems /> component. React can render an
        array of elements like this directly inside JSX.
        .map() is returning an array of React elements, or one <TodoItems /> component
        per todo item. We are passing props to the TodoItems.jsx component. In the declaration
        statement for that component, we are destructuring props */}
        {todoList.map((item)=> {
            return (
                <TodoItems 
                    key={item.id} 
                    text={item.text} 
                    id={item.id}
                    isComplete={item.isComplete}
                    deleteTodo={deleteTodo}
                    toggle={toggle}/>)
                                }
                    )
        }
        </div>      
       
    </div>
  )
}
export default Todo
