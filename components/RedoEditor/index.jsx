//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Redo } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from "./RedoEditor.module.scss";
const StyledRedoIcon = styled(Redo)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const RedoEditor = ({editor, ...props}) => {
  return (
    <button
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().redo()}
      className={
        editor.isActive("redo")
          ? `${styles.isActive} ${styles.bold}`
          : `${styles.bold}`
      }
    >
      <StyledRedoIcon />
    </button>
  );
};

export default RedoEditor;
