import { memo, useEffect, useRef } from "react";
import ReacSpringAnimation from "./components/ReactSpringAnimation";
import ReactSpringAnimation1 from "./components/ReactSpringAnimation/ReactSpringAnimation1";
// import './App.scss'

const App = memo(() => {
  return (
    <div>
      {/* <ReacSpringAnimation /> */}
      <ReactSpringAnimation1 />
    </div>
  );
});

export default App;
