import { Button, Divider, Table, Input } from "antd";
import { useState } from "react";

export default function TopUP() {
    const [inputTokenCode, setInputTokenCode] = useState(false)
    const [tokenCode, setTokenCode] = useState(false)
    const columns = [
        {
            title: '兑换码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Token数',
            dataIndex: 'number',
            key: 'number',
        },]
    const tokenList = [
        {
            key: '1',
            code: 'abcde',
            date: '2022-01-01',
            number: 10000
        },
        {
            key: '2',
            code: 'abcdf',
            date: '2022-02-01',
            number: 10000
        },
        {
            key: '3',
            code: 'abcdg',
            date: '2022-03-01',
            number: 20000
        },

    ];
    const tokenCheck = (token) => {
        setTokenCode(token.target.value)
    }
    const showInputCode = () => {
        setInputTokenCode(true)
    }
    const confirmTopUp = () => {
        let token = tokenCode
        //...
        setInputTokenCode(false)
    }
    return (
        <div className="w-full mt-6">
            <div className="balance"><span>Token 余额：</span><span>1000</span><Button className="ml-4" onClick={showInputCode}>兑换码充值</Button><p className="float-right pt-2">参考价：100万 Token = 100RMB</p></div>
            <div className={inputTokenCode ? "block" : "hidden"}>
                <p className="mt-2">兑换码：</p>
                <Input className="my-2" placeholder="请输入兑换码" maxLength={10} onChange={(e) => tokenCheck(e)} />
                <Button type="primary" onClick={confirmTopUp}>确认兑换</Button>
            </div>
            <div className="record mt-6">
                <Divider orientation="center">充值记录</Divider>
                <Table columns={columns} dataSource={tokenList} />
            </div>
        </div>
    )
}