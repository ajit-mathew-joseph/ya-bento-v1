import React, { useEffect, useState } from 'react';
import { isSameDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import "./AddCalendar.scss";


function AddCalendar(props) {
    const [selectedDates, setSelectedDates] = useState([])
    const modifiers = {
        selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
    }

    const handleDayClick = date => {
        setSelectedDates([...selectedDates, date])
        props.addDates(selectedDates)
    }
   
    return (
        <div className="myCalendar">
            <h2 className="myCalendar__title">Update Orders</h2>
            <div className="myCalendar__calendar">
                <Calendar
                    onDayClick={handleDayClick} modifiers={modifiers} locale={enGB}
                />
            </div>
            <button className="addCalendar__button" onClick={props.postDates}>Save Changes</button>
        </div>


    )
}

export default AddCalendar;