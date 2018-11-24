import React from "react";
import ReactDOM from "react-dom";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const component = <App githubCallbackUrl="http://localhost/test" appLoaded />;
  ReactDOM.unmountComponentAtNode(div);
});
