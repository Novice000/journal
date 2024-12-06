import React, { useState, useEffect } from "react";
import axiosInstance from "./utils/config.js";
import { useParams } from "react-router";
import { ObjectId } from "bson"
import "./styles/App.css"
import { HashLoader } from "react-spinners";

export default function UpdateEntry(){
    const { id } = useParams();
    const [formData, setFormData] = useState({text:"", review:"",tasks:[]})
    const [taskInput, setTaskInput] = useState({task:"", completed:false})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchEntry(){
            if(ObjectId.isValid(id)){
                try{ const response = await axiosInstance.get(`/entry/${id}/`)
                 if(response.status !== 200){
                     return(
                         <div>
                             Failed to fetch entry
                         </div>
                     )
                 }
                 setFormData(response.data)
             }catch(e){
                     <div>
                        <h2>
                            Error
                        </h2>
                        <p>
                        {e.message}
                        </p>
                        <>
                        try reloading</>
                     </div>
                 } finally{
                     console.log(formData)
                     setLoading(false)
                 }
            } else {
                return(
                    <>
                        <h2>
                            Invalid Entry
                        </h2>
                    </>
                )
            }
        }; fetchEntry()
    }, [id])

    function TaskSelect({task}){
        return (<>
            <label>
                {task.task}
               <input type="checkbox" 
               checked = {task.completed} 
               value={task.task}
               onChange={()=>toggleComplete(task)}/>
                </label>      
        </>)
    }

      // Toggle completion status of a task
  function toggleComplete(task) {
    const updatedTasks = formData.tasks.map((t) =>
      t.task === task.task
        ? { ...t, completed: !t.completed }
        : t
    );
    setFormData((prev)=>({ ...prev, tasks: updatedTasks }));
  }

    function handleTaskChange(e){
        let value = e.target.value
        if (value){
            setTaskInput((prev)=>({
            ...prev,
            task: value
        }))
        }
    }


    function addTask(){
        if (taskInput.task){
            setFormData((prev)=>({
                ...prev,
                tasks: [...prev.tasks, taskInput]
            }));
            setTaskInput({task:"", completed:false})
        }
    }

    function handleFormChange(e){
        let {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }));
    }

   async function handleFormSubmit(e){
        e.preventDefault()
        try{
            const response = await axiosInstance.put(`update/entry/${id}/`,formData)
            if(response.status !== 201 && response.status !== 200){
               throw new Error("Failed to update entry")
            }
                alert("updated successfully")
                setFormData({text:"", review: "", tasks:[]})
        } catch(error){
            alert(error.nessage)
        }
       
    }

    // async function handleFormSubmit(e) {
    //     e.preventDefault();
    //     try {
    //       const response = await axiosInstance.put(`/entry/${id}/`, formData); // Fixed PUT request URL
    //       if (response.status !== 200 && response.status !== 201) {
    //         throw new Error("Failed to update entry"); // Corrected error handling for status codes
    //       }
    //       alert("Entry updated successfully!"); // Added success feedback
    //     } catch (error) {
    //       alert(error.message); // Improved error alert
    //     }
    //   }

    if (loading) {
        return (
          <div className="loader-container">
            <HashLoader loading={loading} color="#3e2723" size={20} />
          </div>
        );
      }

    return(
        <div className="diary">
            <form
            onSubmit={handleFormSubmit}>
                <div class="form-group">
                    {/* text entry for journal */}
                    <div className="text">
                            <label
                            htmlFor="text"
                            className="entry-label">
                                Entry:
                            </label>
                            <textarea
                                name="text"
                                id="text"
                                className="text-area"
                                value={formData.text}
                                placeholder="Write Something"
                                onChange={handleFormChange}>
                            </textarea>
                    </div>
                    {/* side entry of journal */}
                    <div className="review-task">
                        {/* task input pane */}
                        <div>
                            <h3>Tasks:</h3>
                            <div className="task-container task-list">
                                {formData.tasks.map((element, index)=> <TaskSelect key={index} task={element} />)}
                            </div>
                            <div className="task-input-container">
                                <input
                                type="text"
                                onChange={handleTaskChange}
                                className=""
                                value = {taskInput.task || ""}
                                placeholder="Enter Task"
                                />
                                <button
                                type="button"
                                onClick={addTask}>
                                    Add Task
                                </button>
                            </div>
                        </div>
                        {/* review input fields */}
                        <div>
                            <label 
                            className="entry-label"
                            htmlFor="review">
                                review:
                            </label>
                            <textarea
                            name="review"
                            id="review"
                            className="review-area"
                            value = {formData.review }
                            onChange={handleFormChange}>
                            </textarea>
                        </div>
                    </div>
                </div>

                {/* submit button container */}
                <div className="submit-container">
                    <button
                    type="submit">
                        Update Entry
                    </button>
                </div>
            </form>
        </div>
    )
}
