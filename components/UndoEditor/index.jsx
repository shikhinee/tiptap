//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Undo } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from "./UndoEditor.module.scss";
const StyledUndoIcon = styled(Undo)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const UndoEditor = ({editor, ...props}) => {
  return (
    <button
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().undo()}
      className={
        editor.isActive("undo")
          ? `${styles.isActive} ${styles.bold}`
          : `${styles.bold}`
      }
    >
      <StyledUndoIcon />
    </button>
  );
};

export default UndoEditor;
