import {dateTableRow, dateTableType} from './date.table.ts';
import {weekDataItemType} from '../composition/dateListMethod.ts';
import {dateTableCell} from './date.table.ts';
import React from "react";

export interface renderCustom {
    customWeek?: (arg0: weekDataItemType) => JSX.Element,
    customDay?: (arg0: dateTableCell) => JSX.Element,
}

export interface CalendarProps extends renderCustom {
    date: Date,
    firstDayOfWeek: number,
    isFixedRows?: boolean,
    taskData?: Record<string, any>[],
    taskDataDateMap?: string,
    open?: boolean,
    cellHeight?: number,
    onChange?: (arg0: CalendarProps, arg1: dateTableType) => void,
    onClick?: (arg0: any) => void,
    onToggle?: (arg0: boolean) => void
}

export interface CalendarRowProps extends renderCustom {
    list: dateTableRow,
    selected?: number,
    rowIndex: number,
    mouseDown: (arg0: React.MouseEvent<HTMLDivElement, MouseEvent>, arg1: dateTableCell, arg2: CalendarRowProps, arg3: number) => void,
    mouseMove: (arg0: React.MouseEvent<HTMLDivElement, MouseEvent>, arg1: dateTableCell, arg2: CalendarRowProps, arg3: number) => void,
    mouseUp: (arg0: React.MouseEvent<HTMLDivElement, MouseEvent>, arg1: dateTableCell, arg2: CalendarRowProps, arg3: number) => void,
}

export interface CalendarWeekProps extends renderCustom {
    firstDayOfWeek: number,
}

export interface CalendarChangeParam {
    date: Date,
    firstDayOfWeek: number,
}

export const defaultProps = {
    date: new Date(),
    firstDayOfWeek: 1,
    isFixedRows: false,
    taskData: [],
    taskDataDateMap: 'date',
    cellHeight: 50,
}
