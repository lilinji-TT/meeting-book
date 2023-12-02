/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Form, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  meetingRoomUsedCount,
  userBookingCount,
} from "../../interface/interface";
import "./statistics.css";

interface UserBookingData {
  userId: string;
  username: string;
  bookingCount: string;
}

interface MeetingRoomUsedData {
  meetingRoomName: string;
  meetingRoomId: string;
  usedCount: string;
}
export function Statistics() {
  const containRef = useRef<HTMLDivElement>(null);
  const containRef2 = useRef<HTMLDivElement>(null);
  const [userBookingData, setUserBookingData] = useState<UserBookingData[]>([]);
  const [meetingRoomUsedData, setMeetingRoomUsedData] = useState<
    MeetingRoomUsedData[]
  >([]);

  const [form] = useForm();
  const getStatisticData = useCallback(
    async (values: { startTime: string; endTime: string }) => {
      const { startTime: start, endTime: end } = values;
      const startTime = dayjs(start).format("YYYY-MM-DD");
      const endTime = dayjs(end).format("YYYY-MM-DD");
      const res = await userBookingCount(startTime, endTime);

      const { data } = res.data;
      if (res.status === 200 || res.status === 201) {
        setUserBookingData(data);
      } else {
        message.error(data || "系统繁忙，请稍后再试");
      }

      const res2 = await meetingRoomUsedCount(startTime, endTime);

      const { data: data2 } = res2.data;
      if (res2.status === 200 || res2.status === 201) {
        setMeetingRoomUsedData(data2);
      } else {
        message.error(data2 || "系统繁忙，请稍后再试");
      }
    },
    []
  );

  useEffect(() => {
    const myChart = echarts.init(containRef.current);

    if (!userBookingData) {
      return;
    }
    myChart.setOption({
      title: {
        text: "用户预约统计",
      },
      xAxis: {
        data: userBookingData.map((item) => item.username),
      },
      yAxis: {},
      series: [
        {
          name: "预定次数",
          type: form.getFieldValue("chartType"),
          data: userBookingData.map((item) => {
            return {
              name: item.username,
              value: item.bookingCount,
            };
          }),
        },
      ],
    });
  }, [userBookingData]);
  useEffect(() => {
    const myChart = echarts.init(containRef2.current);

    if (!meetingRoomUsedData) {
      return;
    }
    myChart.setOption({
      title: {
        text: "会议室使用情况",
      },
      xAxis: {
        data: meetingRoomUsedData.map((item) => item.meetingRoomName),
      },
      yAxis: {},
      series: [
        {
          name: "使用次数",
          type: form.getFieldValue("chartType"),
          data: meetingRoomUsedData.map((item) => {
            return {
              name: item.meetingRoomName,
              value: item.usedCount,
            };
          }),
        },
      ],
    });
  }, [meetingRoomUsedData]);
  return (
    <div id="statistics-container">
      <div className="statistics-form">
        <Form
          form={form}
          onFinish={getStatisticData}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="开始日期" name="startTime">
            <DatePicker />
          </Form.Item>

          <Form.Item label="结束日期" name="endTime">
            <DatePicker />
          </Form.Item>

          <Form.Item label="图表类型" name="chartType" initialValue={"bar"}>
            <Select>
              <Select.Option value="pie">饼图</Select.Option>
              <Select.Option value="bar">柱形图</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex-box">
        <div className="statistics-chart" ref={containRef}></div>
        <div className="statistics-chart" ref={containRef2}></div>
      </div>
    </div>
  );
}
