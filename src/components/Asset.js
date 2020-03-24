import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  iframe: {
    width: "100%",
    height: "calc(100% - 50px)",
    borderRadius: "0px",
    boxShadow: "none"
  }
}));

const AssetComponent = React.forwardRef((props, assetRef) => {
  const classes = useStyles();

  return (
    <Paper
      id="assetManager"
      ref={assetRef}
      component="iframe"
      frameBorder="no"
      scrolling="yes"
      classes={{ root: classes.iframe }}
      src={
        window.tsQeditor.get("plugin", "assetManager") &&
        window.tsQeditor.get("plugin", "assetManager").url
      }
    ></Paper>
  );
});

export default AssetComponent;
