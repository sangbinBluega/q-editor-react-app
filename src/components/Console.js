import React, { useEffect, useRef } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { Scrollbars } from "react-custom-scrollbars";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  appBar: {
    height: "30px",
    backgroundColor: "rgb(228,234,239)",
    boxShadow: "none"
  },
  toolBar: {
    minHeight: "100%",
    padding: "0px"
  },
  title: {
    color: "rgb(36,62,83)",
    flexGrow: 1,
    paddingLeft: "10px"
  },
  clearButton: {
    color: "rgb(36,62,83)"
  }
}));

const Console = () => {
  const classes = useStyles();
  const refConsole = useRef();
  const refScroll = useRef();

  useEffect(() => {
    window.tsQeditor.set("listener", "sensor", function(/*HTML String*/ msg) {
      let consoleElement = refConsole.current;
      let scrollElement = refScroll.current;

      consoleElement.innerHTML += msg;

      consoleElement.scrollTop = consoleElement.scrollHeight;
      scrollElement.container.childNodes[0].scrollTop =
        consoleElement.scrollHeight;
    });
  });

  const clearConsole = () => {
    let element = refConsole.current;

    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}></Typography>
          <div>
            <IconButton
              edge="start"
              className={classes.clearButton}
              color="inherit"
              aria-label="menu"
              onClick={clearConsole}
              title="Clear"
            >
              <DeleteForeverIcon style={{ fontSize: "20px" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Scrollbars
        id="consoleScroll"
        ref={refScroll}
        style={{ height: "calc(100% - 40px)" }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "rgb(255, 255, 255, 0.2)"
            }}
          />
        )}
      >
        <div id="console" ref={refConsole} className="console"></div>
      </Scrollbars>
    </>
  );
};

export default Console;
