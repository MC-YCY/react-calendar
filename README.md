# react typescript vite
一个用来回顾react，ts的仓库，顺便做一个日历组件

# calendar
## props
| 属性               | 类型                                                      | 说明                                        |
|------------------|---------------------------------------------------------|-------------------------------------------|
| date             | Date对象                                                  | 日历所展示日期的月份                                |
| firstDayOfWeek   | number                                                  | 日期展示第一列是周几                                |
| ?isFixedRows     | boolean                                                 | true固定6*7，false月份时间变化5、6自动；默认不加固定6行       |
| ?taskData        | Record<string,any>[]                                    | 用来映射任务到每天的对象中，数组列表中要含有一个日期格式的字符串，默认获取date |
| ?taskDataDateMap | string                                                  | 修改获取任务列表获取日期的字段                           |
| ?onChange        | onChange?:(arg0:CalendarProps,arg1:dateTableType)=>void | 更新日期后的事件                                  |
## props 自定义展示内容的
| 属性         | 类型                                               | 说明                               |
|------------|--------------------------------------------------|----------------------------------|
| customWeek | customWeek?:(arg0:weekDataItemType)=>JSX.Element | 自定义渲染周内容，参数内含有Date日期对象week的index |
| customDay  | customDay?:(arg0:dateTableCell)=>JSX.Element     | 自定展示日期每天的内容，返回每天的对象              |


# 后续
- 后面加入，props.data用来映射 customDay(dateTableCell)
- 加上拖动事件交互
