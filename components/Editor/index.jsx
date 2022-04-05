import NextImage from "next/image";
import { useState } from "react";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import Heading from "@tiptap/extension-heading";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

// EXTENSIONS
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import History from "@tiptap/extension-history";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";

// TABLE NODE
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

// CODE NODE
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Code from "@tiptap/extension-code";

// LIST NODE
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

// BLOCKQUOTE NODE
import Blockquote from "@tiptap/extension-blockquote";

// TEXT STYLING
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";

// SCRIPT NODE
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

// ICONS
import { Bold as BoldIcon } from "@styled-icons/boxicons-regular";
import { Italic as ItalicIcon } from "@styled-icons/boxicons-regular";
import { Underline as UnderlineIcon } from "@styled-icons/boxicons-regular";
import { Strikethrough as StrikethroughIcon } from "styled-icons/boxicons-regular";
import { Highlight as HighlightIcon } from "styled-icons/boxicons-regular";
import { AlignLeft as AlignLeftIcon } from "styled-icons/boxicons-regular";
import { AlignMiddle as AlignMiddleIcon } from "styled-icons/boxicons-regular";
import { AlignRight as AlignRightIcon } from "styled-icons/boxicons-regular";
import { QuoteLeft as QuoteLeftIcon } from "styled-icons/boxicons-solid";
import { LinkAlt as LinkAltIcon } from "styled-icons/boxicons-regular";
import { ImageAdd as ImageAddIcon } from "styled-icons/boxicons-regular";
import { Table as TableIcon } from "styled-icons/boxicons-regular";
import { CodeBlock as CodeBlockIcon } from "styled-icons/boxicons-regular";
import { Code as CodeIcon } from "styled-icons/boxicons-regular";
import { FormatListBulleted as UListIcon } from "styled-icons/material";
import { FormatListNumbered as OListIcon } from "styled-icons/material";
import { Subscript as SubIcon } from "styled-icons/foundation";
import { Superscript as SupIcon } from "styled-icons/foundation";
import { Undo as UndoIcon } from "styled-icons/boxicons-regular";
import { Redo as RedoIcon } from "styled-icons/boxicons-regular";

// HIGHLIGHT
import { lowlight } from "lowlight";

import styles from "./Editor.module.scss";

