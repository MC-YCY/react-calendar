import {FC} from 'react';
import {CalendarRowProps,dateTableCell} from './types';
import styles from './styles/calendar.module.css';

const renderCell = (record:dateTableCell,customDay:CalendarRowProps['customDay']):JSX.Element =>{
    if(customDay) return customDay(record);
    let className: string = `${styles.calendarRowCellRect} `;
    if(record.status !== 1){
        className += styles.calendarRowCellNoMonth
    }else{
        className += styles.calendarRowCellMonth
    }
    return <div className={className}>
        {record.day}
    </div>
}

const CalendarRow:FC<CalendarRowProps> = (props) =>{
    return <div className={styles.calendarRow}>
        {
            props.list.map((record:dateTableCell,index:number)=>{
                return <div key={index} className={styles.calendarRowCell}>
                    {renderCell(record,props.customDay)}
                </div>
            })
        }
    </div>
}
export default CalendarRow;
