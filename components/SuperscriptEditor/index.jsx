//Next, React (core node_modules) imports must be placed here
import styled from 'styled-components';
import { Superscript } from "styled-icons/foundation";

//import STORE from '@/store'

import styles from "./SuperscriptEditor.module.scss";
const StyledSuperscriptIcon = styled(Superscript)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const SuperscriptEditor = ({editor, ...props}) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleSuperscript().run()}
      className={
        editor.isActive("superscript")
          ? `${styles.isActive} ${styles.bold}`
          : `${styles.bold}`
      }
    >
      <StyledSuperscriptIcon />
    </button>
  );
};

export default SuperscriptEditor;
