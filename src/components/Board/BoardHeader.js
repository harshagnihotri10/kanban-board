
// Importing necessary dependencies and components from React and other modules
import React, { useContext, useState } from "react";
import "./style.css";
import { ContextMenu, ContextMenuItem } from "../ContextMenu/index";
import { displayOptions } from "../../helpers/constants";
import { capitalizeString } from "../../helpers/utils";
import { BoardContext } from "./state";
import { VscSettings } from "react-icons/vsc";
import { MdArrowDownward, MdArrowDropDown } from "react-icons/md";

// Functional component definition for rendering the board header
const BoardHeader = ({ handleDisplayChange }) => {
  // Accessing display context from BoardContext
  const { display } = useContext(BoardContext);

  // State to manage the context menu trigger element
  const [contextMenuTriggerElement, setContextMenuTriggerElement] =
    useState(null);

  // Checking if the context menu is open
  const open = Boolean(contextMenuTriggerElement);

  // Rendering the board header component
  return (
    <div className="board__header">
      <div className="board__header-wrapper">
        {/* Button to trigger the display options context menu */}
        <button
          className="button border--gray flex align-center gap-2"
          onClick={(e) => {
            setContextMenuTriggerElement(e.target);
          }}
        >
          Display
        </button>
        {/* Displaying the context menu with display options */}
        <ContextMenu
          open={open}
          onClose={() => setContextMenuTriggerElement(null)}
          triggerElement={contextMenuTriggerElement}
        >
          {/* Mapping through display options and rendering context menu items */}
          {Object.keys(displayOptions).map((key) => {
            const data = displayOptions[key];
            return (
              <ContextMenuItem key={`display-option-${data.key}`}>
                {/* Displaying the display option title */}
                <span className="text text--dark">{data.title}</span>
                {/* Select input for changing the display option value */}
                <select
                  name={data.key}
                  placeholder="select"
                  onChange={handleDisplayChange}
                  value={display[data.key]}
                >
                  {/* Mapping through display option values and rendering options */}
                  {data &&
                    Object.keys(data.options).map((optionKey, index) => {
                      return (
                        <option
                          key={`${data.key}-${optionKey}-${index}`}
                          value={data.options[optionKey]}
                        >
                          {/* Capitalizing and displaying the option value */}
                          {capitalizeString(optionKey)}
                        </option>
                      );
                    })}
                </select>
              </ContextMenuItem>
            );
          })}
        </ContextMenu>
      </div>
    </div>
  );
};

// Exporting the BoardHeader component as the default export
export default BoardHeader;
