import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
export default function TopUpManager() {
  const navigate = useNavigate();
  const [topUpList, setTopUpList] = useState([]);
  const [pageTotal, setPageTotal] = useState(null);
  const token = localStorage.getItem("atoken");
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    axios
      .post("/api/card/card_code_list", qs.stringify({ token: token }))
      .then((res) => {
        if (res.data.code === 1000) {
          message.info({
            duration: 2,
            content: res.data.msg,
            onClose: () => {
              localStorage.removeItem("atoken");
              navigate("/admin/login");
            },
          });
        } else {
          setTopUpList(res.data.data);
          setPageTotal(res.data.total);
        }
      });
  }, [token]);
  const columns = [
    {
      title: "CardKey",
      dataIndex: "card_code",
      key: "card_code",
    },
    {
      title: "点数",
      dataIndex: "card_code_tokens",
      key: "card_code_tokens",
    },
    {
      title: "绑定用户",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "激活时间",
      dataIndex: "pay_time",
      key: "pay_time",
    },
    {
      title: "生成时间",
      dataIndex: "create_time",
      key: "create_time",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isNum, setIsNum] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };
  const generateCode = () => {
    // setCode("ABCDf");
    axios
      .post("/api/card/create_card_code", qs.stringify({ token: token }))
      .then((res) => {
        setCode(res.data.card_code);
      });
  };
  const changePage = (a, b, c) => {
    const pageIndex = a.current;
    axios
      .post("/api/card/card_code_list", qs.stringify({ page: pageIndex ,token:token}))
      .then((res) => {
        setTopUpList(res.data.data);
      });
  };
  const onChange = (_, allvalues) => {
    const result = /^[0-9]+$/.test(allvalues.card_tokens);
    setIsNum(result);
    if (result) {
      setFormValue(allvalues);
    }
  };
  const onSubmit = () => {
    if (isNum && code) {
      let a = formValue;
      a.card_code = code;
      a.token = token;
      axios.post("/api/card/set_card_token", qs.stringify(a)).then((res) => {
        if (res.data.code === 1) {
          message.success({
            duration: 3,
            content: res.data.msg,
            onClose: () => {
              window.location.reload()
            },
          });
        }
      });
    } else {
      message.info({ duration: 3, content: "输入无效" });
    }
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
        onOk={onSubmit}
      >
        <Form name="create" className="create-form" onValuesChange={onChange}>
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
            name="card_tokens"
            label="点数"
            rules={[
              {
                required: true,
                max: 9,
                pattern: new RegExp(/^[0-9]+$/),
                message: "请输入正确的点数!",
              },
            ]}
          >
            <Input placeholder="输入点数" />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={topUpList}
        pagination={{ defaultCurrent: 1, total: pageTotal, pageSize: 10 }}
        onChange={changePage}
      />
    </div>
  );
}
