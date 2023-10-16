import { useState,useEffect } from "react"
import './App.css'

const TodoData = () => {
    const [ToDoList, SetToDoList] = useState([])
    const [activity, setActivity] = useState({})
    const [isActive,setActive] = useState(false)
    return (
        <div className="parent">
            <h1 style={{ margin: '50px'}}>ToDoList :)</h1>
            <div className="cont row">
                <input type="text" required onChange={(e) => { setActivity({ text: e.target.value, status: false, date: activity.date, id: Date.now() }) }} placeholder="Enter activity" className="form-control" />
                <input type="date" onChange={(e) => { setActivity({ ...activity, date: e.target.value }) }} className="form-control mt-3" />
                <button onClick={() => { if (typeof activity.text && typeof activity.date != 'undefined') { setActivity({ ...activity, id: Date.now() }); SetToDoList([...ToDoList, activity]) } }} className="btn btn-success mt-2">Add</button>
            </div>
            <div className="list">
                <div className="sub">
                    {ToDoList.map((value, index) => {
                        return (
                            <div key={index} className="todo">
                                <input type="checkbox" value={value.status} onChange={(e) => {
                                    SetToDoList(
                                        ToDoList.filter((obj) => {
                                            if(e.target.checked){
                                                setActive(true)
                                            }
                                            else if(ToDoList.length==1){
                                                setActive(false)
                                            }
                                            if (obj.id == value.id) {
                                                obj.status = e.target.checked
                                            }
                                            return obj
                                        })
                                    )
                                }} style={{ cursor: 'pointer' }} name="" id="" />
                                <b className="m-4" style={{ fontSize: "22px" }}>{value.text} <sup style={{fontSize:'10px',color:'red'}}>{value.date}</sup></b>
                                <ion-icon onClick={(e)=>{
                                    SetToDoList(
                                        ToDoList.filter((obj)=>{
                                            return obj.id!=value.id
                                         })
                                    )
                                }} style={{ cursor: 'pointer' }} name="trash-outline"></ion-icon>
                            </div>
                        )
                    })}
                </div>
               { isActive?(<div className="active">
                    <h1 style={{ borderBottom: "1px solid white" }}>Active tasks</h1>
                    <ol>
                        {
                            ToDoList.filter(value => {
                                return value.status == true
                            }).map((value, index) => {
                                return (
                                    <li key={index}>{value.text}</li>
                                )
                            })
                        }
                    </ol>
                </div>):null}
            </div>
        </div>

    )
}
export default TodoData