import {
  createColumnHelper,
  type IdentifiedColumnDef,
} from "@tanstack/react-table";
import { Badge } from "./rw-components/badge/badge";
import { Button } from "./rw-components/button/button";
import { cssOf, varOf } from "./rw-components/style-helpers";
import { useTable } from "./rw-components/table/table";
import { createTheme } from "./rw-components/theme";
import { GlobalThemeProvider } from "./rw-components/theme-provider/theme-provider";
import { s } from "./rw-components/utility-styles";

const themeConfig = createTheme({
  "color-bg": "black",
  "color-fg": "white",
  "root-font-scale": "14px",
  "color-border": "white",
});

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
  hobbies?: { name: string; isExpensive: boolean }[];
  nest?: { aa: string; ab: number };
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

type TableSchema<T> = {
  [k in keyof T]?: NonNullable<T[k]> extends object[]
    ? TableSchema<NonNullable<T[k]>[number]>
    : NonNullable<T[k]> extends object
    ? TableSchema<T[k]>
    : IdentifiedColumnDef<T, string>;
};

const lol: TableSchema<Person> = {
  age: {
    header: "Age",
  },
  hobbies: {
    name: {
      header: "Hobby Name",
      cell: (props) => <div>Hobby name is </div>,
    },
    isExpensive: {
      header: "Is Expensive",
    },
  },
};

const schema: TableSchema<Person> = {
  firstName: {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  },
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
  }),
];

function App() {
  const { renderTable } = useTable({
    columns: columns,
    data: defaultData,
  });

  return (
    <>
      <GlobalThemeProvider themeConfig={themeConfig} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.brand}>ARB Editor</div>
        </div>
        <div className={styles.content}>
          <Button onClick={() => alert("hi")}>This is a button</Button>
          <Badge>BADGE</Badge>
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
          {renderTable()}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: cssOf(s.borderBox, s.flex, s.flexCol, s.minHScreen),
  header: cssOf(s.sticky, s.top(), s.flex, s.flexRow, s.alignCenter, {
    background: varOf("color-bg"),
    borderBottom: `1px solid ${varOf("color-border")}`,
    height: "3rem",
  }),
  brand: cssOf({
    fontWeight: "600",
    marginLeft: "0.5rem",
  }),
  content: cssOf({
    padding: "0.5rem",
  }),
};

export default App;
