//Next, React (core node_modules) imports must be placed here
import styled from 'styled-components';
import { FormatListBulleted } from "styled-icons/material";

//import STORE from '@/store'

import styles from './BulletListEditor.module.scss'
const StyledFormatListBulletedIcon = styled(FormatListBulleted)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const BulletListEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledFormatListBulletedIcon />
        </button>
	)
};

export default BulletListEditor;
