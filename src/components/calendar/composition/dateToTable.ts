import {CalendarProps, dateTableCell, dateTableRow, dateTableType} from '../types';
import {getDays} from './dateListMethod.ts'; // Assuming these utilities are defined

const addZero = (n: number) => {
    if (n < 10) {
        return '0' + n
    } else {
        return n;
    }
}

export const getDateTable = (props: CalendarProps): dateTableType => {
    const {date, firstDayOfWeek} = props;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const daysInCurrentMonth = getDays(year)[month]; // 当月的总天数
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 一个月开始于星期几
    const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // 将周日调整为7点

    // 计算显示上个月的天数
    const startPrevMonthDays = (adjustedFirstDay - firstDayOfWeek + 7) % 7;

    // 获取上个月的年份和月份
    const [prevMonth, prevMonthYear] = adjustMonthYear(month - 1, year);
    const daysInPrevMonth = getDays(prevMonthYear)[prevMonth]; // 上个月的总天数

    // 开始构建日期数组
    const dateArray: dateTableRow = [];

    // 上月的天数
    for (let i = startPrevMonthDays; i > 0; i--) {
        dateArray.push(createDateObject(prevMonthYear, prevMonth, daysInPrevMonth - i + 1, -1));
    }

    // 当月的天数
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        dateArray.push(createDateObject(year, month, i, 1, i === day));
    }

    // 计算剩余天数以填充日历网格
    const remainingDays = 42 - dateArray.length;

    // 下个月的天数
    const [nextMonth, nextMonthYear] = adjustMonthYear(month + 1, year);
    for (let i = 1; i <= remainingDays; i++) {
        dateArray.push(createDateObject(nextMonthYear, nextMonth, i, 0));
    }
    // 将日期数组转换为周
    return convertToWeeks(dateArray);
};

const adjustMonthYear = (month: number, year: number): [number, number] => {
    if (month < 0) return [11, year - 1];
    if (month > 11) return [0, year + 1];
    return [month, year];
};

const createDateObject = (
    year: number,
    month: number,
    day: number,
    status: number,
    active: boolean = false
): dateTableCell => {
    return {
        status,
        day,
        active,
        year,
        month,
        dateStr: `${year}-${addZero(month + 1)}-${addZero(day)}`
    };
};

const convertToWeeks = (dates: dateTableRow): dateTableType => {
    const weeks: dateTableType = [];
    for (let i = 0; i < dates.length; i += 7) {
        weeks.push(dates.slice(i, i + 7));
    }
    return weeks;
};
