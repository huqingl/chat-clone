import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
const SideBar = () => {
  const navigate = useNavigate();
  // function getItem(label, key, children, type) {
  //   return {
  //     key,
  //     children,
  //     label,
  //     type,
  //   };
  // }
  // const onOpenChange = (keys) => {
  //   console.log(keys)
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   console.log(latestOpenKey)
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };
  // const rootSubmenuKeys = ["sub1", "sub2"];
  const navItems = [
    {
      key: "sub1",
      label: "用户管理",
    },
    {
      key: "sub2",
      label: "充值管理",
    },
    { key: "sub3", label: "联系人管理" },
    { key: "sub4", label: "请求记录" },
    { key: "sub5", label: "注销登录" },
  ];
  const clickMenu = ({ key }) => {
    switch (key) {
      case 'sub1':
        navigate("/admin/user-manager");
        break;
      case 'sub2':
        navigate("/admin/topup-manager");
        break;
      case 'sub3':
        navigate("/admin/contact-manager")
        break;
      case 'sub4':
        navigate("/admin/request-record")
        break;
      case 'sub5':
        localStorage.removeItem('atoken')
        window.location.reload()
        break;
      default:
        break;
    }
  };
  return (
    <div className="sidebar h-full  shrink-0">
      {/*<ul className="py-2">
        <li className="px-2 py-4 text-center border-white border-b-2">
          <NavLink
            to="/convert"
            className={({ isActive }) =>
              isActive ? "text-sky-400 underline" : ""
            }
          >
            合同转换
          </NavLink>
        </li>
        <li className="px-2 py-4 text-center  border-white border-b-2">
          <NavLink
            to="/manage"
            className={({ isActive }) =>
              isActive ? "text-sky-400 underline" : ""
            }
          >
            配置管理
          </NavLink>
        </li>
      </ul>*/}
      <Menu
        className="h-full"
        mode="inline"
        // onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={navItems}
        onSelect={clickMenu}
      />
    </div>
  );
};
export default SideBar;
