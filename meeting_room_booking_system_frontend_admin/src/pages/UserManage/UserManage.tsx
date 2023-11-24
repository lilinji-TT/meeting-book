/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Form, Image, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Table, { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { freeze, userSearch } from "../../interface/interface";
import "./UserManage.css";

interface SeacrhUser {
  username: string;
  nickName: string;
  email: string;
}

interface UserSearchResult {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
  isFrozen: boolean;
}

export function UserManage() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userResult, setUserResult] = useState<UserSearchResult[]>();
  const [randomNum, serRandomNum] = useState<number>(0);
  const [form] = useForm();

  const freezeUser = useCallback(async (id: number) => {
    const res = await freeze(id);

    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      message.success("冻结成功");
      serRandomNum(Math.random());
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  }, []);

  const columns: ColumnsType<UserSearchResult> = useMemo(
    () => [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "头像",
        dataIndex: "headPic",
        render: (value) => {
          return value ? (
            <Image width={50} src={`http://localhost:3005${value}`} />
          ) : (
            "未上传"
          );
        },
      },
      {
        title: "昵称",
        dataIndex: "nickName",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "注册时间",
        dataIndex: "createTime",
      },
      {
        title: "状态",
        dataIndex: "isFrozen",
        render: (_, record) =>
          record.isFrozen ? <Badge status="success">已冻结</Badge> : "正常",
      },
      {
        title: "操作",
        render: (_, record) => (
          <a
            href="#"
            onClick={() => {
              freezeUser(record.id);
            }}
          >
            冻结
          </a>
        ),
      },
    ],
    []
  );

  const searchUser = useCallback(async (values: SeacrhUser) => {
    const { username, nickName, email } = values;
    const res = await userSearch(username, nickName, email, pageNo, pageSize);
    const { data } = res.data;

    if (res.status === 201 || res.status === 200) {
      setUserResult(
        data.users.map((item: UserSearchResult) => {
          return {
            key: item.username,
            ...item,
          };
        })
      );
    } else {
      message.error(data || "系统繁忙， 请稍后重试");
    }
  }, []);

  const changePage = useCallback((pageNo: number, pageSize: number) => {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    searchUser({
      username: form.getFieldValue("username"),
      email: form.getFieldValue("email"),
      nickName: form.getFieldValue("nickName"),
    });
  }, [pageNo, pageSize, randomNum]);
  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form
          form={form}
          onFinish={searchUser}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="userManage-table">
        <Table
          columns={columns}
          dataSource={userResult}
          pagination={{
            pageSize: pageSize,
            current: pageNo,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
}
