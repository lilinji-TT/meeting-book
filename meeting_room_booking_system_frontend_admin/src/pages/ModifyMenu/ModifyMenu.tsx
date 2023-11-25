import { Menu as AntdMenu, MenuProps } from "antd";
import { useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { router } from "../..";
import "./ModifyMenu.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "信息修改",
  },
  {
    key: "2",
    label: "密码修改",
  },
];

export function ModifyMenu() {
  const location = useLocation();
  const hadnleMenuItemClick: MenuProps["onClick"] = useCallback((info: { key: string; }) => {
    console.log(info);
    const key = info.key;

    switch (key) {
      case "1":
        router.navigate("/user/info_modify");
        break;
      default:
        router.navigate("/user/password_modify");
    }
  }, []);
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={[
            location.pathname === "/user/info_modify" ? "1" : "2",
          ]}
          items={items}
          onClick={hadnleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
