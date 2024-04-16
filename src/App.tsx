import { memo } from "react";
import Space from "./components/Space";
import './App.scss'
import { ConfigContext } from "./components/Space/ConfigProvider";

const App = memo(() => {

  return (
    <div>
      <ConfigContext.Provider value={{ space: { size: 20 } }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigContext.Provider>
      <hr />
      <div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
});

export default App;
