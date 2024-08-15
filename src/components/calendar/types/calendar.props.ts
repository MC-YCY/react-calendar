import {dateTableRow,dateTableType} from './date.table.ts';
import {weekDataItemType} from '../composition/dateListMethod.ts';
import {dateTableCell} from './date.table.ts';
export interface renderCustom{
    customWeek?:(arg0:weekDataItemType)=>JSX.Element,
    customDay?:(arg0:dateTableCell)=>JSX.Element,
}
export interface CalendarProps extends renderCustom{
    date:Date,
    firstDayOfWeek:number,
    isFixedRows?:boolean,
    taskData?:Record<string,any>[],
    taskDataDateMap?:string,
    onChange?:(arg0:CalendarProps,arg1:dateTableType)=>void,
}
export interface CalendarRowProps extends renderCustom{
    list: dateTableRow
}
export interface CalendarWeekProps extends renderCustom{
    firstDayOfWeek:number,
}
export interface CalendarChangeParam {
    date:Date,
    firstDayOfWeek:number,
}
