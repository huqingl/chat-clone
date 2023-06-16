import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
export default function UserManager() {
  const [userList, setUserList] = useState([]);
  const [pageTotal,setPageTotal] = useState(null)
  useEffect(() => {
    axios.post("/api/user/get_user_info").then((res) => {
      setUserList(res.data.data)
      setPageTotal(res.data.total_count)
    });
  }, []);
  const columns = [
    {
      title: "用户帐户",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "昵称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "开卡数量",
      dataIndex: "buyedCard",
      key: "buyedCard",
    },
    {
      title: "点数",
      dataIndex: "buyedTokens",
      key: "buyedTokens",
    },
    {
      title: "消耗点数",
      dataIndex: "usedTokens",
      key: "usedTokens",
    },
    {
      title: "剩余点数",
      dataIndex: "restCard",
      key: "restCard",
    },
    {
      title: "注册时间",
      dataIndex: "registerTime",
      key: "registerTime",
    },
  ];
  const changePage = (a,b,c)=>{
    const pageIndex = a.current
    axios
      .post("/api/user/get_user_info", qs.stringify({page:pageIndex}))
      .then((res) => {
        setUserList(res.data.data);
      });
  }
  return (
    <div className="table">
      <Table
        dataSource={userList}
        columns={columns}
        pagination={{ defaultCurrent: 1, total: pageTotal, pageSize: 10 }}
        onChange={changePage}
      />
    </div>
  );
}
