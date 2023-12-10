
// Importing necessary dependencies and components from React and other modules
import React, { useContext } from "react";
import * as constants from "../../helpers/constants";
import { renderIcon } from "../../helpers/utils";
import UserProfileIcon from "./UserProfileIcon";
import { MdCircle } from "react-icons/md";
import { BoardContext } from "./state";

// Functional component definition for rendering a board card
const BoardCard = ({ data }) => {
  // Destructuring values from the BoardContext to access relevant data
  const {
    display: { grouping },
    usersMap,
    isGroupByUser,
  } = useContext(BoardContext);

  // Checking if the board is grouped by status or priority
  const isGroupByStatus =
    grouping === constants.displayOptions.grouping.options.status;
  const isGroupByPriority =
    grouping === constants.displayOptions.grouping.options.priority;

  // Determining the status and priority icons based on grouping
  const statusIcon =
    !isGroupByStatus && constants.statusMap?.[data.status]?.icon;
  const priorityIcon =
    !isGroupByPriority && constants.priorityMap?.[data.priority]?.icon;

  // Fetching user details if the board is not grouped by user
  const userDetails = !isGroupByUser && usersMap[data.userId];

  // Rendering the board card component
  return (
    <div className="board__card border--gray">
      <div>
        {/* Displaying the board item ID */}
        <p className="text text--light">{data.id}</p>
        <div className="flex gap-2 board__card-title-wrapper">
          {/* Rendering status icon if applicable */}
          {statusIcon && (
            <div className="board__card-icon">{renderIcon(statusIcon)}</div>
          )}
          {/* Displaying the board item title */}
          <p className="text">{data.title}</p>
        </div>
        <div className="flex align-center gap-2">
          {/* Rendering priority icon if applicable */}
          {priorityIcon && renderIcon(priorityIcon)}
          {/* Mapping through tags and rendering tag components */}
          {data.tag.map((tag) => {
            return (
              <div
                key={`card-tag-${tag}`}
                className="border--gray gap-1 board__card-feature"
              >
                {/* Rendering circle icon for each tag */}
                {renderIcon(MdCircle)}
                <p className="text--light">{tag}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Rendering user profile icon if the board is not grouped by user */}
      {!isGroupByUser && <UserProfileIcon userName={userDetails.name} />}
    </div>
  );
};

// Exporting the BoardCard component as the default export
export default BoardCard;
