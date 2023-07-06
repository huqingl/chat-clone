import { Button, Divider, Table, Input, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";
export default function TopUP() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [pageTotal, setPageTotal] = useState(null);
  useEffect(() => {
    axios
      .post("/api/buy_card/balance", qs.stringify({ token: token }))
      .then((res) => {
        if (res.data.code === 1002) {
          message.info({
            duration: 2,
            content: res.data.msg,
            onClose: () => {
              localStorage.removeItem("token");
              navigate("/login");
            },
          });
        } else {
          setBalance(res.data.data);
        }
      });
  }, [token]);
  useEffect(() => {
    axios
      .post("/api/buy_card/list", qs.stringify({ token: token }))
      .then((res) => {
        if (res.data.code === 1002) {
          message.info({
            duration: 2,
            content: res.data.msg,
            onClose: () => {
              localStorage.removeItem("token");
              navigate("/login");
            },
          });
        } else {
          setTokenList(res.data.data);
          setPageTotal(res.data.data[0].total);
        }
      });
  }, [token]);
  const [inputTokenCode, setInputTokenCode] = useState(false);
  const [tokenCode, setTokenCode] = useState("");
  const columns = [
    {
      title: "兑换码",
      dataIndex: "card_code",
      key: "card_code",
    },
    {
      title: "日期",
      dataIndex: "pay_time",
      key: "pay_time",
    },
    {
      title: "Token数",
      dataIndex: "card_code_tokens",
      key: "card_code_tokens",
    },
  ];
  //   const tokenList = [
  //     {
  //       key: "1",
  //       code: "abcde",
  //       date: "2022-01-01",
  //       number: 10000,
  //     },
  //     {
  //       key: "2",
  //       code: "abcdf",
  //       date: "2022-02-01",
  //       number: 10000,
  //     },
  //     {
  //       key: "3",
  //       code: "abcdg",
  //       date: "2022-03-01",
  //       number: 20000,
  //     },
  //   ];
  const tokenCheck = (e) => {
    setTokenCode(e.target.value);
  };
  const showInputCode = () => {
    setInputTokenCode(true);
  };
  const getBalance = () => {
    axios
      .post("/api/buy_card/balance", qs.stringify({ token: token }))
      .then((res) => {
        setBalance(res.data.data);
      });
  };
  const getTopUpList = () => {
    axios
      .post("/api/buy_card/list", qs.stringify({ token: token }))
      .then((res) => {
        setTokenList(res.data.data);
      });
  };
  const confirmTopUp = () => {
    const data = {
      token: token,
      card_code: tokenCode,
    };
    axios.post("/api/buy_card/pay", qs.stringify(data)).then((res) => {
      if (res.data.code === 1) {
        message.success({
          duration: 3,
          content: res.data.msg,
          onClose: () => {
            setInputTokenCode(false);
            setTokenCode("");
            getBalance();
            getTopUpList();
          },
        });
      } else {
        message.info({ duration: 3, content: res.data.msg });
      }
    });
  };
  const changePage = (a, b, c) => {
    const pageIndex = a.current;
    axios
      .post(
        "/api/buy_card/list",
        qs.stringify({ token: token, page: pageIndex })
      )
      .then((res) => {
        setTokenList(res.data.data);
      });
  };
  return (
    <div className="w-full mt-6">
      <div className="balance">
        <span>Token 余额：</span>
        <span>{balance}</span>
        <Button className="ml-4" onClick={showInputCode}>
          兑换码充值
        </Button>
        <p className="float-right mobile:float-none pt-2">
          参考价：100万 Token = 100RMB
        </p>
      </div>
      <div className={inputTokenCode ? "block" : "hidden"}>
        <p className="mt-2">兑换码：</p>
        <Input
          className="my-2"
          placeholder="请输入兑换码"
          maxLength={10}
          value={tokenCode}
          onChange={(e) => tokenCheck(e)}
        />
        <Button type="primary" onClick={confirmTopUp}>
          确认兑换
        </Button>
      </div>
      <div className="record mt-6">
        <Divider orientation="center">充值记录</Divider>
        <Table
          columns={columns}
          dataSource={tokenList}
          pagination={{ defaultCurrent: 1, total: pageTotal, pageSize: 5 }}
          onChange={changePage}
        />
      </div>
    </div>
  );
}
