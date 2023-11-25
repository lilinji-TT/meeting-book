/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  Tag,
  TimePicker,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { apply, bookingList, reject, unbind } from "../../interface/interface";
import { MeetingRoomSearchResult } from "../MeetingRoomManage/MeetingRoomManage";
import { UserSearchResult } from "../UserManage/UserManage";
import "./booking_manage.css";

export interface SearchBooking {
  username: string;
  meetingRoomName: string;
  meetingRoomPosition: string;
  rangeStartDate: Date;
  rangeStartTime: Date;
  rangeEndDate: Date;
  rangeEndTime: Date;
}

interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  createTime: string;
  updateTime: string;
  user: UserSearchResult;
  room: MeetingRoomSearchResult;
}

export function BookingManage() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [bookingSearchResult, setBookingSearchResult] = useState<
    Array<BookingSearchResult>
  >([]);
  const [num, setNum] = useState(0);

  const columns: ColumnsType<BookingSearchResult> = [
    {
      title: "会议室名称",
      dataIndex: "room",
      width: 150,
      render(_, record) {
        return record.room.name;
      },
    },
    {
      title: "会议室位置",
      dataIndex: "room",
      width: 150,
      render(_, record) {
        return record.room.location;
      },
    },
    {
      title: "预定人",
      dataIndex: "user",
      width: 100,
      render(_, record) {
        return record.user.username;
      },
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: 150,
      render(_, record) {
        return dayjs(new Date(record.startTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 100,
      render(_, record) {
        return dayjs(new Date(record.endTime)).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "审批状态",
      dataIndex: "status",
      width: 100,
      render: (_, record) => {
        let color = "";
        let icon = null;
        switch (record.status) {
          case "审批通过":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
          case "审批驳回":
            color = "error";
            icon = <CloseCircleOutlined />;
            break;
          case "申请中":
            color = "processing";
            icon = <SyncOutlined spin />;
            break;
          case "已解除":
            color = "default";
            icon = <ClockCircleOutlined />;
            break;
        }
        return (
          <Tag icon={icon} color={color}>
            {record.status}
          </Tag>
        );
      },
      onFilter: (value, record) => record.status.startsWith(value as string),
      filters: [
        {
          text: "审批通过",
          value: "审批通过",
        },
        {
          text: "审批驳回",
          value: "审批驳回",
        },
        {
          text: "申请中",
          value: "申请中",
        },
        {
          text: "已解除",
          value: "已解除",
        },
      ],
    },
    {
      title: "预定时间",
      dataIndex: "createTime",
      width: 150,
      render(_, record) {
        return dayjs(new Date(record.createTime)).format("YYYY-MM-DD hh:mm:ss");
      },
    },
    {
      title: "备注",
      dataIndex: "note",
      width: 100,
    },
    {
      title: "描述",
      dataIndex: "description",
      width: 100,
    },
    {
      title: "操作",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div>
          <Popconfirm
            title="通过申请"
            description="确认通过吗？"
            onConfirm={() => changeStatus(record.id, "apply")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">通过</a>
          </Popconfirm>
          <br />
          <Popconfirm
            title="驳回申请"
            description="确认驳回吗？"
            onConfirm={() => changeStatus(record.id, "reject")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">驳回</a>
          </Popconfirm>
          <br />
          <Popconfirm
            title="解除申请"
            description="确认解除吗？"
            onConfirm={() => changeStatus(record.id, "unbind")}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">解除</a>
          </Popconfirm>
          <br />
        </div>
      ),
    },
  ];

  async function changeStatus(
    id: number,
    status: "apply" | "reject" | "unbind"
  ) {
    const methods = {
      apply,
      reject,
      unbind,
    };
    const res = await methods[status](id);

    if (res.status === 201 || res.status === 200) {
      message.success("状态更新成功");
      setNum(Math.random());
    } else {
      message.error(res.data.data);
    }
  }

  const searchBooking = async (values: SearchBooking) => {
    const res = await bookingList(values, pageNo, pageSize);

    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      setBookingSearchResult(
        data.bookings.map((item: BookingSearchResult) => {
          return {
            key: item.id,
            ...item,
          };
        })
      );
    } else {
      message.error(data || "系统繁忙，请稍后再试");
    }
  };

  const [form] = useForm();

  useEffect(() => {
    searchBooking({
      username: form.getFieldValue("username"),
      meetingRoomName: form.getFieldValue("meetingRoomName"),
      meetingRoomPosition: form.getFieldValue("meetingRoomPosition"),
      rangeStartDate: form.getFieldValue("rangeStartDate"),
      rangeStartTime: form.getFieldValue("rangeStartTime"),
      rangeEndDate: form.getFieldValue("rangeEndDate"),
      rangeEndTime: form.getFieldValue("rangeEndTime"),
    });
  }, [pageNo, pageSize, num]);

  const changePage = function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  return (
    <div id="bookingManage-container">
      <div className="bookingManage-form">
        <Form
          form={form}
          onFinish={searchBooking}
          name="search"
          layout="inline"
          colon={false}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Form.Item label="预定人" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="会议室名称" name="meetingRoomName">
              <Input />
            </Form.Item>

            <Form.Item label="位置" name="meetingRoomPosition">
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                搜索预定申请
              </Button>
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Form.Item label="预定开始日期" name="rangeStartDate">
              <DatePicker />
            </Form.Item>

            <Form.Item label="预定开始时间" name="rangeStartTime">
              <TimePicker />
            </Form.Item>

            <Form.Item label="预定结束日期" name="rangeEndDate">
              <DatePicker />
            </Form.Item>

            <Form.Item label="预定结束时间" name="rangeEndTime">
              <TimePicker />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="bookingManage-table">
        <Table
          columns={columns}
          dataSource={bookingSearchResult}
          scroll={{ x: 1000, y: 300 }}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
}
