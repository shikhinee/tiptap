//Next, React (core node_modules) imports must be placed here
import styled from 'styled-components';
import { FormatListNumbered } from "styled-icons/material";

//import STORE from '@/store'

import styles from './OrderedListEditor.module.scss'
const StyledFormatListNumberedIcon = styled(FormatListNumbered)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const OrderedListEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledFormatListNumberedIcon />
        </button>
	)
};

export default OrderedListEditor;
