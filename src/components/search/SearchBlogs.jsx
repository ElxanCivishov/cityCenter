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
    <div className="grid  md:grid-cols-3  gap-4 md:gap-7 my-6 transition-all duration-400">
      {displayBlogs.map((s) => (
        <BlogCardForSearch key={s.id} blog={s} />
      ))}
    </div>
  );
};

export default SearchBlogs;
