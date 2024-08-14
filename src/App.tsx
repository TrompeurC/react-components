import { memo, useEffect } from "react";
import Calendar from "./components/Calendar";
import dayjs from "dayjs";
// import './App.scss'

const App = memo(() => {


  return (
    <div>
      <Calendar value={dayjs('2023-11-11')} locale="en-US" />
    </div>
  );
});

export default App;
