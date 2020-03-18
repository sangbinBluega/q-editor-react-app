import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubjectIcon from "@material-ui/icons/Subject";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import Editor from "../components/Editor";
import Asset from "../components/Asset";
import Subject from "../components/Subject";
import Sentence from "../components/Sentence";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ height: "calc(100% - 50px)" }}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: "0px", height: "100%" }}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%"
  },
  tabs: {
    backgroundColor: "rgb(112, 131, 146)",
    width: "150px"
  },
  tab: {
    textTransform: "none",
    height: "100px",
    color: "white",
    "&:hover": { backgroundColor: "rgb(105, 126, 141)" },
    minWidth: "0"
  },
  activeTab: {
    textTransform: "none",
    height: "100px",
    color: "white",
    backgroundColor: "rgb(74, 96, 114)",
    minWidth: "0"
  },
  subRoot: { width: "100%", overflow: "hidden" },
  subAppBar: {
    height: "50px",
    backgroundColor: "rgb(228,234,239)",
    boxShadow: "none"
  },
  subToolBar: {
    minHeight: "100%"
  },
  subTitle: {
    color: "rgb(36,62,83)",
    flexGrow: 1,
    paddingLeft: "10px"
  },
  runButton: {
    color: "rgb(36,62,83)",
    display: "none"
  },
  label: {
    flexDirection: "column",
    fontSize: "15px"
  },
  playIcon: {
    fontSize: "20px"
  },
  indicator: {
    backgroundColor: "rgb(74, 96, 114)"
  },
  fileIcon: {
    color: "rgb(36,62,83)",
    display: "none"
  },
  panel: {
    display: "none"
  }
}));

const EditorContainer = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const refAsset = useRef();
  const refSubject = useRef();
  const refSentence = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickRun = () => {
    document.getElementById("qset").src = window.tsQeditor.get(
      "plugin",
      "qsetUi"
    );
    document.getElementById("console").innerHTML = "";
  };

  const onClickTab = index => {
    let arrList = [ref, refAsset, refSubject, refSentence];
    for (let i = 0; i < arrList.length; i++) {
      if (i === index) {
        arrList[i].current.style.display = "block";
      } else {
        arrList[i].current.style.display = "none";
      }
    }
  };

  // const [metaPlugin, setMetaPlugin] = React.useState([]);

  useEffect(() => {
    // const metaList = window.tsQeditor.metaPluginList;
    // if (!metaList) {
    //   return;
    // }
    // let arrList = [];
    // metaList.forEach(function(item) {
    //   if (window.tsQeditor.get("plugin", item)) {
    //     arrList.push({
    //       type: item,
    //       url: window.tsQeditor.get("plugin", item).url
    //     });
    //   }
    // });
    // setMetaPlugin(arrList);
  });

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{
          indicator: classes.indicator
        }}
      >
        >
        <Tab
          icon={<CreateIcon />}
          style={{ display: "block" }}
          className={value !== 0 ? classes.tab : classes.activeTab}
          label="Editor"
          onClick={() => onClickTab(0)}
          {...a11yProps(0)}
        />
        <Tab
          icon={<ImageIcon />}
          style={{ display: "none" }}
          className={value !== 1 ? classes.tab : classes.activeTab}
          label="Asset"
          onClick={() => onClickTab(1)}
          {...a11yProps(1)}
        />
        <Tab
          icon={<SubjectIcon />}
          style={{ display: "none" }}
          className={value !== 2 ? classes.tab : classes.activeTab}
          label="Subject"
          onClick={() => onClickTab(2)}
          {...a11yProps(2)}
        />
        <Tab
          icon={<SpellcheckIcon />}
          style={{ display: "none" }}
          className={value !== 3 ? classes.tab : classes.activeTab}
          label="Sentence"
          onClick={() => onClickTab(3)}
          {...a11yProps(3)}
        />
      </Tabs>

      <div className={classes.subRoot}>
        <AppBar position="static" className={classes.subAppBar}>
          <Toolbar className={classes.subToolBar}>
            <AttachFileIcon id="fileIcon" className={classes.fileIcon} />
            <Typography
              id="statusFileName"
              variant="h6"
              className={classes.subTitle}
            ></Typography>
            <div>
              <IconButton
                id="runButton"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onClickRun}
                color="inherit"
                className={classes.runButton}
                classes={{
                  label: classes.label
                }}
              >
                <PlayArrowIcon className={classes.playIcon} />
                Run
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Editor ref={ref} />
        <Asset ref={refAsset} className={classes.panel} />
        <Subject ref={refSubject} className={classes.panel} />
        <Sentence ref={refSentence} className={classes.panel} />

        {/* <TabPanel value={value} index={0}>
          <Editor ref={ref} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          sub1
        </TabPanel>
        <TabPanel value={value} index={2}>
          sub2
        </TabPanel>
        <TabPanel value={value} index={3}>
          sub3
        </TabPanel> */}
      </div>
    </div>
  );
});

export default EditorContainer;
