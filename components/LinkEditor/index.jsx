//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { LinkAlt } from "styled-icons/boxicons-regular";
//import STORE from '@/store'

import styles from './LinkEditor.module.scss'
const StyledLinkIcon = styled(LinkAlt)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const LinkEditor = ({editor, setLink, ...props}) => {
	 return (
        <button
          onClick={setLink}
          className={
            editor.isActive("link")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledLinkIcon />
        </button>
	)
};

export default LinkEditor;
