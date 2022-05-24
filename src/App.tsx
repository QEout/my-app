import React, { useState } from "react";
import "./css/App.css";
import "./css/loading.css"
// 使用lodash
import _ from "lodash";
import { get } from './utils/request'

type QInfo = {
  name: string;
  qlogo: string;
  qq: string;
};

export function isValidQQ(qq: string): boolean {
  return /^[1-9]\d{4,11}$/.test(qq);
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<QInfo | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDebounce(e.target.value.trim());
  };

  const onSearch = (value: any) => {
    if (value.length === 0) {
      setLoading(false);
      setData(null);
      setError("");
      return;
    }

    if (!isValidQQ(value)) {
      setData(null);
      setError("请输入正确的QQ号");
      return;
    }

    setError("");
    setLoading(true);
    get('https://api.uomg.com/api/qq.info', { qq: value })
      .then((res: any) => {
        if (res.code !== 1) {
          setError(res.msg);
          setData(null);
        } else {
          setError("");
          setData({
            name: res.name,
            qlogo: res.qlogo,
            qq: res.qq,
          });
        }
      }).finally(() => setLoading(false));
  };

  const handleDebounce = _.debounce(onSearch, 500);

  return (
    <div className="App">
      <div className="main">
        <div className="title">QQ号查询</div>
        <div>
          <span>QQ：</span>
          <input
            className="input"
            type="text"
            placeholder="请输入QQ号"
            onChange={onChange}
          /></div>
        <div className="result">
          {loading && <div id="preloader"></div>}
          {!loading && data && <UserComponent {...data} />}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

// loading组件
function UserComponent(data: QInfo) {
  return (
    <div className="userCard">
      <img
        className="avatar"
        src={data?.qlogo}
        alt="avatar"
      />
      <div className="info">
        <div title={data?.name} className="name">
          {data?.name}
        </div>
        <div className="qq">{data?.qq}</div>
      </div>
    </div>)
}
export default App;
