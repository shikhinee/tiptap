//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'
import { Bold } from "@styled-icons/boxicons-regular";
import styled from "styled-components";
import styles from './BoldEditor.module.scss'
const StyledBoldIcon = styled(Bold)`
  height: 1.2em;
  margin-right: 0.3em;
`;

const BoldEditor = ({ editor, ...props }) => {
	 return (
		<button
		onClick={() => editor.chain().focus().toggleBold().run()}
		className={
		  editor.isActive("bold")
			? `${styles.isActive} ${styles.bold}`
			: `${styles.bold}`
		}
	  >
		<StyledBoldIcon />
	  </button>
	)
};

export default BoldEditor;
