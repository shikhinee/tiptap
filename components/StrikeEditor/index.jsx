//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { Strikethrough } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './StrikeEditor.module.scss'

const StyledStrikethrough = styled(Strikethrough)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const StrikeEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledStrikethrough />
        </button>
	)
};

export default StrikeEditor;
