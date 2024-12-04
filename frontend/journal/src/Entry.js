import React, { useState } from "react";
import axiosInstance from "./utils/config.js";

export default function Entry(){
    const [formData, setFormData] = useState({ text: "", review: "", tasks: [] });
    const [taskInput, setTaskInput] = useState({task:"", completed:false})

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
        try{
            const response = await axiosInstance.post("entry/create/", formData)
            console.log(response)
            if(response.statusText !== "Created"){
               throw new Error("Failed to add entry")
            }else{
                const data = response.data
                console.log(data)
                setFormData({ text: "", review: "", tasks: [] })
            }
        }
        catch(error){
            alert(error)
        }
       
    }

    return(
        <div>
            <form
            onSubmit={handleFormSubmit}>
                {/* text entry for journal */}
                <div>
                        <label
                        htmlFor="text">
                            Text Entry
                        </label>

                        <textarea 
                            name="text"
                            id="text"
                            value={formData.text}
                            placeholder="Write Something"
                            onChange={handleFormChange}>
                        </textarea>
                </div>
                {/* side entry of journal */}
                <div>
                    {/* task input pane */}
                    <div>
                        <div>
                            {formData.tasks.map((element, index)=> <TaskSelect key={index} task={element} />)}
                        </div>
                        <div>
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
                        <label htmlFor="review">
                            review:
                        </label>
                        <textarea
                        name="review"
                        id="review"
                        value = {formData.review}
                        placeholder="your review"
                        onChange={handleFormChange}>
                        </textarea>
                    </div>
                </div>

                {/* submit button container */}
                <div>
                    <button
                    type="submit">
                        Create Entry
                    </button>
                </div>
            </form>
        </div>
    )
}
