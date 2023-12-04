import React, { useMemo } from "react";
import { BlogCardForSearch } from "../cards";

const SearchBlogs = ({ blogs, search }) => {
  const displayBlogs = useMemo(() => {
    if (!search.get("search")) {
      return blogs.slice(0, 3);
    }
    return blogs;
  }, [blogs, search]);

  return (
    <>
      {displayBlogs.map((s) => (
        <BlogCardForSearch key={s.id} blog={s} />
      ))}
    </>
  );
};

export default SearchBlogs;
