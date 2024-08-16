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

    const [taskData,setTaskData] = useState<any>([
        {
            date:'2024/8/14',
            task:'123'
        }
    ])
    const [taskDataDateMap,setTaskDataDateMap] = useState('date')
    const setTaskDataFn = () =>{
        setTaskDataDateMap('d');
        setTaskData([{d:'2024/8/1',task:'内容'}])
    }

    const [open,setOpen] = useState(true);
    const clickItem = (item:any) =>{
        console.log(item)
    }
    return <>

        <div className={styles.buts}>
            <button onClick={setFn}>set date</button>
            {
                '1234567'.split('').map((v) => {
                    return <button key={v} onClick={() => setFirstDay(parseInt(v))}>firstDay{v}</button>
                })
            }
            <button onClick={getCalendarRef}>ref current methods</button>
            <button onClick={setTaskDataFn}>修改task数据</button>
            <button onClick={() => setOpen(!open)}>toggole</button>
        </div>

        <div className={styles.buts}>
            {date.getFullYear()}年
            {date.getMonth() + 1}月
        </div>

        <div className={styles.main}>
            <Calendar
                open={open}
                onClick={clickItem}
                cellHeight={42} taskData={taskData} taskDataDateMap={taskDataDateMap} isFixedRows={false}
                onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}
                firstDayOfWeek={firstDay}></Calendar>

            <br/>

            不开启mouse交互的
            <Calendar
                onClick={clickItem}
                cellHeight={42} taskData={taskData} taskDataDateMap={taskDataDateMap} isFixedRows={false}
                onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}
                firstDayOfWeek={firstDay}></Calendar>
            <br/>
            自定义渲染week，cell
            <Calendar
                customWeek={(cell) => {
                    return <div
                        className={styles.customWeek}>{['A', 'B', 'C', 'D', 'E', 'F', 'G'][cell.weekIndex]}</div>
                }}
                customDay={(day) => {
                    let dayClasName = `${styles.customDay} ${day.active ? styles.customDayActive : ''}`
                    return <div className={dayClasName}>
                        <div className={styles.customDayTitle}>{day.day}</div>
                        <div className={styles.customDayTask}>{day.task && 'task:' + day.task.task}</div>
                    </div>
                }}
                onClick={clickItem}
                cellHeight={42} taskData={taskData} taskDataDateMap={taskDataDateMap} isFixedRows={false}
                onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}
                firstDayOfWeek={firstDay}></Calendar>
        </div>


        {/*<Calendar*/}
        {/*    taskData={taskData} taskDataDateMap={taskDataDateMap}*/}
        {/*    isFixedRows={true}*/}
        {/*    customDay={(cell) => {*/}
        {/*        return <div className={styles.customDay}>*/}
        {/*            <div>*/}
        {/*                { cell.day+'' }*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                { cell.task && 'task:'+cell.task.task }*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    }}*/}
        {/*    customWeek={(week) => {*/}
        {/*        return <>{['A','B','C','D','E','F','G'][week.weekIndex]}</>*/}
        {/*    }}*/}
        {/*    onChange={(param, dateTable) => syncProp(param, dateTable)} ref={calendar} date={date}*/}
        {/*    firstDayOfWeek={firstDay}></Calendar>*/}
    </>
}
export default App;
