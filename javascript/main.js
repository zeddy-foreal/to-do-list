let add_task = document.querySelector(".add");
let container = document.querySelector(".missions");
let number_of_tasks = document.querySelector(".numberoftasks span");
let buttons = document.querySelectorAll(".but");
let removeall = document.querySelector(".removeall");
let input = document.querySelector(".input")
let root = document.documentElement;
let dark = ["#0e1221","#0f182a","#305756","#6abbd9","#00ffba", "#10151e", `<i class="fa-solid fa-sun"></i>`];
let light = ["#cff0feff","#e4eff2","#03045e","#00076e","#ff0005", "#ffffff", `<i class="fa-solid fa-moon"></i>`];
let mode = "dark";
let mode_but = document.querySelector(".mode")
// #####
let task_array = [];
if (localStorage.tasks){
    task_array = JSON.parse(localStorage.tasks);
    addtopage(task_array)

}


mode_but.onclick = ()=>{
    if (mode === "dark"){

        change_colors(light)
        mode = "light"
    }else{

        change_colors(dark)
        mode = "dark"
    }
}
function change_colors(arr){
    root.style.setProperty("--body",arr[0])
    root.style.setProperty("--background",arr[1])
    root.style.setProperty("--hover",arr[2])
    root.style.setProperty("--main",arr[3])
    root.style.setProperty("--text",arr[4])
    root.style.setProperty("--body2",arr[5])
    mode_but.innerHTML = arr[6]
}
add_task.onclick = ()=>{
    if (input.value.length > 0){
        let obj = {
            title:input.value,
            id:Date.now(),
            check:false
        }
        addtoarray(obj)
        input.value = ""
        input.focus()
    }
}

window.addEventListener("keydown", (a)=>{
    a.key == "Enter"? add_task.click():null;
})
function addtoarray(obj){
    task_array.push(obj);

    addtopage(task_array);
    save();
    changenumber();
}
function addtopage(arr){
    container.innerHTML = ""
    arr.forEach((obj)=>{
        let task_container = document.createElement("div")
        task_container.className = "task";
        task_container.style.display = "block"
        if (obj.check === true){
            task_container.classList.add("active")
        }

        
        let task = document.createElement("div")
        task.className = "task_details";


        let box = document.createElement("div")
        box.className = "box";

        let span = document.createElement("span")
        span.innerHTML = `<i class="fa-solid fa-check"></i>`

        let details = document.createElement("div")
        details.className = "details";
        
        let details_p = document.createElement("p")
        details_p.innerHTML = obj.title;

        let rem = document.createElement("button");
        rem.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        rem.className = "remove"

        details.appendChild(details_p)
        details.appendChild(rem)
        box.appendChild(span)
        task.appendChild(box)
        task.appendChild(details)
    
        task_container.appendChild(task)

        container.appendChild(task_container)

        task_container.addEventListener("click",(a)=>{
            if(a.target.classList.contains("remove")){
                remove_from_array(obj.id);
                task_container.remove();
            }else{
                if(task_container.classList.contains("active")){
                task_container.classList.remove(("active"))
                obj.check = false;
            }else{
                task_container.classList.add(("active"))
                obj.check = true;
            }
            }
            makesure()
            save()
        })
        makesure()
    })
    changenumber();
}
function save(){
    localStorage.setItem("tasks", JSON.stringify(task_array))
}
// BUTTONS FUNCTIONS //

buttons.forEach((butt)=>{


    butt.onclick = ()=>{
        buttons.forEach((but)=>{
            but.classList.remove("clicked")
        })
        butt.classList.add(("clicked"))
        showitall()
        if (butt.classList.contains("completed")){
            Array(...container.children).forEach((div)=>{
                if (div.classList.contains("active")){
                    null
                }else{
                    div.style.display = "none"
                }
            })
        }else if(butt.classList.contains("active")){
            Array(...container.children).forEach((div)=>{
                if (div.classList.contains("active")){
                    div.style.display = "none"
                }
            })
        }
        changenumber()
    }
})
function remove_from_array(id){
    task_array = task_array.filter((obj)=>{
        return +obj.id != +id;
    })
    addtopage(task_array)
    save()

}
function changenumber(){
    let dog = [...container.children].filter((div)=>{
        return div.style.display === "block";
    })
    number_of_tasks.innerHTML = dog.length;
}
function showitall(){
    [...container.children].forEach((div)=>{
        div.style.display = "block"
    })
}
function makesure(){
    buttons.forEach((but)=>{
        if (but.classList.contains("clicked")){
            but.click()
        }
    })
}
removeall.onclick = ()=>{
    task_array = task_array.filter((obj)=>{
        return obj.check == false;
    })
    addtopage(task_array);
    save();
    changenumber()
}
/*     localStorage.removeItem("tasks")
task_array.length = 0
container.innerHTML = "";
changenumber() */