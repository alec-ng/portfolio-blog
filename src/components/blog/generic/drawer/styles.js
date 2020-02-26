import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const drawerWidth = 325;

export const DrawerContainer = styled.div`
  padding: 50px 25px 30px 25px;
  color: rgb(184, 183, 173);
`;

export const useStyles = makeStyles(theme => ({
  colorPrimary: {
    backgroundColor: "rgb(55, 58, 71)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "rgb(255,69,0)"
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#373a47",
    "&::-webkit-scrollbar": {
      width: "5px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(255, 69, 0)",
      borderRadius: "5px"
    },
    "&::-webkit-scrollbar-track": {
      opacity: "0",
      margin: "5px 0"
    }
  },
  paperAnchorDockedLeft: {
    borderRight: "none"
  },
  content: {
    flexGrow: 1,
    position: "relative",
    height: "100%"
  }
}));
