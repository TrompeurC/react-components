import { memo, useEffect } from "react";
import Calendar from "./components/Calendar";
import dayjs from "dayjs";
// import './App.scss'

const App = memo(() => {


  return (
    <div>
      <Calendar value={dayjs()} />
    </div>
  );
});

export default App;
