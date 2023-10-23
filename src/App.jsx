import { useEffect, useState,useRef } from "react"
import './App.css'

export default function () {
    const [ToDoList, SetToDoList] = useState(JSON.parse(localStorage.getItem('todolist'))||[])
    const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem('completed'))||[])
    const [activity, setActivity] = useState({text:'',status:false,id:null})
    const [isActive, setActive] = useState(completed.length||false);
    const ref = useRef(null)
    const addTask = () => {
        if (activity.text.length) {
            SetToDoList([...ToDoList, {...activity,id: Math.random()*Date.now()}]);
            setActivity({text:''})
        }else{
            ref.current.focus()
        }
    }
    useEffect(()=>{
        ref.current.focus()
        localStorage.setItem('todolist',JSON.stringify(ToDoList))
        localStorage.setItem('completed',JSON.stringify(completed))
    },[ToDoList,completed])
    return (
        <div style={{ width: '500px' }}>
            <div className="input">
                <h1 style={{ textAlign: "center" }}>ToDoList :)
                <p style={{fontSize:'13px',color:'red'}}>By sirajju</p></h1>
                {/* <hr /> */}
                <input ref={ref} value={activity.text} onKeyUp={(e)=>{e.key==='Enter'&&addTask()}} style={{ height: "45px", marginTop: "50px", textAlign: "center", 'textTransform': "capitalize" }} onChange={(e) => { setActivity({...activity,text:e.target.value}); }} className="form-control text" />
                <button className="btnAdd" onClick={addTask}>Add</button>
                <hr /> <div className="actions">
                    <div className="completed">
                        {isActive ? (<div className="text-start fw-bold">
                            <h3 className=" text-center" style={{ fontFamily: "verdana" }}>Completed</h3>
                            <ol className="mt-3">
                                {
                                    completed.map((value, index) => {
                                        return (
                                            <li style={{ fontFamily: 'courier' }} key={index}> {value.text} <span className="text-success" style={{ fontSize: "12px" }}> at {value.date} </span> </li>
                                        )
                                    })
                                }
                            </ol>
                            <div className="clear text-end">
                                <ion-icon title='Clear logs' onClick={() => {
                                    setCompleted([])
                                    setActive(false)
                                }} style={{ fontSize: "23px", 'cursor': "pointer" }} name="trash-bin-sharp"></ion-icon>

                            </div>
                        </div>) : null}
                    </div>
                </div>
            </div>
            <div style={{ overflowY: 'scroll', height: "240px", marginTop: "10px" }}>
                {ToDoList.map((value, index) => {
                    return (
                        <div key={index} className="activity">
                            <ion-icon title='Mark task as completed' onClick={(e) => {
                                SetToDoList(
                                    ToDoList.filter((obj) => {
                                        if (obj.id === value.id) {
                                            const data = {
                                                text: obj.text,
                                                id: obj.id,
                                                date: " " + new Date().toLocaleString().substring(0, 19),
                                            }
                                            setActive(true)
                                            setCompleted([...completed, data])
                                            return null
                                        }
                                        return obj
                                    })
                                );

                            }} name="checkmark-done-outline" style={{ marginTop: "10px", fontSize: "25px", cursor: 'pointer' }}></ion-icon>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{value.text}</p>
                            <ion-icon title='Delete task' onClick={(e) => {
                                SetToDoList(
                                    ToDoList.filter((obj) => {
                                        return obj.id !== value.id
                                    })
                                )
                            }} style={{ fontSize: '25px', marginTop: '10px', 'cursor': "pointer" }} name="close-circle-outline"></ion-icon>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}