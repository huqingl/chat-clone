import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Button, Space, Modal, Drawer, Tabs } from "antd";
import {
  AccountBookOutlined,
  ClearOutlined,
  UserOutlined,
  FilePdfOutlined
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import PersonalSetting from "./PersonalSetting";
import ContactUs from "./ContactUs";
import TopUP from "./TopUp";
//引入阿里IconFont图标
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});
const { TextArea } = Input;
const PdfFormSection = ({ generateResponse, canInput }) => {
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  //回车提交，阻止换行
  const onPressEnter = (e) => {
    e.preventDefault();
    if (newQuestion.length === 0) {
      return false;
    } else {
      generateResponse(newQuestion, setNewQuestion, true);
    }
  };
  const showConfirmClear = () => {
    setIsModalOpen(true);
  };
  const hiddenConfirmClear = () => {
    setIsModalOpen(false);
  };
  const confirmClear = () => {
    localStorage.removeItem("history");
    setIsModalOpen(false);
    window.location.reload();
  };
  const goTopUp = () => {
    setMenuOpened(true);
    setActiveKey("1");
  };
  const goPdfPage = ()=>{
    navigate("/pdf-upload")
  }
  const showMenu = () => {
    setMenuOpened(true);
  };
  const closeMenu = () => {
    setMenuOpened(false);
    setActiveKey("0");
  };
  const switchTab = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  return (
    <div className="footer w-full pt-7 pb-14 absolute bottom-0 bg-white">
      <div className="tools px-4 mb-2 mobile:w-11/12 w-4/5 mt-0 mx-auto flex justify-end">
        <Space className="pr-10">
          <Button
            title="充值"
            onClick={goTopUp}
            icon={<AccountBookOutlined style={{ verticalAlign: "middle" }} />}
          ></Button>
          <Button
            title="清除历史记录"
            icon={<ClearOutlined style={{ verticalAlign: "middle" }} />}
            onClick={showConfirmClear}
          ></Button>
        </Space>
      </div>
      <Modal
        title="确认"
        width={250}
        cancelText="取消"
        okText="确认"
        centered
        open={isModalOpen}
        onOk={confirmClear}
        onCancel={hiddenConfirmClear}
      >
        <p>确定清空聊天记录吗？</p>
      </Modal>
      <div className="form-section mx-auto w-4/5 mobile:w-full px-2 flex bg-white items-center">
        <Space.Compact style={{ width: "100%", position: "relative" }}>
          <div
            className="profile pr-2 hover:cursor-pointer flex flex-col justify-center"
            onClick={showMenu}
            title="个人设置"
          >
            <UserOutlined
              style={{
                fontSize: "30px",
                height: "34px",
                verticalAlign: "middle",
              }}
            />
          </div>

          <TextArea
            autoSize={{ minRows: 2 }}
            className="form-control mr-2.5"
            placeholder="请输入你的问题"
            disabled={canInput}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onPressEnter={(e) => onPressEnter(e)}
            style={{ paddingRight: "54px" }}
          />

          <div className="btn h-full flex absolute right-2.5 hover:cursor-pointer">
            <Button
              type="text"
              className="sendButton hover:bg-none h-full"
              disabled={newQuestion.length === 0}
              onClick={() =>
                generateResponse(newQuestion, setNewQuestion, canInput)
              }
            >
              <IconFont
                type="icon-send1"
                style={{ fontSize: "30px", verticalAlign: "middle" }}
              />
            </Button>
          </div>
        </Space.Compact>
      </div>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={closeMenu}
        open={menuOpened}
        destroyOnClose={true}
        height="70%"
        key="bottom"
      >
        <div className="setting mobile:w-11/12 w-3/5 mt-0 mx-auto">
          <Tabs
            onChange={switchTab}
            activeKey={activeKey}
            destroyInactiveTabPane={true}
            items={[
              {
                label: "个人设置",
                key: "0",
                children: <PersonalSetting />,
              },
              {
                label: "充值",
                key: "1",
                children: <TopUP />,
              },
              {
                label: "联系我们",
                key: "2",
                children: <ContactUs />,
              },
            ]}
          />
        </div>
      </Drawer>
      <div className="description"></div>
    </div>
  );
};

export default PdfFormSection;
