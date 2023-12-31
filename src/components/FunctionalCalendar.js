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

    const setActiveDay = (dayOfWeek) => {
        setDay(dayOfWeek)
        deActivateChore()
    }

    const openFormModal = async (value) => {
        setOpen(value)

        const collection = await choreManager.getChores()
        setChores(collection)
    }
 
    const activateChore = (id) => {
        if(activeChore.id === id) return deActivateChore();

        setActiveChore(chores.filter((c) => c.id === id)[0])
    }

    const deActivateChore = () => {
        setActiveChore({ id: "" })
    }

    const deleteChore = async () => {
        // choreManager.deleteChore returns current chores [c...] without deleted chore
        const collection = await choreManager.deleteChore(activeChore.id)

        setChores(collection)
    }

    const onDayClick = (e) => {
        // passes the value of the div text first three characters to day state 
        if(e.target.innerText === "chores") {
            setActiveDay(e.target.parentElement.innerText.substring(0, 3))
        } else {
            setActiveDay(e.target.innerText.substring(0, 3))
        }
    }

    const mobileNavigation = (direction) => {
        // find the index of the current day
        const index = days.findIndex(d => d.day === day)

        if(index === 0) {
            console.log(days.length)
            if(direction === "right") setActiveDay(days[index + 1].day)
            else setActiveDay(days[days.length - 1].day)
        } else if(index === 6) {
            if(direction === "right") setActiveDay(days[0].day)
            else setActiveDay(days[index - 1].day)
        } else {
            if(direction === "right") setActiveDay(days[index + 1].day)
            else setActiveDay(days[index - 1].day)
        }
    }


    const LeftArrow = () => (
        <svg onClick={() => mobileNavigation("left")} fill="inherit" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="50 0 199.404 199.404">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <g> <polygon className="left-arrow" points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285 "/> </g> </g>
        </svg>
    )
    const RightArrow = () => (
        <svg onClick={() => mobileNavigation("right")} fill="inherit" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" 
            width="800px" height="800px" viewBox="-45 0 199.404 199.404"
            >
        <g>
            <polygon className="right-arrow" points="63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119 	"/>
        </g>
        </svg>
    )

    return (
        <>
        { open ? <Modal handleModalClose={openFormModal} days={days} day={day} /> : "" }
            <h1 className="text-center">Choralater</h1>
            <div className="calendar">
                <LeftArrow />
                {days.map((dayItem, i) => {
                    return (
                        <div 
                            className={ dayItem.day === day ? "active day": "day" } 
                            key={i} 
                            onClick={(e) => onDayClick(e)}
                            >
                            {dayItem.day}
                            {chores.filter(c => c.day === dayItem.day).length > 0 ? <div>chores</div> : null }
                        </div>
                    )
                })}
                <RightArrow />
            </div>
            <div className="chore-handler">
                <button className="primary-button" onClick={() => openFormModal(true)}>ADD CHORE</button>
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