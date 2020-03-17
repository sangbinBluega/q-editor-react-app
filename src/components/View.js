import React, { useEffect, useState } from "react";
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
const ViewComponent = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const qsetUiOnLoad = () => {
    if (!window.tsQeditor.Q) return;

    let qset = window.tsQeditor.qsetBuild(window.tsQeditor.Q);

    if (qset) {
      ref.current.contentWindow.postMessage(
        {
          mqf: {
            event: "runQset",
            data: { q: { $EDIT: window.tsQeditor.Q }, qset: qset }
          }
        },
        "*"
      );
    } else {
      //  Q에 해당하는 Qui가 없거나, Qui 정보에 문제가 있는 경우임
      ref.current.src = window.tsQeditor.get("plugin", "qsetUi");
    }
  };

  return (
    <Paper
      id="qset"
      ref={ref}
      component="iframe"
      frameBorder="no"
      scrolling="no"
      classes={{ root: classes.iframe }}
      onLoad={qsetUiOnLoad}
    ></Paper>
  );
});

export default ViewComponent;
