//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Underline } from "@styled-icons/boxicons-regular";
//import STORE from '@/store'

import styles from './UnderlineEditor.module.scss'
const StyledUnderlineIcon = styled(Underline)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const UnderlineEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledUnderlineIcon />
        </button>
	)
};

export default UnderlineEditor;
