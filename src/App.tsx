import { memo, useEffect, useRef } from "react";
// import './App.scss'

const App = memo(() => {
  const portalRef = useRef(null);
  useEffect(() => {
    console.log(portalRef)
  }, [])
  return (
    <div>
    </div>
  );
});

export default App;
