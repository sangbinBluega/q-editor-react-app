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

const SentenceComponent = React.forwardRef((props, sentenceRef) => {
  const classes = useStyles();

  return (
    <Paper
      id="sentenceManager"
      ref={sentenceRef}
      component="iframe"
      frameBorder="no"
      scrolling="yes"
      classes={{ root: classes.iframe }}
      src={
        window.tsQeditor.get("plugin", "sentenceManager") &&
        window.tsQeditor.get("plugin", "sentenceManager").url
      }
    ></Paper>
  );
});

export default SentenceComponent;
