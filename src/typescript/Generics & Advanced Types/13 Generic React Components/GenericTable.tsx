// GenericTable.tsx
import { ReactNode } from "react"
 
// A generic table component — works for any array of objects
// T must be an object
 
// Column config — defines how each column maps to data
// key: which property of T to use for sorting/reference
// header: the column heading to display
// render: a function that receives the row item and returns what to display
type Column<T> = {
  key: keyof T      // key must be an actual key of T
  header: string
  render: (item: T) => ReactNode
}
 
type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number   // unique key per row
}
 
export function GenericTable<T,>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={keyExtractor(item)}>
            {columns.map(col => (
              <td key={String(col.key)}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

