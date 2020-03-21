import { useState, useEffect } from "react";
import { createTreeData } from "../../generic/rc-tree/util";

/**
 * Hook to generate rc-tree nodes based off of filtered post collection data
 */
export default function useTreeData(posts) {
  const [treeData, setTreeData] = useState(null);
  const [yearKeys, setYearKeys] = useState(null);
  const [monthKeys, setMonthKeys] = useState(null);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setTreeData(null);
      return;
    }
    const data = createTreeData(posts);
    setTreeData(data.treeData);
    setMonthKeys(data.monthKeys);
    setYearKeys(data.yearKeys);
  }, [posts]);

  return { treeData, yearKeys, monthKeys };
}
