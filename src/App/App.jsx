import React, { useState, useEffect } from "react";

export const App = () => {

    // nav 0 is current month (render current month)
    const [nav, setNav] = useState(0);
    // list of days to display on calendar
    const [days, setDays] = useState([]);
    // Display month calendar is currently on
    const [dateDisplay, setDateDisplay] = useState("");
    // clicked is the current date clicked
    const [clicked, setClicked] = useState();
    // list of events to store in local storage
    const [events, setEvents] = useState(
        localStorage.getItem('events') ? 
            JSON.parse(localStorage.getItem('events')) : 
            []
    );

    // returns an events from the date
    const eventForDate = date => events.find(e => e.date === date)

    // updates local storage with string of events
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    }, [events]);

    return(<>Hello from the App Component</>)
};