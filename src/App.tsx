import {FC, useState, useRef} from 'react';
import Calendar,{CalendarRefType,CalendarChangeParamType,DateTableType} from './components/calendar/calendar';
import styles from './style.module.css';

const App: FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [firstDay, setFirstDay] = useState<number>(1);
    const setFn = () => {
        date.setMonth(date.getMonth() + 1)
        setDate(new Date(date));
    }

    const calendar = useRef<CalendarRefType>(null)
    const getCalendarRef = () =>{
        setDate(new Date(2024,9,1))
        setFirstDay(7)
    }
    const syncProp = (prop:CalendarChangeParamType,dateTable:DateTableType) =>{
        console.log(prop,dateTable)
    }
    return <>
        {date.getMonth() + 1}月
        <div className={styles.buts}>
            <button onClick={setFn}>set date</button>
            {
                '1234567'.split('').map((v) => {
                    return <button key={v} onClick={() => setFirstDay(parseInt(v))}>firstDay{v}</button>
                })
            }
            <button onClick={getCalendarRef}>ref current methods</button>
        </div>
        <Calendar onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}
                  firstDayOfWeek={firstDay}></Calendar>

        <br/>
        <br/>
        <br/>

        <Calendar
            customDay={(cell) => {
                return <div>{cell.day + '-' + cell.month}</div>
            }}
            customWeek={(week) => {
                return <>{['A','B','C','D','E','F','G'][week.weekIndex]}</>
            }}
            onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}
            firstDayOfWeek={firstDay}></Calendar>
    </>
}
export default App;
