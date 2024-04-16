import { memo, useEffect, useRef } from "react";
// import './App.scss'
import MutationObserverTest1 from "./components/MutationObserverTest";

const App = memo(() => {
  const portalRef = useRef(null);
  useEffect(() => {
    console.log(portalRef)
  }, [])
  return (
    <div>
      <MutationObserverTest1 ></MutationObserverTest1>
    </div>
  );
});

export default App;
