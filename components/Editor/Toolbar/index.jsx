//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

import styles from "./Toolbar.module.scss";

const Toolbar = ({ editor, ...props }) => {
  return (
    <div className={styles.menu}>
      <select
        className={styles.headingSelect}
        value={selectedHeading}
        onChange={handleHeadingChange}
      >
        <option value="">Гарчиг сонгох</option>
        <option value="H1">Heading 1</option>
        <option value="H2">Heading 2</option>
        <option value="H3">Heading 3</option>
        <option value="H4">Heading 4</option>
        <option value="H5">Heading 5</option>
      </select>

      <button
        className={
          editor.isActive("bold")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <BoldIcon />
      </button>

      <button
        className={
          editor.isActive("italic")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <ItalicIcon />
      </button>

      <button
        className={
          editor.isActive("underline")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <UnderlineIcon />
      </button>

      <button
        className={
          editor.isActive("strike")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <StrikethroughIcon />
      </button>

      <button
        className={
          editor.isActive("highlight")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
      >
        <HighlightIcon />
      </button>

      <input
        className={styles.colorPicker}
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#000000"}
      />

      <button
        className={
          editor.isActive({ textAlign: "left" })
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().setTextAlign("left").run();
        }}
      >
        <AlignLeftIcon />
      </button>

      <button
        className={
          editor.isActive({ textAlign: "center" })
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().setTextAlign("center").run();
        }}
      >
        <AlignMiddleIcon />
      </button>

      <button
        className={
          editor.isActive({ textAlign: "right" })
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().setTextAlign("right").run();
        }}
      >
        <AlignRightIcon />
      </button>

      <button
        className={
          editor.isActive("blockquote")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <QuoteLeftIcon />
      </button>

      <button
        className={
          editor.isActive("link")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
          } else {
            setLinkModalIsOpen(true);
          }
        }}
      >
        <LinkAltIcon />
      </button>

      <button
        className={styles.menu__item}
        onClick={() => {
          setImageModalIsOpen(true);
        }}
      >
        <ImageAddIcon />
      </button>

      <button className={styles.menu__item} onClick={() => {}}>
        <TableIcon />
      </button>

      <button
        className={
          editor.isActive("codeBlock")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        <CodeBlockIcon />
      </button>

      <button
        className={
          editor.isActive("code")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <CodeIcon />
      </button>

      <button
        className={
          editor.isActive("bulletList")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <UListIcon />
      </button>

      <button
        className={
          editor.isActive("orderedList")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <OListIcon />
      </button>

      <button
        className={
          editor.isActive("subscript")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleSubscript().run();
        }}
      >
        <SubIcon />
      </button>

      <button
        className={
          editor.isActive("superscript")
            ? `${styles.menu__item__active} ${styles.menu__item}`
            : styles.menu__item
        }
        onClick={() => {
          editor.chain().focus().toggleSuperscript().run();
        }}
      >
        <SupIcon />
      </button>

      <button
        className={styles.menu__item}
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <UndoIcon />
      </button>

      <button
        className={styles.menu__item}
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <RedoIcon />
      </button>
    </div>
  );
};

export default Toolbar;
