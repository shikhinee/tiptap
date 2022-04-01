import dynamic from "next/dynamic";
import { useCallback, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
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
import DropdownEditor from "@/components/DropdownEditor";
import BoldEditor from "@/components/BoldEditor";
import ItalicEditor from "@/components/ItalicEditor";
import UnderlineEditor from "@/components/UnderlineEditor";
import StrikeEditor from "@/components/StrikeEditor";
import HighlightEditor from "@/components/HightlightEditor";
import ColorEditor from "@/components/ColorEditor";
import AlignLeftEditor from "@/components/AlignLeftEditor";
import AlignCenterEditor from "@/components/AlignCenterEditor";
import AlignRightEditor from "@/components/AlignRightEditor";
import QuoteEditor from "@/components/QuoteEditor";
import LinkEditor from "@/components/LinkEditor";
import ImageEditor from "@/components/ImageEditor";
import TableEditor from "@/components/TableEditor";
import CodeBlockEditor from "@/components/CodeBlockEditor";
import CodeEditor from "@/components/CodeEditor";
import BulletListEditor from "@/components/BulletListEditor";
import OrderedListEditor from "@/components/OrderedListEditor";
import SubscriptEditor from "@/components/SubscriptEditor";
import SuperscriptEditor from "@/components/SuperscriptEditor";
import UndoEditor from "@/components/UndoEditor";
import RedoEditor from "@/components/RedoEditor";
import styles from "./Editor.module.scss";

const lowlight = dynamic(() => import("lowlight"), {
  ssr: false,
});
const Editor = (props) => {
  const [selectedHeading, setSelectedHeading] = useState("H1");

  const editor = useEditor({
    extensions: [
      BubbleMenu,
      Document,
      Paragraph,
      Text,
      Blockquote,
      OrderedList,
      BulletList,
      ListItem,
      TaskList,
      TaskItem,
      Bold.configure({
        HTMLAttributes: {
          class: "bold",
        },
      }),
      Italic,
      Color,
      Strike,
      Code,
      CharacterCount.configure(),
      CodeBlockLowlight.configure({
        defaultLanguage: "plaintext",
        lowlight,
      }),
      Image,
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
        openOnClick: true,
        linkOnPaste: true,
        openOnClick: true,
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write something …",
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
    <h1>Hello World</h1>
    <h2>Hello World</h2>
    <h3>Hello World</h1>
    `,
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleHeading = (e) => {
    if (!e.target.tagName.startsWith("H")) return;
    setSelectedHeading(e.target.tagName);
  };

  const fixedMenu = [
    <DropdownEditor editor={editor} value={selectedHeading} onChange={setSelectedHeading}/>,
    <BoldEditor editor={editor} />,
    <ItalicEditor editor={editor} />,
    <UnderlineEditor editor={editor} />,
    <StrikeEditor editor={editor} />,
    <HighlightEditor editor={editor} />,
    <ColorEditor editor={editor} />,
    <AlignLeftEditor editor={editor} />,
    <AlignCenterEditor editor={editor} />,
    <AlignRightEditor editor={editor} />,
    <QuoteEditor editor={editor} />,
    <LinkEditor editor={editor} setLink={setLink} />,
    <ImageEditor editor={editor} addImage={addImage} />,
    <TableEditor editor={editor} />,
    <CodeBlockEditor editor={editor} />,
    <CodeEditor editor={editor} />,
    <BulletListEditor editor={editor} />,
    <OrderedListEditor editor={editor} />,
    <SubscriptEditor editor={editor} />,
    <SuperscriptEditor editor={editor} />,
    <UndoEditor editor={editor} />,
    <RedoEditor editor={editor} />,
  ];
  const bubbleMenu = [
    <BoldEditor editor={editor} />,
    <ItalicEditor editor={editor} />,
    <UnderlineEditor editor={editor} />,
    <StrikeEditor editor={editor} />,
    <HighlightEditor editor={editor} />,
    <AlignLeftEditor editor={editor} />,
    <AlignCenterEditor editor={editor} />,
    <AlignRightEditor editor={editor} />,
    <SubscriptEditor editor={editor} />,
    <SuperscriptEditor editor={editor} />,
    <UndoEditor editor={editor} />,
    <RedoEditor editor={editor} />,
  ];
  const floatingMenu = [
    <DropdownEditor editor={editor} value={selectedHeading} onChange={setSelectedHeading} />,
    <QuoteEditor editor={editor} />,
    <LinkEditor editor={editor} setLink={setLink} />,
    <ImageEditor editor={editor} addImage={addImage} />,
    <TableEditor editor={editor} />,
    <CodeBlockEditor editor={editor} />,
    <CodeEditor editor={editor} />,
    <BulletListEditor editor={editor} />,
    <OrderedListEditor editor={editor} />,
  ];

  return (
    <>
      {/* FIXED MENU */}
      {editor && (
        <div className={styles.fixedMenu}>
          {fixedMenu.map((item, index) => {
            return (
              <div key={index} className={styles.fixedMenuItem}>
                {item}
              </div>
            );
          })}
        </div>
      )}
      {editor && (
        <BubbleMenu
          className={styles.bubbleMenu}
          editor={editor}
          tippyOptions={{ duration: 100, maxWidth: "max-content" }}
        >
          {bubbleMenu.map((item, index) => {
            return (
              <div key={index} className={styles.bubbleMenuItem}>
                {item}
              </div>
            );
          })}
        </BubbleMenu>
      )}
      {/* FLOATING MENU */}
      {editor && (
        <FloatingMenu
          className={styles.floatingMenu}
          editor={editor}
          tippyOptions={{ duration: 100, maxWidth: "max-content" }}
        >
          {floatingMenu.map((item, index) => {
            return (
              <div key={index} className={styles.floatingMenuItem}>
                {item}
              </div>
            );
          })}
        </FloatingMenu>
      )}
      <button onClick={addImage}>setImage</button>
      <EditorContent
        editor={editor}
        onClick={handleHeading}
        className={styles.textArea}
      />
      {editor.storage.characterCount.words()} words
    </>
  );
};

export default Editor;
