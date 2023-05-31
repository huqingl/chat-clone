import { useRef, useState, useEffect } from "react";
import { Button } from "antd";
const VerifyCode = ({ onClick, seconds = 60 }) => {
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  const [canClick, setCanClick] = useState(false);
  useEffect(() => {
    timer.current && clearInterval(timer.current);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (time === seconds)
      timer.current = setInterval(() => setTime((time) => --time), 1000);
    else if (time <= 0) {
      timer.current && clearInterval(timer.current);
      setCanClick(false)
    }
  }, [time]);

  const getCode = () => {
    // if (time) return;
    // 作为组件使用
    onClick?.(() => {
      setTime(seconds);
      setCanClick(true);
    });
  };

  return (
    <Button
      type="primary"
      onClick={getCode}
      className="bg-blue-300"
      disabled={canClick}
    >
      {time ? `${time}秒后重新获取` : "获取验证码"}
    </Button>
  );
};
export default VerifyCode;
