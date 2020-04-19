import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    marginRight: "5px",
    marginBottom: "5px"
  },
  outlinedPrimary: {
    color: "rgb(255,69,0)",
    border: "1px solid rgb(255,69,0)",
    "&:hover": {
      backgroundColor: "rgba(255,69,0, 0.1)",
      border: "1px solid rgb(255,69,0)"
    }
  }
})(Button);

/**
 * Render group of key/label pairs as buttons
 * Fires onClick, returning key
 * includeAll will just render a button whose key is null
 */
export default function ButtonGroupInput({
  selected,
  onButtonClick,
  values = [],
  includeAll
}) {
  let buttonList = values.map(val => {
    const isActive = selected === val.key;
    return (
      <ToggleBtn
        onButtonClick={btnClick}
        isActive={isActive}
        dataKey={val.key}
        key={val.key}
        label={val.label}
      />
    );
  });
  if (includeAll) {
    buttonList.unshift(
      <ToggleBtn
        onButtonClick={btnClick}
        isActive={selected === null || selected === undefined}
        dataKey={null}
        key="all-btn"
        label={"All"}
      />
    );
  }
  function btnClick(e) {
    onButtonClick(e.currentTarget.dataset.key);
  }

  return <div>{buttonList}</div>;
}

function ToggleBtn({ isActive, onButtonClick, dataKey, label }) {
  return (
    <StyledButton
      onClick={onButtonClick}
      variant="outlined"
      color={isActive ? "primary" : "default"}
      data-key={dataKey}
    >
      {label}
    </StyledButton>
  );
}
