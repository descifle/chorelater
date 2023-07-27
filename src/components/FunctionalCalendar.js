import React, { useState, useEffect } from 'react';
import ChoreHandler from './choreHandler';
import Form from './Form';
import Modal from './Modal';

const FunctionalCalendar = () => {

    const choreManager = new ChoreHandler();
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState("SAT");
    const [chores, setChores] = useState([]);
    const [activeChore, setActiveChore] = useState({ id:""});

    useEffect(() => {
        const onStartup = async () => {
            const collection = await choreManager.getChores()
            setChores(collection)
            console.log(collection)
        }

        onStartup()
    }, [])

    const days = [
        { day: "SAT", name: "Saturday" },
        { day: "SUN", name: "Sunday" },
        { day: "MON", name: "Monday" },
        { day: "TUE", name: "Tuesday" },
        { day: "WED", name: "Wednesday" },
        { day: "THU", name: "Thursday" },
        { day: "FRI", name: "Friday" }
    ]

    const onDayClick = (dayOfWeek) => setDay(dayOfWeek)

    const openFormModal = async (value) => {
        setOpen(value)

        const collection = await choreManager.getChores()
        setChores(collection)
    }
 
    const activateChore = (id) => {
        if(activeChore.id === id) return deActivateChore();

        setActiveChore(chores.filter((c) => c.id === id)[0])
    }

    const deActivateChore = (id) => {
        setActiveChore({ id: "" })
    }

    const deleteChore = async () => {
        // choreManager.deleteChore returns current chores [c...] without deleted chore
        const collection = await choreManager.deleteChore(activeChore.id)

        setChores(collection)
    }

    const setActiveDay = (e) => {
        // passes the value of the div text first three characters to day state 
        if(e.target.innerText === "chores") {
            onDayClick(e.target.parentElement.innerText.substring(0, 3))
        } else {
            onDayClick(e.target.innerText.substring(0, 3))
        }
        
        deActivateChore()
    }

    const mobileNavigation = () => {
        
    }

    return (
        <>
        { open ? <Modal handleModalClose={openFormModal} days={days} day={day} /> : "" }
            <h1 className="text-center">Choralater</h1>
            <div className="calendar">
                {days.map((dayItem, i) => {
                    return (
                        <div 
                            className={ dayItem.day === day ? "active day": "day" } 
                            key={i} 
                            onClick={(e) => setActiveDay(e)}
                            >
                            {dayItem.day}
                            {chores.filter(c => c.day === dayItem.day).length > 0 ? <div>chores</div> : null }
                        </div>
                    )
                })}
            </div>
            <div className="chore-handler">
                <button className="primary-button" onClick={() => openFormModal(true)}>ADD</button>
            </div>
            <div className="activity">
                <div className="daily">
                    <h2>Current Chores</h2>
                    <div>
                    <h1>Selected: {days.filter(d => d.day === day)[0].name}</h1>
                        { chores.map((chore, i) => {
                            if(day === chore.day) return (
                                <div                                         
                                    key={chore.id} 
                                    data-self={chore.id} 
                                    className={ activeChore.id === chore.id ? "active day-chore": "day-chore" }
                                    onClick={() => activateChore(chore.id)}
                                    >
                                    <strong>{chore.chore}</strong>: {chore.choreInfo}
                                    <button className="delete-button" disabled={activeChore.id !== chore.id} onClick={() => deleteChore()}>DELETE</button>
                                </div>
                            )
                            return null;
                        }) }
                        { chores.filter(c => c.day === day).length === 0 ? "No chores" : null }
                    </div>
                </div>
                <div className="notes">
                    <h2>Notes</h2>
                    <div>
                        <div className="keet">
                            {activeChore.notes ?? "no chore selected"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default FunctionalCalendar;