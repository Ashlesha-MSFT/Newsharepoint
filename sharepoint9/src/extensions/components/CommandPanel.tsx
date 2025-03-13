import * as React from "react";

const CommandPanel: React.FunctionComponent = () => {
  React.useEffect(() => { console.log("hello"); }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "40%",
        backgroundColor: "red",
        fontSize: "18px",
        padding: "2em 1em",
        zIndex: 99999,
      }}
    >
      hello world!
    </div>
  );
};

export default CommandPanel;