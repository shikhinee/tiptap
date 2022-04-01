//Next, React (core node_modules) imports must be placed here
import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
//import STORE from '@/store'

import styles from "./DropdownEditor.module.scss";

const DropdownEditor = ({
  editor,
  selectedHeading,
  setSelectedHeading,
  ...props
}) => {
  const options = [
    {
      tagName: "H1",
      text: "Heading 1",
      el: (
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </div>
      ),
    },
    {
      tagName: "H2",
      text: "Heading 2",
      el: (
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </div>
      ),
    },
    {
      tagName: "H3",
      text: "Heading 3",
      el: (
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </div>
      ),
    },
    {
      tagName: "H4",
      text: "Heading 4",
      el: (
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </div>
      ),
    },
    {
      tagName: "H5",
      text: "Heading 5",
      el: (
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          H5
        </div>
      ),
    },
  ];
  return (
    <Listbox as="div" value={selectedHeading} onChange={setSelectedHeading}>
      {({ open }) => (
        <>
          <div className={styles.relative}>
            <Listbox.Button className={styles.current}>
              {selectedHeading}
            </Listbox.Button>
            <Transition show={open}>
              <Listbox.Options static as="div" className={styles.options}>
                {options.map((heading, index) => {
                  return (
                    <Listbox.Option
                      key={index}
                      as="div"
                      value={heading.tagName}
                    >
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? `${styles.dropdownActive}`
                              : `${styles.dropdown}`
                          }`}
                        >
                          {heading.el}

                          {selected && (
                            <span
                              className={`${
                                active
                                  ? `${styles.dropdownActive}`
                                  : `${styles.dropdown}`
                              }`}
                            ></span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DropdownEditor;
