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
    },
  ];
  const userData = [
    {
      key: "1",
      account: "zqb@ansuntech.com",
      username: '朱琦斌',
      buyedCard: 1,
      usedTokens: 2000,
      buyedTokens: 10000,
      restCard:8000,
      registerTime:'2023-01-01'
    },
    {
      key: "2",
      account: "zqb@ansuntech.com",
      username: '房欣纯',
      buyedCard: 1,
      usedTokens: 2000,
      buyedTokens: 10000,
      restCard:8000,
      registerTime:'2023-01-01'
    },
    {
      key: "3",
      account: "zqb@ansuntech.com",
      username: '汤明刚',
      buyedCard: 1,
      usedTokens: 2000,
      buyedTokens: 10000,
      restCard:8000,
      registerTime:'2023-01-01'
    },
    
  ];
  return (
    <div className="table">
      <Table dataSource={userData} columns={columns} />
    </div>
  );
}
