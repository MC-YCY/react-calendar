export type dateTableCellValue = string | number | null | undefined | boolean;
export type dateTableCell = Record<string, dateTableCellValue>;
export type dateTableRow = dateTableCell[];
export type dateTableType = dateTableRow[];
export type refMethods = {
    dateTable:dateTableType,
}
