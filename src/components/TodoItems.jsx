import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

{/* Presentational component for an individual task. Receive all
  relevant data and action handlers as props from Todo.jsx. 
  Clicking on the checkbox image calls toggle(id) to mark complete/incomplete. 
  Clicking on the delte icon calls deleteTodo(id) to remove the task. */}
const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt="" className='w-7'/>
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500
            ${isComplete ? "line-through" : ""}`}>
                {text}
            </p>
        </div>

        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />
    </div>
  )
}

export default TodoItems