const Editor = (props) => {
  const [linkModalIsOpen, setLinkModalIsOpen] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [currentSelectedImage, setCurrentSelectedImage] = useState({
    src: "",
    file: "",
  });
  const [selectedHeading, setSelectedHeading] = useState("H1");

  const editor = useEditor({
    extensions: [
      BubbleMenu,
      Document,
      Paragraph,
      Text,
      Blockquote.configure({
        HTMLAttributes: {
          class: styles.blockquote,
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: styles.olist,
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: styles.ulist,
        },
      }),
      ListItem,
      TaskList,
      TaskItem,
      Bold.configure({
        HTMLAttributes: {
          class: styles.sfBold,
        },
      }),
      Italic,
      Color,
      Strike,
      Code.configure({
        HTMLAttributes: {
          class: styles.code,
        },
      }),
      CharacterCount.configure(),
      CodeBlockLowlight.configure({
        HTMLAttributes: {
          class: "hljs",
        },
        lowlight,
        languageClassPrefix: "language-",
        defaultLanguage: "javascript",
      }),
      Image.configure({
        HTMLAttributes: {
          class: styles.image,
        },
        inline: true,
      }),
      Dropcursor,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Highlight.configure({ multicolor: true }),
      History,
      HorizontalRule,
      Subscript,
      Superscript,
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: styles.link,
        },
        openOnClick: true,
        linkOnPaste: true,
        openOnClick: true,
      }),
      Placeholder.configure({
        emptyNodeClass: styles.placeholder,
        showOnlyWhenEditable: false,

        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Гарчиг";
          }

          if (node.type.name === "codeBlock") {
            return "console.log('Hello world');";
          }

          return "Агуулга";
        },
      }),
      Table.configure({
        HTMLAttributes: {
          class: styles.table,
        },
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    content: ``,
  });

  if (!editor) {
    return null;
  }

  const handleLink = (e) => {
    e.preventDefault();
    setLinkModalIsOpen(false);

    const url = e.target.querySelector("input").value;

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImage = (e) => {
    e.preventDefault();

    if (currentSelectedImage.src) {
      editor.chain().focus().setImage({ src: currentSelectedImage.src }).run();
      setImagesToUpload([...imagesToUpload, currentSelectedImage.file]);
    }

    console.log([...imagesToUpload, currentSelectedImage.file]);
  };

  const handleHeading = (e) => {
    if (!e.target.tagName.startsWith("H")) {
      setSelectedHeading("");
      return;
    }

    setSelectedHeading(e.target.tagName);
  };

  const handleHeadingChange = (e) => {
    setSelectedHeading(e.target.value);

    if (e.target.value === "") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setHeading({
        level: +e.target.value.replace("H", ""),
      })
      .run();
  };

  return (
    <div className={styles.container}>
      {/* HREF MODAL */}
      {linkModalIsOpen && (
        <div className={styles.linkModal}>
          <div
            className={styles.backDrop}
            onClick={() => {
              setLinkModalIsOpen(false);
            }}
          ></div>
          <form className={styles.linkModal__content} onSubmit={handleLink}>
            <label htmlFor="setLink" className={styles.linkModal__label}>
              URL
            </label>
            <input
              name="setLink"
              id="setLink"
              type="url"
              placeholder="https://"
              defaultValue={editor.getAttributes("link").href}
              className={styles.linkModal__input}
            />
            <div className={styles.linkModal__buttons}>
              <button
                type="button"
                onClick={() => {
                  setLinkModalIsOpen(false);
                }}
              >
                Буцах
              </button>
              <button type="submit">Өөрчлөх</button>
            </div>
          </form>
        </div>
      )}
      {imageModalIsOpen && (
        <div className={styles.imageModal}>
          <div
            className={styles.backDrop}
            onClick={() => {
              setImageModalIsOpen(false);
            }}
          ></div>
          <form className={styles.imageModal__content} onSubmit={handleImage}>
            <label htmlFor="setImage" className={styles.imageModal__label}>
              URL
            </label>
            <input
              name="setImage"
              id="setImage"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                console.log(file);
                setCurrentSelectedImage({
                  file: file,
                  src: url,
                });
              }}
              className={styles.imageModal__input}
            />

            {currentSelectedImage.src && (
              <div className={styles.imageModal__previewContainer}>
                <NextImage
                  src={currentSelectedImage.src}
                  alt={currentSelectedImage.file.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className={styles.imageModal__buttons}>
              <button
                type="button"
                onClick={() => {
                  setImageModalIsOpen(false);
                }}
              >
                Буцах
              </button>
              <button type="submit">Нэмэх</button>
            </div>
          </form>
        </div>
      )}
      {/* MAIN MENU */}
      {editor && (
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
      )}
      {/* BUBBLE MENU */}
      {editor && (
        <BubbleMenu
          className={styles.bubbleMenu}
          editor={editor}
          tippyOptions={{ duration: 100, maxWidth: "max-content" }}
        >
          {/* <BoldEditor editor={editor} />
          <ItalicEditor editor={editor} />
          <UnderlineEditor editor={editor} />
          <StrikeEditor editor={editor} />
          <HighlightEditor editor={editor} />
          <AlignLeftEditor editor={editor} />
          <AlignCenterEditor editor={editor} />
          <AlignRightEditor editor={editor} />
          <SubscriptEditor editor={editor} />
          <SuperscriptEditor editor={editor} />
          <UndoEditor editor={editor} />
          <RedoEditor editor={editor} /> */}
        </BubbleMenu>
      )}
      {/* FLOATING MENU */}
      {editor && (
        <FloatingMenu
          className={styles.floatingMenu}
          editor={editor}
          tippyOptions={{ duration: 100, maxWidth: "max-content" }}
        >
          {/* <DropdownEditor
            editor={editor}
            value={selectedHeading}
            onChange={setSelectedHeading}
          />
          <QuoteEditor editor={editor} />
          <LinkEditor editor={editor} setLink={setLink} />
          <ImageEditor editor={editor} addImage={addImage} />
          <TableEditor editor={editor} />
          <CodeBlockEditor editor={editor} />
          <CodeEditor editor={editor} />
          <BulletListEditor editor={editor} />
          <OrderedListEditor editor={editor} /> */}
        </FloatingMenu>
      )}
      <EditorContent
        editor={editor}
        onClick={handleHeading}
        className={styles.textArea}
      />
      {editor.storage.characterCount.words()} words
    </div>
  );
};

export default Editor;
