import React from "react";

import View from "../components/View";

const ViewContainer = React.forwardRef((props, ref) => {
  return <View update={props.update} ref={ref} />;
});

export default ViewContainer;
