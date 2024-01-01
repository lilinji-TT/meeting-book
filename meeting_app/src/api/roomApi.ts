import request from "../http";

export async function searchMeetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  const response = await request({
    url: "meeting-room/list",
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });

  return response;
}

export async function unbind(id: number) {
  const response = await request({
    url: `/booking/unbind/${id}`,
    method: "POST",
  });

  return response;
}
