//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Highlight } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './HightlightEditor.module.scss'
const StyledHighlightIcon = styled(Highlight)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const HightlightEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={
            editor.isActive("highlight")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledHighlightIcon />
        </button>
	)
};

export default HightlightEditor;
