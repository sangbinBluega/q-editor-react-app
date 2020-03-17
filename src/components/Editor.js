import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  iframe: {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    boxShadow: "none"
  }
}));

const EditorComponent = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const editorOnLoad = () => {
    window.tsQeditor.fileLoad();
  };

  return (
    <Paper
      id="editorIF"
      ref={ref}
      component="iframe"
      frameBorder="no"
      scrolling="yes"
      classes={{ root: classes.iframe }}
      onLoad={editorOnLoad}
    ></Paper>
  );
});

export default EditorComponent;
