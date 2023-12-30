/* eslint-disable jsx-a11y/anchor-is-valid */
import Table, { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import usePagination from "../../hooks/use-pagination.hook";

interface BookingHistoryProps {
  id: number;
  name: string;
  status: string;
  description: string;
  startTime: Date;
  endTime: Date;
}
export function BookingHistory() {
  const columns: ColumnsType<BookingHistoryProps> = useMemo(() => {
    return [
      {
        title: "会议室名称",
        dataIndex: "name",
      },
      {
        title: "开始时间",
        dataIndex: "startTime",
      },
      {
        title: "结束时间",
        dataIndex: "endTime",
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (_, rocord) => {
          return <div>已预订</div>;
        },
      },
      {
        title: "操作",
        render: () => {
          return (
            <div>
              <a href="#">撤销预定</a>
            </div>
          );
        },
      },
    ];
  }, []);
  const { pagination, changePage } = usePagination();

  return (
    <div>
      <h1>BookingHistory</h1>
      <Table
        columns={columns}
        dataSource={[]}
        pagination={{
          current: pagination.pageNo,
          pageSize: pagination.pageSize,
          onChange: changePage,
        }}
      ></Table>
    </div>
  );
}
