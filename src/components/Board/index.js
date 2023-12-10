

// Importing necessary dependencies and components from React and other modules
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardHeader from "./BoardHeader";
import "./style.css";
import {
  getBoardColumns,
  getDataByViewState,
  getMapByKey,
} from "../../helpers/utils";
import BoardColumn from "./BoardColumn";
import { BoardContext, initialViewState } from "./state";
import { BOARD_VIEW_STATE_KEY, displayOptions } from "../../helpers/constants";

// Functional component definition for rendering the board
const Board = () => {
  // State for managing the display options and board data
  const [display, setDisplay] = useState(
    JSON.parse(localStorage.getItem(BOARD_VIEW_STATE_KEY)) || initialViewState
  );
  const [boardData, setBoardData] = useState(null);

  // Boolean indicating whether the board is grouped by user
  const isGroupByUser =
    displayOptions.grouping.options.user === display.grouping;

  // Callback function for handling changes in display options
  const handleDisplayChange = useCallback((e) => {
    const { name, value } = e.target;
    const _tempDisplay = { ...display, [name]: value };
    localStorage.setItem(BOARD_VIEW_STATE_KEY, JSON.stringify(_tempDisplay));
    setDisplay(_tempDisplay);
  }, [display]);

  // Memoized map of users for efficient lookup
  const usersMap = useMemo(() => {
    return boardData?.users?.length > 0
      ? getMapByKey("id", boardData?.users)
      : {};
  }, [boardData]);

  // Memoized columns based on grouping or usersMap
  const columns = useMemo(() => {
    return isGroupByUser ? usersMap : getBoardColumns(display.grouping);
  }, [usersMap, display]);

  // Memoized data grouped by the current view state
  const dataByGroup = useMemo(() => {
    return getDataByViewState(
      display.grouping,
      display.ordering,
      boardData?.tickets
    );
  }, [boardData, display, getDataByViewState]);

  // Fetching board data from the API on component mount
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        // Handle error if fetching data fails
      }
    })();
  }, []);

  // Rendering the Board component
  return (
    <BoardContext.Provider value={{ display, usersMap, isGroupByUser }}>
      <div>
        {/* Rendering the board header component with display options */}
        <BoardHeader handleDisplayChange={handleDisplayChange} />
        <div className="board__content">
          <div className="board__scrollable-content">
            {/* Mapping through columns and rendering BoardColumn components */}
            {Object.keys(columns).map((key) => {
              return (
                <BoardColumn
                  columnData={dataByGroup[key]}
                  key={key}
                  headerData={columns[key]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
};

// Exporting the Board component as the default export
export default Board;
