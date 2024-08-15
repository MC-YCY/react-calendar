import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState,} from 'react';
import styles from "./styles/calendar.module.css";
import {CalendarChangeParam, CalendarProps, dateTableRow, dateTableType, defaultProps, refMethods} from './types';
import {getDateTable} from './composition/dateToTable.ts';
import CalendarRow from './calendar.row.tsx';
import CalendarWeek from './calendar.week.tsx';
import {deepClone} from "./tools/deepClone.ts";

const Calendar = forwardRef<refMethods, CalendarProps>((props, ref) => {
    const [DayList, setDayList] = useState<dateTableType>([]);
    const [selected, setSelected] = useState<number>();
    const [tableHeight, setTableHeight] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const setDate = (prop: CalendarProps) => {
        let {data, selected: sel} = getDateTable(prop);
        setSelected(sel);
        setDayList(data);
        setTableHeight((props.cellHeight ? props.cellHeight : defaultProps.cellHeight) * data.length);
        props.onChange && props.onChange(prop, data);
    }

    useEffect(() => {
        setDate(props);
    }, [props]);

    useImperativeHandle(ref, () => ({
        dateTable: DayList,
    }));

    const setStyleCellHeight = (): Record<string, any> => {
        let cellH: string | null;
        if ('open' in props) {
            if (props.cellHeight) cellH = props.cellHeight + 'px';
            else cellH = defaultProps.cellHeight + 'px';
        } else {
            cellH = null;
        }

        let tableH: string | null;
        let hideTableH: string | null;
        if (cellH) {
            tableH = (parseFloat(cellH) * DayList.length) + mouseEvent.moveY + 'px';
            hideTableH = -parseFloat(cellH) * (DayList.length - 1) + 'px';
        } else {
            tableH = null;
            hideTableH = null;
        }

        return {
            '--cellHeight': cellH,
            '--tableHeight': tableH,
            '--hideTableHeight': hideTableH,
            '--rows-len': DayList.length
        }
    }


    const [isDown, setIsDown] = useState<boolean>(false);
    const [mouseEvent, setMouseEvent] = useState<any>({
        startY: 0,
        moveY: 0,
    });
    const [moveNum, setMoveNum] = useState(0);
    const calendarTable = useRef<HTMLDivElement>(null);
    const calendarLayer = useRef<HTMLDivElement>(null);
    const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, record: any, prop: any, index: number) => {
        setIsDown(true);
        setMoveNum(0);
        if (event.button === 0) {
            mouseEvent.startY = event.pageY;
            setMouseEvent(deepClone(mouseEvent));
        }
    }
    const mouseUp = (_, record: any) => {
        setIsDown(false);
        mouseEvent.endY = _.clientY;
        mouseEvent.moveY = _.clientY;
        mouseEvent.moveY = 0;
        initTransition();
        if(!calendarTable.current) return;
        [...calendarTable.current.querySelectorAll('.calendar-row')].map(d => {
            d.classList.remove('clear-opacity');
        })
        if (moveNum <= 5) {
            props.onClick && props.onClick(record);
        }
        if(!props.cellHeight) return;
        let difference = mouseEvent.startY - mouseEvent.endY;
        if (difference > props.cellHeight) {
            setOpen(true)
        } else if (difference < -(props.cellHeight * .15)) {
            setOpen(false)
        }
        setMouseEvent(deepClone(mouseEvent));
    }
    const mouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, record: any, prop: any, index: number) => {
        if (!isDown) return;
        setMoveNum(moveNum + 1);
        if (moveNum > 5) {
            calendarMove(event);
        }
    }

    const calendarMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!calendarTable.current) return;
        if (!calendarLayer.current) return;
        if (!props.cellHeight) return;

        // calendarTable.current.style.transition = 'none';
        // calendarLayer.current.style.transition = 'none';

        // let moveY = event.pageY - mouseEvent.startY;
        // moveY = Math.max(-(tableHeight - props.cellHeight), Math.min(moveY, tableHeight));
        // if(moveY < 0){
        //     calendarTable.current.style.top = moveY + 'px';
        // }
        // mouseEvent.moveY = moveY;
        // setMouseEvent(deepClone(mouseEvent));
    }

    const initTransition = () =>{
        if(!calendarTable.current) return;
        if(!calendarLayer.current) return;
        calendarTable.current?.removeAttribute('style');
        calendarLayer.current.style.transition = '.35s 0s height linear';
    }

    return <div className={styles.calendar} style={setStyleCellHeight()}>
        <CalendarWeek firstDayOfWeek={props.firstDayOfWeek} customWeek={props.customWeek}></CalendarWeek>
        <div className={`${styles.calendarLayer} ${open ? styles.open : null}`} ref={calendarLayer}>
            <div className={styles.calendarTable} ref={calendarTable}>
                {
                    DayList.map((row: dateTableRow, index: number) => {
                        return <CalendarRow
                            mouseDown={mouseDown}
                            mouseMove={mouseMove}
                            mouseUp={mouseUp}
                            key={'calendar-row' + index} rowIndex={index} selected={selected} list={row}
                            customDay={props.customDay}></CalendarRow>
                    })
                }
            </div>
        </div>
    </div>
})

export default Calendar;
export type CalendarRefType = refMethods;
export type CalendarChangeParamType = CalendarChangeParam;
export type DateTableType = dateTableType;
