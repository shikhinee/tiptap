//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Code } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './CodeEditor.module.scss'
const StyledCodeIcon = styled(Code)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const CodeEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().setCode().run()}
          className={
            editor.isActive("code")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledCodeIcon />
        </button>
	)
};

export default CodeEditor;
