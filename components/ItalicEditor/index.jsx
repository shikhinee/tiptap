//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Italic } from "@styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './ItalicEditor.module.scss'
const StyledItalicIcon = styled(Italic)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const ItalicEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledItalicIcon />
        </button>
	)
};

export default ItalicEditor;
