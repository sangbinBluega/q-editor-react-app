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

const SubjectComponent = React.forwardRef((props, subjectRef) => {
  const classes = useStyles();

  return (
    <Paper
      id="subjectManager"
      ref={subjectRef}
      component="iframe"
      frameBorder="no"
      scrolling="yes"
      classes={{ root: classes.iframe }}
      src={
        window.tsQeditor.get("plugin", "subjectManager") &&
        window.tsQeditor.get("plugin", "subjectManager").url
      }
    ></Paper>
  );
});

export default SubjectComponent;
