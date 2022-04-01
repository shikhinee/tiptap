//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { AlignMiddle } from "styled-icons/boxicons-regular";
//import STORE from '@/store'

import styles from './AlignCenterEditor.module.scss'
const StyledAlignMiddle = styled(AlignMiddle)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const AlignCenterEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledAlignMiddle />
        </button>
	)
};

export default AlignCenterEditor;
