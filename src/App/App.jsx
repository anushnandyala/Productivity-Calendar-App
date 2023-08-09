import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewEventModal } from "../Components//NewEventModal";
import { DeleteEventModal } from "../Components//DeleteEventModal";
import { useDate } from "../Hooks/useDate";
import { CurrentBoxes } from "../Components/CurrentBoxes";

export const App = () => {

    const today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;

    // nav 0 is current month (render current month)
    const [nav, setNav] = useState(0);
    // clicked is the current date clicked
    const [currentDay, setCurrentDay] = useState(today);
    // list of events to store in local storage
    let scheduleMap = new Map();
    let examMap = new Map();
    let assignmentMap = new Map();
    const [maps, setMaps] = useState(
        localStorage.getItem('maps') ? 
            JSON.parse(localStorage.getItem('maps')) : 
            [{map: scheduleMap, key: "schedule"}, {map: examMap, key: "exam"}, {map: assignmentMap, key: "assignment"}]
    );

    //setEvents([ ...events, { map: scheduleMap, key: 1 }]);

    // returns an events from the date
    //const eventForDate = date => maps.find(e => e.date === date)

    // updates local storage with string of events
    useEffect(() => {
        localStorage.setItem("maps", JSON.stringify(maps))
    }, [maps]);

    const { days, dateDisplay } = useDate(maps, nav);

    return(
        <>
            <div id="container">
                <CalendarHeader 
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                    goToday={() => {
                        setNav(0);
                        setCurrentDay(today);
                    }}
                />

                <div id="weekdays">
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>

                <div id="calendar">
                    {days.map((d, index) => (
                        <Day
                            key={index}
                            day={d}
                            onClick={() => {
                                setCurrentDay(d.date);
                            }}
                        />
                    ))}
                </div>

                <CurrentBoxes 
                    currentDayDisplay={currentDay}
                />

            </div>

            {
                /*
                currentDay && !eventForDate(currentDay) && 
                < NewEventModal
                    onClose={() => setCurrentDay(null)} 
                    onSave={title => {
                        setEvents([ ...events, { title, date: currentDay }]);
                        setCurrentDay(null);
                    }}
                />
                */
            }

            {
                /*
                currentDay && eventForDate(currentDay) && 
                <DeleteEventModal 
                    eventText={eventForDate(currentDay).title}
                    onClose={() => setCurrentDay(null)}
                    onDelete={() => {
                        setEvents(events.filter(e => e.date != currentDay));
                        setCurrentDay(null);
                    }}
                />   
                */ 
            }
        </>
    );
};