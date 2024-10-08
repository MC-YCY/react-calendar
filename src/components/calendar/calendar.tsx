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
    const [open, setOpen] = useState<boolean>();
    const setDate = (prop: CalendarProps) => {
        let {data, selected: sel} = getDateTable(prop);
        setSelected(sel);
        setDayList(data);
        setTableHeight((props.cellHeight ? props.cellHeight : defaultProps.cellHeight) * data.length);
        props.onChange && props.onChange(prop, data);
    }
    useEffect(() => {
        setDate(props);
        setOpen(props.open);
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
            tableH = (parseFloat(cellH) * DayList.length) + 'px';
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
        endY: 0,
    });
    const [moveNum, setMoveNum] = useState(0);
    const [clearTransition, setClearTransition] = useState(false);
    const calendarTable = useRef<HTMLDivElement>(null);
    const calendarLayer = useRef<HTMLDivElement>(null);
    const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!('open' in props)) return;
        setIsDown(true);
        setMoveNum(0);
        mouseEvent.startY = event.pageY;
        mouseEvent.moveY = 0;
        setMouseEvent(deepClone(mouseEvent));
        setClearTransition(false);
    }
    const mouseUp = (_: any, record: any) => {
        setIsDown(false);
        mouseEvent.endY = _.clientY;
        mouseEvent.moveY = 0;
        setMouseEvent(deepClone(mouseEvent));
        if (moveNum < 5) {
            props.onClick && props.onClick(record);
        } else {
            if (!props.cellHeight) return;
            if (!calendarTable.current) return;
            if (!calendarLayer.current) return;
            let dif = mouseEvent.startY - mouseEvent.endY;
            if (dif > props.cellHeight) {
                setOpen(false);
                calendarLayer.current.style.setProperty('--top', 'var(--hideTableHeight)');
                calendarLayer.current.style.setProperty('--height', 'var(--cellHeight)');
            } else {
                setOpen(true);
                calendarLayer.current.style.setProperty('--top', '0');
                calendarLayer.current.style.setProperty('--height', 'var(--tableHeight)');
            }
            if (open != null) {
                props.onToggle && props.onToggle(open);
            }
        }
        setClearTransition(false);
    }
    const mouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDown) return;
        setMoveNum(moveNum + 1);
        if (moveNum > 5) {
            setClearTransition(true);
            if (!props.cellHeight) return;
            if (!calendarTable.current) return;
            if (!calendarLayer.current) return;

            let offsetY = event.pageY - mouseEvent.startY;
            let dif = event.pageY - mouseEvent.startY;

            if (open) {
                // 滑动中如果已经到最顶部就让toggle(visible)为true收起状态
                if (offsetY < -(tableHeight - props.cellHeight)) {
                    offsetY = -(tableHeight - props.cellHeight);
                    setOpen(false)
                }
                if (dif > 0) {
                    offsetY = 0;
                }
            } else {
                if (dif < 0) {
                    offsetY = 0;
                }
                offsetY = -(tableHeight - props.cellHeight - offsetY);
                let calendarLayerHeight = (tableHeight + offsetY)
                if (calendarLayerHeight > tableHeight) {
                    calendarLayerHeight = tableHeight;
                    setOpen(true)
                }
                calendarLayer.current.style.setProperty('--height', calendarLayerHeight + 'px');
            }

            let minY = -tableHeight;
            let maxY = 0;
            offsetY = Math.max(minY, Math.min(offsetY, maxY));

            mouseEvent.moveY = offsetY;
            setMouseEvent(deepClone(mouseEvent));

            calendarLayer.current.style.setProperty('--top', offsetY + 'px');
            calendarLayer.current.style.setProperty('--height', tableHeight + offsetY + 'px');
        }
    }
    const propsOpenToClassName = () => {
        if ('open' in props) {
            let openClassName = `${open ? styles.open : styles.close}`;
            return `${styles.calendarLayer} ${clearTransition ? '' : openClassName} ${styles.toggle}`
        } else {
            return `${styles.calendarLayer}`
        }
    }
    return <div className={styles.calendar}>
        <CalendarWeek firstDayOfWeek={props.firstDayOfWeek} customWeek={props.customWeek}></CalendarWeek>
        <div className={propsOpenToClassName()} style={setStyleCellHeight()} ref={calendarLayer}>
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
