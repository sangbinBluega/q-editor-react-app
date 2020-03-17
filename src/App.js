import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";

import HeaderContainer from "./containers/HeaderContainer";
import EditorContainer from "./containers/EditorContainer";
import ViewContainer from "./containers/ViewContainer";
import ConsoleContainer from "./containers/ConsoleContainer";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

import "./styles/App.scss";

const init = () => {
  window.tsQeditor.set("file", "onOpen", function(
    /*{}*/ Q,
    /*String*/ fileOrg,
    /*String*/ fileName
  ) {
    //  파일 정보 지정
    window.tsQeditor.Q = Q;
    window.tsQeditor.fileName = fileName;

    //  저장 버튼 활성화
    document.getElementById("menuBtnFileSave").style.display = "block";

    //  File을 Editor 등으로 로드
    window.tsQeditor.fileLoad();

    //  File 실행
    qsetUiRun();

    //File 이름 표시
    document.getElementById("statusFileName").innerHTML = fileName || "";

    document.getElementById("fileIcon").style.display = "block";
    document.getElementById("runButton").style.display = "block";

    //  Start
    window.tsQeditor.init(function() {});

    editorLoad(0);
  });
};

const editorLoad = idx => {
  document.getElementById("editorIF").src = window.tsQeditor.get(
    "plugin",
    "editor"
  )[idx].url;
};

const qsetUiRun = () => {
  document.getElementById("qset").src = window.tsQeditor.get(
    "plugin",
    "qsetUi"
  );
  document.getElementById("console").innerHTML = "";
};

function onChangeCourse(e) {
  sendMessage({
    method: "resize",
    width: e
  });
}

function onChangeFrame(e) {
  sendMessage({
    method: "resize",
    height: e
  });
}

function sendMessage(msg) {
  var child = document.getElementById("qset");
  child.contentWindow.postMessage(msg);
}

function App() {
  const refEditor = useRef();
  const refView = useRef();

  const refLayoutLeft = useRef();
  const refLayoutRight = useRef();

  init();

  const onDragStart = () => {
    refEditor.current.style.pointerEvents = "none";
    refView.current.style.pointerEvents = "none";
  };

  const onDragEnd = () => {
    refEditor.current.style.pointerEvents = "";
    refView.current.style.pointerEvents = "";

    let rightPaneWidth = refLayoutLeft.current.container
      .getElementsByClassName("layout-pane")[1]
      .style.width.replace("%", "");
    let rightPaneHeight = refLayoutRight.current.container
      .getElementsByClassName("layout-pane")[0]
      .style.height.replace("%", "");
    localStorage.setItem("$pando:rightPaneWidth", rightPaneWidth);
    localStorage.setItem("$pando:rightPaneHeight", rightPaneHeight);
  };

  return (
    <div>
      <Helmet>
        <title>{window.tsQeditor.get("ui", "title") || "문항 생성기"}</title>
      </Helmet>
      <header>
        <HeaderContainer />
      </header>
      <div className="main">
        <div className="child-content">
          <SplitterLayout
            ref={refLayoutLeft}
            primaryIndex={0}
            percentage
            primaryMinSize={30}
            secondaryInitialSize={
              !localStorage.getItem("$pando:rightPaneWidth")
                ? 50
                : parseFloat(localStorage.getItem("$pando:rightPaneWidth"))
            }
            // secondaryMinSize={50}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onSecondaryPaneSizeChange={onChangeCourse}
            customClassName="leftLayout"
          >
            <EditorContainer ref={refEditor} runFunction={qsetUiRun} />
            <SplitterLayout
              ref={refLayoutRight}
              vertical
              percentage
              primaryIndex={1}
              primaryMinSize={3}
              secondaryInitialSize={
                !localStorage.getItem("$pando:rightPaneHeight")
                  ? 50
                  : parseFloat(localStorage.getItem("$pando:rightPaneHeight"))
              }
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onSecondaryPaneSizeChange={onChangeFrame}
              customClassName="rightLayout"
            >
              <ViewContainer ref={refView} />
              <ConsoleContainer />
            </SplitterLayout>
          </SplitterLayout>
        </div>
      </div>
    </div>
  );
}

export default App;
