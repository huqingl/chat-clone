import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "antd";
const SideBar = () => {
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState([]);
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
      key:"sub1",
      label:"用户管理"
    },
    {
      key:"sub2",
      label:"充值管理"
    }
  ];
  const clickMenu = ({key}) =>{
    if (key === 'sub1') {
      navigate('/admin/user-manager')
    } else if(key === 'sub2'){
      navigate('/admin/topup-manager')
    }
  }
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
        openKeys={openKeys}
        items={navItems}
        onSelect={clickMenu}
      />
    </div>
  );
};
export default SideBar;
