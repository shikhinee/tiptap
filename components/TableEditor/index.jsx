//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Table as TableIcon } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './TableEditor.module.scss'
const StyledTableIcon = styled(TableIcon)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const TableEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={styles.bold}
        >
          <StyledTableIcon />
        </button>
	)
};

export default TableEditor;
