import {FC} from 'react'
import styles from './styles/calendar.module.css';
import {getWeekData, weekDataItemType} from './composition/dateListMethod.ts';
import {CalendarWeekProps} from "./types";
const renderItem = (item:weekDataItemType,customWeek:CalendarWeekProps['customWeek']):JSX.Element =>{
    if(customWeek){
        return customWeek(item)
    }else {
        return <div key={'calendar-week-index' + item.weekIndex} className={styles.calendarWeekItemCell}>{item.label}</div>
    }
}
const calendarWeek: FC<CalendarWeekProps> = (props) => {
    let weekData = getWeekData(props.firstDayOfWeek);
    return <div className={styles.calendarWeek}>
        {
            weekData.map((item)=>{
                return <div key={item.weekIndex} className={styles.calendarWeekItem}>
                    {renderItem(item,props.customWeek)}
                </div>
            })
        }
    </div>
}
export default calendarWeek;
