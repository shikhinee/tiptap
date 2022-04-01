//Next, React (core node_modules) imports must be placed here
import styled from 'styled-components';
import { Subscript } from "styled-icons/foundation";

//import STORE from '@/store'

import styles from './SubscriptEditor.module.scss'
const StyledSubscriptIcon = styled(Subscript)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const SubscriptEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={
            editor.isActive("subscript")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledSubscriptIcon />
        </button>
	)
};

export default SubscriptEditor;
