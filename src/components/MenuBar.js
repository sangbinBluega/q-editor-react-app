import React, { useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "30px",
    display: !(
      window.tsQeditor.get("open", "open") ||
      window.tsQeditor.get("file", "onOpen")
    )
      ? "none"
      : "block"
  },
  appBar: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    boxShadow: "none"
  },
  toolBar: {
    minHeight: "100%",
    paddingLeft: "10px"
  },
  menuText: {
    padding: "0 0 5 0px",
    color: "black",
    fontSize: "15px"
  },
  menuIcon: {
    paddingRight: "10px",
    fontSize: "15px"
  }
}));

function useHookWithRefCallback() {
  const refMenuOpen = useRef(null);
  const setRef = useCallback(node => {
    if (refMenuOpen.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    refMenuOpen.current = node;

    if (
      window.tsQeditor.get("file", "open") ||
      window.tsQeditor.get("file", "onOpen")
    ) {
      window.tsQeditor
        .get("file", "onBuildMenu")
        .call(window.tsQeditor, "open", refMenuOpen.current); // Tag에 추가할 작업이 있으면 하도록 호출함
    }
  }, []);

  return [setRef];
}

const MenuBarComponent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fileMenuOpen = Boolean(anchorEl);

  const [helpOpen, setOpen] = React.useState(false);

  const [refMenuOpen] = useHookWithRefCallback();

  const clickFile = event => {
    setAnchorEl(event.currentTarget);
  };

  const fileClose = event => {
    setAnchorEl(null);
  };

  const clickOpen = () => {
    if (window.tsQeditor.get("file", "onOpen")) {
      window.tsQeditor.get("file", "onOpen");
    }
    setAnchorEl(null);
  };

  const clickNew = () => {
    //Todo..
    setAnchorEl(null);
  };

  const clickSave = () => {
    if (window.tsQeditor.Q && window.tsQeditor.get("file", "save")) {
      window.tsQeditor.get("file", "save")(
        window.tsQeditor.Q,
        window.tsQeditor.fileName
      );
    }

    setAnchorEl(null);
  };

  const clickHelp = () => {
    setOpen(true);
  };

  const helpClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={clickFile}
              className={classes.menuText}
            >
              File
            </IconButton>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={clickHelp}
              className={classes.menuText}
            >
              Help
            </IconButton>

            <Dialog
              open={helpOpen}
              onClose={helpClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"문항생성기"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  설명
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={helpClose} color="primary" autoFocus>
                  닫기
                </Button>
              </DialogActions>
            </Dialog>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={fileMenuOpen}
              onClose={fileClose}
            >
              <MenuItem
                onClick={clickNew}
                style={{
                  display: !(
                    window.tsQeditor.get("file", "new") ||
                    window.tsQeditor.get("file", "onNew")
                  )
                    ? "none"
                    : "block"
                }}
              >
                <CreateNewFolderIcon className={classes.menuIcon} />
                new
              </MenuItem>
              <MenuItem onClick={clickOpen} ref={refMenuOpen}>
                <FolderOpenIcon className={classes.menuIcon} />
                open
              </MenuItem>
              <MenuItem
                id="menuBtnFileSave"
                onClick={clickSave}
                style={{
                  display: !(
                    window.tsQeditor.get("file", "save") ||
                    window.tsQeditor.get("file", "onSave")
                  )
                    ? "block"
                    : "none"
                }}
              >
                <SaveAltIcon className={classes.menuIcon} />
                save
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBarComponent;
