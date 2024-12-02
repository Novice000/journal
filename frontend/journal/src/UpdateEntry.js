import React, { useState, useEffect } from "react";
import axiosInstance from "./utils/config.js";
import { isAccessTokenExpired, isRefreshTokenExpired, refreshToken } from "./utils/helper.js";
import {useNavigate} from "react-router";

export default function UpdateEntry({data}){
    const navigate = useNavigate()

    useEffect(() => {
        if (isAccessTokenExpired() && !isRefreshTokenExpired()) {
            refreshToken(); // Attempt to refresh token
        } else if (isAccessTokenExpired() && isRefreshTokenExpired()) {
            navigate("/login"); // Redirect to login if both tokens expired
            return
        }
    }, [navigate]);

    const [formData, setFormData] = useState({task:[]})
    const [taskInput, setTaskInput] = useState({task:"", completed:false})
    setFormData(data)
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
    const updatedTasks = formData.task.map((t) =>
      t.task === task.task
        ? { ...t, completed: !t.completed }
        : t
    );
    setFormData((formata)=>({ ...formData, task: updatedTasks }));
  }

    function handleTaskChange(e){
        let value = e.target.value.trim()
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
                task: [...prev.task, taskInput]
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
            const response = await axiosInstance.put(`update/entry/${formData.id}`,formData)
            if(response.status !== 201){
               throw new Error("Failed to add entry")
            }else{
                const data = await response.json()
                console.log(data)
                setFormData({task:[]})
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
                            {formData.task.map((element, index)=> <TaskSelect key={index} task={element} />)}
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
                        value = {formData.review }
                        onChange={handleFormChange}>
                        </textarea>
                    </div>
                </div>

                {/* submit button container */}
                <div>
                    <button
                    type="submit">
                        Update Entry
                    </button>
                </div>
            </form>
        </div>
    )
}
