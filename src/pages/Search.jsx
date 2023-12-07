import { useEffect, useMemo, useState } from "react";
import { ServiceCardForSearch } from "../components/cards";
import { Meta } from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { RESET, getServices } from "../features/service/serviceSlice";
import { Loader, ProgressBarLoader, SearchBar } from "../components";

import { Navigate, useSearchParams } from "react-router-dom";
import SearchShops from "../components/search/SearchShops";
import { getBlogs, RESET as RESETBLOGS } from "../features/blogs/blogSlice";
import SearchBlogs from "../components/search/SearchBlogs";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const { services, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.services
  );

  const {
    blogs,
    isSuccess: blogSuccess,
    isError: blogError,
    message: blogMessage,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getServices(search));
    dispatch(getBlogs(search));
  }, [dispatch, search]);

  useEffect(() => {
    setLoading(false);
  }, [services, blogs]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(RESET());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (blogSuccess) {
      dispatch(RESETBLOGS());
    }
  }, [dispatch, blogSuccess]);

  if (isError || blogError)
    return (
      <Navigate
        to="/error"
        state={{ error: message ? message : blogMessage }}
      />
    );

  return (
    <main className="flex flex-col gap-14 pb-10">
      <Meta title="Mağazalar, Restoranlar, Xəbərlər və Yeniliklər" />
      {isLoading && <ProgressBarLoader isLoading={isLoading} />}
      <section className="container px-4">
        <div className="my-5 flex flex-col  sm:flex-row items-center justify-between  gap-2">
          <SearchBar />
        </div>

        <div className="p-4 bg-white ">
          {loading ? (
            <Loader />
          ) : services?.length === 0 && blogs?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-56">
              <span className=" text-gray-400">Nəticə tapılmadı :(</span>
            </div>
          ) : (
            <>
              <h3 className="text-black font-medium">Mağaza və Restoranlar</h3>
              <SearchShops search={search} services={services} />
              <h3 className="text-black font-medium">Xəbər və Yeniliklər</h3>
              <SearchBlogs search={search} blogs={blogs} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Search;
