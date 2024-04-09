import React, { memo, useEffect, useState } from "react";
import Calendar from "./components/mini-calendar";

const App = memo(() => {
  const [date , setDate] = useState(new Date(2022,11,12))
  const onChange = (v:Date) => {
    setDate(v)
  }
  useEffect(() => {
    setTimeout(() => {
      setDate(new Date(2000,11,11))
    }, 3000);
  }, []);
  return (
    <div>
      <Calendar value={date} onChange={onChange }/>
    </div>
  );
});

export default App;
