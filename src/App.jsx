
import React, { useState,useEffect } from 'react';
//import Header from './Components/TodoList';
//import Form from './Components/TodoForm';
import { AiOutlineDelete } from "react-icons/ai";

import { IoIosCheckboxOutline } from "react-icons/io";
import './App.css'

function App()  {
  const[allTodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("")
  const[newDescription,setNewDescription]=useState("")
  const[isCompletedScreen,setIsCompletedScreen]=useState(false); 
  const[completedTodos,setCompletedTodos]=useState([]);

  
  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }
    let updateTodoArr=[...allTodos]
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr)
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
  }; 
  const handleDelete=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setTodos(reducedTodo);

  }
  let handleComplete=(index)=>{
    let filteredItem={
      ...allTodos[index]
    }
    let updatedCompletedArr=[...completedTodos]
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodos=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index)
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo);

  }
   
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolost'))
    let completedTodo=JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(completedTodo){
      setCompletedTodos(completedTodo);
    }
    
 },[])


   return(
    <div className='App'>
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what is the title"/>
          </div >
          <div className='todo-input-item'>
            <label>Description</label>  
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}   placeholder="what is the task description"/>
          </div >
          <div className='todo-input-item'>
            <button type="button"onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
          </div>
            <div className='btn-area'>
              <button
               className={`secondaryBtn ${isCompletedScreen===false &&'active'}`}
               onClick={()=>setIsCompletedScreen(false)}
               >Todo</button>
              <button className={`secondaryBtn ${isCompletedScreen===true &&'active'}`}
               onClick={()=>setIsCompletedScreen(true)}
              >Completed</button>
            </div>
            <div className='todo-list'>
              {isCompletedScreen===false && allTodos.map((item,index)=>{
                return(
                  <div className='todo-list-item' key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              
              <div>
                <AiOutlineDelete className='icon' onClick={()=>handleDelete(index)}  title='Delete'/>
                <IoIosCheckboxOutline   className= "check-icon"  onClick={()=>handleComplete(index)}title='Completed'/>
              </div>
            </div>
                )
              })}
               {isCompletedScreen===true && completedTodos.map((item,index)=>{
                return(
                  <div className='todo-list-item' key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              
              <div>
                <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodos(index)} title='Delete' />
              
              </div>
            </div>
                );
              })}
            
              
          </div>
             
        </div>
      </div>
    
  
    
  
  )
     
}
  
  
    

export default App;
