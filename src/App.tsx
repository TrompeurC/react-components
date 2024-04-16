import { memo, useEffect, useRef } from "react";
import './App.scss'
import Portal from "./components/Portal";

const App = memo(() => {
  const portalRef = useRef(null);
  useEffect(() => {
    console.log(portalRef)
  }, [])
  return (
    <div>
      <Portal ref={portalRef}>
        <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </Portal>
    </div>
  );
});

export default App;
