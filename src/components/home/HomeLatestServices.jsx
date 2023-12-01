import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Loader from "../Loader";
import { useEffect } from "react";
import { RESET, getServices } from "../../features/service/serviceSlice";

const HomeLatestServices = () => {
  const dispatch = useDispatch();
  const { services, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(getServices());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(RESET());
    }
  }, [dispatch, isSuccess]);

  if (isError) return <Navigate to="/error" state={{ error: message }} />;

  return (
    <div className="flex gap-1 justify-end !z-10 -mt-32 lg:-mt-16">
      <div className="flex  flex-row flex-wrap gap-3 md:gap-5 items-center justify-center w-full">
        {isLoading ? (
          <Loader />
        ) : (
          services?.length > 0 &&
          services.slice(0, 5).map((service) => (
            <Link
              key={service.id}
              to={`/magaza-ve-restoranlar/${service.id}`}
              className="w-[200px] max-h-[300px] md:h-full lg:max-w-max  border bg-white border-slate-100 p-4 flex flex-col  transition-all duration-200 rounded-lg shadow-lg group hover:-translate-y-3"
            >
              <div className="flex overflow-hidden items-center justify-center rounded-lg  h-[200px] ">
                <img
                  src={service.logo}
                  alt=""
                  className="w-full h-full group-hover:scale-105 transition-all duration-200  object-contain rounded-lg"
                />
              </div>
              <h2 className="group-hover:text-colorPrimary text-start text-sm mt-4 text-black font-semibold">
                {service.name}
              </h2>
              <p className="text-xs text-start gap-1 group-hover:text-colorPrimary text-black font-medium">
                {`Mərtəbə ${
                  service.floor === 1
                    ? "bir"
                    : service.floor === 2
                    ? "iki"
                    : service.floor === 3
                    ? "üç"
                    : null
                } - ${service.subcategory_name}`}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeLatestServices;
