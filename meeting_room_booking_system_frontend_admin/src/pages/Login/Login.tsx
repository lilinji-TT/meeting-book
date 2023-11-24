/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../interface/interface";
import "./Login.css";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export function Login() {
  const navigate = useNavigate();
  const onFinish = useCallback(async (values: LoginUser) => {
    const res = await login(values.username, values.password);
    const { data } = res.data;

    if (res.status === 201 || res.status === 200) {
      message.success("登录成功");

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user_info", JSON.stringify(data.userinfo));

      setTimeout(() => {
        navigate("/user_manage");
      }, 1000);
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);

  return (
    <div id="login-container">
      <h1>会议室预订系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
