import React, { useEffect, useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import "./MyCalendar.scss"

const modifiersClassNames = {
    highlight: '-highlight'
}

function MyCalendar(props) {
    const [datesArr, setDatesArr] = useState([])
    useEffect(() => {
        if(props.payments.length !== 0) {
            setDatesArr(props.payments.map(payment => new Date(payment.date)))
        }
    }, [props.payments])
    
    const modifiers = {
        highlight: date => datesArr.some(paymentDate => isSameDay(paymentDate, date))
    }
   
    return (
        <div className="myCalendar">
            <h2 className="myCalendar__title">My Calendar</h2>
            <div className="myCalendar__calendar">
                <DatePickerCalendar
                    locale={enGB}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                />
            </div>
            <p className="myCalendar__info">Delivery Dates Highlighted in Green</p>
        </div>
    )
}

export default MyCalendar;