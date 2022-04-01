//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { AlignRight } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './AlignRightEditor.module.scss'
const StyledAlignRight = styled(AlignRight)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const AlignRightEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledAlignRight />
        </button>
	)
};

export default AlignRightEditor;
