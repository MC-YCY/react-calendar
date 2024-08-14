import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import styles from './styles/calendar.module.css';
import {CalendarProps, CalendarChangeParam, refMethods, dateTableRow, dateTableType} from './types';
import {getDateTable} from './composition/dateToTable.ts';
import CalendarRow from './calendar.row.tsx';
import CalendarWeek from './calendar.week.tsx';

const Calendar = forwardRef<refMethods, CalendarProps>((props, ref) => {
    const [DayList, setDayList] = useState<dateTableType>([]);

    const setDate = (prop: CalendarProps) => {
        let data = getDateTable(prop)
        setDayList(data);
        props.onChange && props.onChange(prop,data);
    }

    useEffect(() => {
        setDate(props);
    }, [props]);

    useImperativeHandle(ref, () => ({
        dateTable: DayList,
    }));
    return <div className={styles.calendar}>
        <CalendarWeek firstDayOfWeek={props.firstDayOfWeek} customWeek={props.customWeek}></CalendarWeek>
        {
            DayList.map((row: dateTableRow, index: number) => {
                return <CalendarRow key={'calendar-row' + index} list={row} customDay={props.customDay}></CalendarRow>
            })
        }
    </div>
})

export default Calendar;
export type CalendarRefType = refMethods;
export type CalendarChangeParamType = CalendarChangeParam;
export type DateTableType = dateTableType;
