export interface dateTableCell {
    dateStr:string,
    day:number,
    month:number,
    year:number,
    active:boolean,
    status:number,
    task?:Record<string,any> | null
}
export type dateTableRow = dateTableCell[];
export type dateTableType = dateTableRow[];
export type refMethods = {
    dateTable:dateTableType,
}
