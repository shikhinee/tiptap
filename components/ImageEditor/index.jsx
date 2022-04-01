//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import { ImageAdd } from "styled-icons/boxicons-regular";
//import STORE from '@/store'

import styles from './ImageEditor.module.scss'
const StyledImageIcon = styled(ImageAdd)`
  height: 1.2em;
  margin-right: 0.3em;
`;
const ImageEditor = ({editor,addImage, ...props}) => {
	 return (
        <button onClick={addImage} className={styles.bold}>
          <StyledImageIcon />
        </button>
	)
};

export default ImageEditor;
