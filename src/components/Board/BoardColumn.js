

// Importing necessary dependencies and components from React and other modules
import React, { useContext } from "react";
import { MdMoreHoriz, MdAdd } from "react-icons/md";
import { renderIcon } from "../../helpers/utils";
import UserProfileIcon from "./UserProfileIcon";
import BoardCard from "./BoardCard";
import { BoardContext } from "./state";

// Functional component definition for rendering a board column
const BoardColumn = ({ columnData = [], headerData }) => {
  // Accessing the isGroupByUser property from the BoardContext
  const { isGroupByUser } = useContext(BoardContext);

  // Rendering the board column component
  return (
    <div className="board__column">
      <div className="board__column-header">
        <div className="board__column-header--options">
          {/* Rendering user profile icon or custom header icon based on grouping */}
          {!isGroupByUser ? (
            renderIcon(headerData?.icon)
          ) : (
            <UserProfileIcon userName={headerData.name} />
          )}
          {/* Displaying the column header name */}
          <p className="text">{headerData.name}</p>
          {/* Displaying the number of items in the column */}
          <span className="text text--gray">{columnData.length}</span>
        </div>
        <div className="board__column-header--options">
          {/* Rendering icons for add and more options */}
          {renderIcon(MdAdd)}
          {renderIcon(MdMoreHoriz)}
        </div>
      </div>
      <div className="board__column-data">
        {/* Mapping through column data and rendering BoardCard components */}
        {columnData.map((item) => (
          <BoardCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

// Exporting the BoardColumn component as the default export
export default BoardColumn;
