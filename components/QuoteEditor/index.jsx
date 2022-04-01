//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { QuoteLeft } from "styled-icons/boxicons-solid";

//import STORE from '@/store'

import styles from './QuoteEditor.module.scss'
const StyledQuoteLeft = styled(QuoteLeft)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const QuoteEditor = ({editor, ...props}) => {
	 return (
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? `${styles.isActive} ${styles.bold}`
              : `${styles.bold}`
          }
        >
          <StyledQuoteLeft />
        </button>
	)
};

export default QuoteEditor;
