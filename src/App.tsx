import React, { memo } from "react";
import Calendar from "./components/calendar";

const App = memo(() => {
  return (
    <div>
      <Calendar/>
    </div>
  );
});

export default App;
