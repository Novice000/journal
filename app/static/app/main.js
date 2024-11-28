import { isTokenExpired, refreshToken, performLogin, post, goIn, getEntries, getEntry, updateEntry, taskAdder, pageSetter, taskToHTML } from "./helper";

document.addEventListener("DOMContentLoaded", ()=>{
    //go in
    goInButton = document.querySelector("#go-in");
    goInButton.addEventListener("click", goIn);

    //set page
    entriesPager = document.querySelector("#entries-setter")
    entryPager = document.querySelector("#entry-setter")
    entriesPager.addEventListener("click",()=>{
        page = this.dataset.page
        pageSetter(page)
    })
    entryPager.addEventListener("click",()=>{
        page = this.dataset.page
        pageSetter(page)
    })

    //populate task container
    document.querySelector("#add-task").addEventListener("click",taskAdder)

    // create task
    document.querySelector("#submit").addEventListener("click",(e)=>{
        e.preventDefault()
        e.stopPropagation()
        post()
    })

    //
})
