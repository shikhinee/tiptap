//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { CodeBlock } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './CodeBlockEditor.module.scss'
const StyledCodeBlockIcon = styled(CodeBlock)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const CodeBlockEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledCodeBlockIcon />
        </button>
	)
};

export default CodeBlockEditor;
