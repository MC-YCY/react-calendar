# 项目配置css modules
- vite示例
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' // Optional, to ensure camelCase conversion
    }
  }
})
```
- 基本使用
```js
import { FC } from "react";
const App:FC = () =>{
    return <>
        <Calendar date={new Date()} firstDayOfWeek={1}></Calendar>
    </>
} 
```
    
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
| ?open            | boolean                                                 | 带上该参数开启mouse交互，可上下拖动日历收缩只展示当前周            |
| ?onToggle        | (arg0:boolean)=>void                                    | 组件内mouse交互更新open触发                        |
| ?cellHeight      | number                                                  | 开启mouse交互需要设置每格的高度，在设置了open参数时才生效         |
| ?onClick         | (arg0:dateTableCell)=>void                              | 格子点击事件                                    |

## props 自定义展示内容的

| 属性         | 类型                                               | 说明                               |
|------------|--------------------------------------------------|----------------------------------|
| customWeek | customWeek?:(arg0:weekDataItemType)=>JSX.Element | 自定义渲染周内容，参数内含有Date日期对象week的index |
| customDay  | customDay?:(arg0:dateTableCell)=>JSX.Element     | 自定展示日期每天的内容，返回每天的对象              |


