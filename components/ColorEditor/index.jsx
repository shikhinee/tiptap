//Next, React (core node_modules) imports must be placed here
//import STORE from '@/store'

import styles from './ColorEditor.module.scss'

const ColorEditor = ({editor, ...props}) => {
	 return (
        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          className={styles.colorInput}
          value={editor.getAttributes("textStyle").color}
        />
	)
};

export default ColorEditor;
