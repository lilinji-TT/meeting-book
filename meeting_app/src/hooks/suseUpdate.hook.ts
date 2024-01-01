import { useCallback, useState } from "react";

export function useUpdate() {
  const [, setObj] = useState({});

  const update = useCallback(() => {
    setObj({});
  }, []);

  return update;
}
