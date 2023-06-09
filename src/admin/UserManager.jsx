import { Table } from "antd";
export default function UserManager() {
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
    }
  ];
  return <div>user</div>;
}
