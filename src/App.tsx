import { memo, useEffect } from "react";
import Space from "./components/Space";
// import Calendar from "./components/Calendar";
// import dayjs from "dayjs";
import './App.scss'
import { ConfigProvider } from "./components/Space/ConfigProvider";

const App = memo(() => {


  return (
    <div>
      {/* <Calendar value={dayjs('2023-11-11')} locale="en-US" /> */}
      {/* <Space
        className='container'
        direction="horizontal"
        align="baseline"
        wrap={true}
        split={<div className=" text-white">woo</div>}
        size={['large', 'large']}
      >
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space> */}

      <ConfigProvider space={{ size: 14 }}>
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
      </ConfigProvider>
    </div>
  );
});

export default App;
