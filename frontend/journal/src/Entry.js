import React, { useState } from "react";
import axiosInstance from "./utils/config.js";
import Error from "./Error.js";
import { HashLoader } from "react-spinners"

export default function Entry(){
    const [formData, setFormData] = useState({ text: "", review: "", tasks: [] });
    const [taskInput, setTaskInput] = useState({task:"", completed:false})
    const [loading, setLoading] = useState(false)

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
    setFormData((formata)=>({ ...formData, tasks: updatedTasks }));
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
            }))
            setTaskInput({task:"", completed:false})
        }
    }

    function handleFormChange(e){
        let {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }))
    }

   async function handleFormSubmit(e){
        e.preventDefault()
        setLoading(true)
        try{
            const response = await axiosInstance.post("entry/create/", formData)
            console.log(response)
            if(response.statusText !== "Created"){
               throw new Error("Failed to add entry")
            }else{
                setLoading(false)
                setFormData({ text: "", review: "", tasks: [] })
            }
        }
        catch(error){
           return (<Error error={error} />)
        }
       
    }

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
                {/* text entry for journal */}
                <div class="form-group">
                    <div className="text">
                            <label
                            className="entry-label"
                            htmlFor="text">
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
                                value = {taskInput.task}
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
                            value = {formData.review}
                            placeholder="your review"
                            onChange={handleFormChange}>
                            </textarea>
                        </div>
                    </div>
                </div>

                {/* submit button container */}
                <div className="submit-container">
                    <button
                    type="submit">
                        Create Entry
                    </button>
                </div>
            </form>
        </div>
    )
}
