//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { AlignLeft } from "styled-icons/boxicons-regular";

//import STORE from '@/store'

import styles from './AlignLeftEditor.module.scss'
const StyledAlignLeft = styled(AlignLeft)`
  height: 1.2em;
  margin-right: 0.3em;
`;

const AlignLeftEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledAlignLeft />
        </button>
	)
};

export default AlignLeftEditor;
