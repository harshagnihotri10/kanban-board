

// Importing necessary dependencies and utility functions from React and other modules
import React from "react";
import { generateRandomHexColorCode, getInitials } from "../../helpers/utils";

// Functional component definition for rendering a user profile icon
const UserProfileIcon = ({ url, userName }) => {
  // Rendering the user profile icon component
  return (
    <div>
      <div
        style={{
          // Setting background style based on provided URL or generating a random color
          background: url
            ? `url("${url}") no-repeat fixed center`
            : generateRandomHexColorCode(),
        }}
        className="board__card-user-profile"
      >
        {/* Rendering user initials if no URL is provided and userName is available */}
        {!url && userName && <span>{getInitials(userName)}</span>}
      </div>
    </div>
  );
};

// Exporting the UserProfileIcon component as the default export
export default UserProfileIcon;
