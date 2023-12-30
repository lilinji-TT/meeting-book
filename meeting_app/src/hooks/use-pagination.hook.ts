import { useCallback, useState } from "react";

type PaginationType = {
  pageNo: number;
  pageSize: number;
};
export default function usePagination() {
  const [pagination, setPaginnation] = useState<PaginationType>({
    pageNo: 1,
    pageSize: 10,
  });

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPaginnation({
      pageNo,
      pageSize,
    });
  }, []);

  return {
    pagination,
    changePage,
  };
}
