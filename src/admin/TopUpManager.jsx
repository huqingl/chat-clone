import axios from "axios";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
export default function TopUpManager() {
  // const [userList, setUserList] = useState([]);
  // const [pageTotal,setPageTotal] = useState(null)
  // useEffect(() => {
  //   axios.get("http://chatclone.site/api/1.php/api?question=abc").then((res) => {
  //     console.log(res.data);
  //     const a = res.data;
  //     setA(a)
  //   });
  // }, [a]);
  const columns = [
    {
      title: "CardKey",
      dataIndex: "cardkey",
      key: "cardkey",
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "点数",
      dataIndex: "tokennum",
      key: "tokennum",
    },
    {
      title: "绑定用户",
      dataIndex: "binduser",
      key: "binduser",
    },
    {
      title: "激活时间",
      dataIndex: "activedtime",
      key: "activedtime",
    },
    {
      title: "生成时间",
      dataIndex: "createdtime",
      key: "createdtime",
    },
  ];
  const topUpData = [
    {
      cardkey: "FAGADE1",
      key: "1",
      desc: "朱琦斌-1220",
      tokennum: 10000,
      binduser: "zqb@ansuntech.com",
      activedtime: "20220202",
      createdtime: "20220102",
    },
    {
      cardkey: "FAGADE2",
      key: "2",
      desc: "房欣纯-1220",
      tokennum: 10000,
      binduser: "fxc@ansuntech.com",
      activedtime: "20220302",
      createdtime: "20220202",
    },
    {
      cardkey: "FAGADE3",
      key: "3",
      desc: "汤明刚-12204",
      tokennum: 10000,
      binduser: "tmg@ansuntech.com",
      activedtime: "20220402",
      createdtime: "20220302",
    },
    {
      cardkey: "FAGADE4",
      key: "4",
      desc: "候永强-1220",
      tokennum: 10000,
      binduser: "zqb@ansuntech.com",
      activedtime: "20220502",
      createdtime: "202204102",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");

  const showModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };
  const generateCode = () => {
    setCode("ABCDf");
  };
  return (
    <div className="table">
      <Button type="primary" className="mb-4" onClick={showModal}>
        生成新卡
      </Button>
      <Modal
        title="生成新卡"
        width={300}
        okText="确定"
        cancelText="取消"
        centered
        destroyOnClose={true}
        open={isOpen}
        onCancel={cancelModal}
      >
        <Form name="create" className="create-form">
          <Space>
            <Form.Item label="券码">
              <Input value={code} disabled />
            </Form.Item>
            <Button className="mb-6" onClick={generateCode}>
              点击生成
            </Button>
            {/* <span>test</span> */}
          </Space>
          <Form.Item
            name="num"
            label="点数"
            rules={[
              {
                required: true,
                max:9,
                pattern: new RegExp(/^[0-9]+$/),
                message: "请输入正确的点数!",
              },
            ]}
          >
            <Input placeholder="输入点数" />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={topUpData} />
    </div>
  );
}
