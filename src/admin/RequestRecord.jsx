import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
export default function RequestRecord() {
  const [requestList, setRequestList] = useState([]);
  const [pageTotal,setPageTotal] = useState(null)
  const token = localStorage.getItem("atoken");
  useEffect(() => {
    axios.post("/api/chat_record",qs.stringify({token:token})).then((res) => {
      setRequestList(res.data.data)
      setPageTotal(res.data.total)
    });
  }, [token]);
  const columns = [
    {
      title: "用户帐户",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "请求时间",
      dataIndex: "chat_time",
      key: "chat_time",
    },
  ];
  const changePage = (a,b,c)=>{
    const pageIndex = a.current
    axios
      .post("/api/chat_record", qs.stringify({page:pageIndex,token:token}))
      .then((res) => {
        setRequestList(res.data.data);
      });
  }
  return (
    <div className="table">
      <Table
        dataSource={requestList}
        columns={columns}
        pagination={{ defaultCurrent: 1, total: pageTotal, pageSize: 10 ,showSizeChanger:false}}
        onChange={changePage}
      />
    </div>
  );
}
