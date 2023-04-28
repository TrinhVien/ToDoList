
const TODOLIST = 'TODOLIST'

let data = [
    {
        taskName:'Readbook',
        isCompleted:'false'
    },
    {
        taskName:'Learn PHP',
        isCompleted:'false'
    }
]

const saveData =(data)=>{
    localStorage.setItem(TODOLIST,JSON.stringify(data))

}
// saveData(data)

const loadData=()=>{
    let data
    data= JSON.parse(localStorage.getItem(TODOLIST))
    data=data?data:[]
    return data
}

const renderTask=()=>{
    let data,ulTask,renderLiTask,count,countCompleted
    data=loadData()
    ulTask=document.querySelector('.task-list')
    countCompleted = document.querySelector('p.task-completed')
    count=0
    renderLiTask = data.map((element,index)=>{
        if(element.isCompleted==true){
            count++
        }
        return  `<li class="task-item d-flex" index="${index}" isCompleted="${element.isCompleted}">
                    <p onclick="isCompleted(${index})" class="task-content">${element.taskName}</p>
                    <button onclick="editTask(${index})" class="btn-edit" ><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteTask(${index})" class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                </li>`
    })
    if(count>0){
        countCompleted.innerHTML = `Yeah, ${count} task completed`
    }
    else{
        countCompleted.innerHTML = 'Try again, you can do it !!!'
    }
    ulTask.innerHTML=renderLiTask
    console.log(countCompleted)
}
renderTask()
// Submit task 
    const formTask=document.forms.jsFormTask
    formTask.addEventListener('submit',(e)=>{
    const task=document.querySelector('.enter-task')
    const btnSubmit = document.querySelector('.btn-submit')

    if(btnSubmit.value=='ADD TASK'){
        if(task.value){
            newTask={
                taskName: task.value,
                isCompleted:false
            }
            addTask(newTask)
        }
    }
    else{
        let data, index
         data=loadData()
        index = task.getAttribute('index')
        const btnSubmit = document.querySelector('.btn-submit')
        data[index].taskName=task.value
        saveData(data)
        renderTask()
        btnSubmit.value='ADD TASK'
        console.log(data[index])

    }
        task.value=''
        e.preventDefault()
    })
const addTask=(newTask)=>{
    let data=loadData()
    data.push(newTask)
    saveData(data)
    renderTask()
}

const isCompleted=(index)=>{    
    let data = loadData()
    data[index].isCompleted=data[index].isCompleted==false?true:false
    saveData(data)
    renderTask()
    // console.log(data[index])
}

const deleteTask=(index)=>{
    let data=loadData()
    const task=document.querySelector('.enter-task')
    data.splice(index,1)
    saveData(data)
    renderTask()
    task.value = ''
    console.log(data[index])
}

const editTask=(index)=>{

    let data =loadData()
    const task=document.querySelector('.enter-task')
    const btnSubmit = document.querySelector('.btn-submit')
    task.value = data[index].taskName
    btnSubmit.value = 'EDIT TASK'
    task.setAttribute('index',index)
    // console.log(task)
}
