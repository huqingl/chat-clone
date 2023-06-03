import { useState } from "react";
import { Input, Button, Space, Modal,Drawer } from "antd";
import { AccountBookOutlined, ClearOutlined } from '@ant-design/icons'
import { createFromIconfontCN } from "@ant-design/icons";
//引入阿里IconFont图标
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3973055_x1qwjo6x41.js",
});
const { TextArea } = Input;
const FormSection = ({ generateResponse, canInput }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  //回车提交，阻止换行
  const onPressEnter = (e) => {
    e.preventDefault()
    if (newQuestion.length === 0) {
      return false;
    } else {
      generateResponse(newQuestion, setNewQuestion, true);
    }
  };
  const showConfirmClear = () => {
    setIsModalOpen(true)
  }
  const hiddenConfirmClear = () => {
    setIsModalOpen(false)
  }
  const confirmClear = () => {
    localStorage.removeItem('history')
    setIsModalOpen(false)
    window.location.reload()
  }
  return (
    <div className="footer w-full pt-7 pb-14 fixed bottom-0">
      <div className="tools px-4 mb-2 w-3/5 mt-0 mx-auto flex justify-end">
        <Space className="pr-10"><Button title="充值" icon={<AccountBookOutlined style={{ verticalAlign: 'middle' }} /> }></Button><Button title="清除历史记录" icon={<ClearOutlined style={{ verticalAlign: 'middle' }} />} onClick={showConfirmClear}></Button></Space>
      </div>
      <Modal title="确认" width="150" centered open={isModalOpen} onOk={confirmClear} onCancel={hiddenConfirmClear}>
        <p>确定清空聊天记录吗？</p>
      </Modal>
      <div className="form-section mx-auto w-3/5 mobile:w-full px-2 flex bg-white items-center">
        <Space.Compact style={{ width: "100%", position: "relative" }}>
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
              onClick={() => generateResponse(newQuestion, setNewQuestion, canInput)}
            >
              <IconFont type="icon-send1" style={{ fontSize: "30px", verticalAlign: "middle" }} />
            </Button>
          </div>
        </Space.Compact>
      </div>
      <div className="description"></div>
    </div>
  );
};

export default FormSection;
