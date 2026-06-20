import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `Premium Wash Laundry | ${title}`;
  }, [title]);
};

export default usePageTitle;
