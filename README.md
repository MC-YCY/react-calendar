# react typescript vite
一个用来回顾react，ts的仓库，顺便做一个日历组件

# calendar
## props
| 属性             | 类型                                                      | 说明         |
|----------------|---------------------------------------------------------|------------|
| date           | Date对象                                                  | 日历所展示日期的月份 |
| firstDayOfWeek | number                                                  | 日期展示第一列是周几 |
| ?onChange      | onChange?:(arg0:CalendarProps,arg1:dateTableType)=>void | 更新日期后的事件   |
## props 自定义展示内容的
| 属性         | 类型                                               | 说明                               |
|------------|--------------------------------------------------|----------------------------------|
| customWeek | customWeek?:(arg0:weekDataItemType)=>JSX.Element | 自定义渲染周内容，参数内含有Date日期对象week的index |
| customDay  | customDay?:(arg0:dateTableCell)=>JSX.Element     | 自定展示日期每天的内容，返回每天的对象              |


# 后续
- 后面加入，props.data用来映射 customDay(dateTableCell)
- 加上拖动事件交互
