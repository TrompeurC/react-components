import { memo } from "react";
import CalendarTest from "./components/Calendar/CalendarTest";
import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";

const App = memo(() => {
  
  return (
    <div>
      <IconAdd></IconAdd>
      <IconEmail></IconEmail>
    </div>
  );
});

export default App;
