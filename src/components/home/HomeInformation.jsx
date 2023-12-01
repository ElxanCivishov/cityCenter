import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  RESET,
  getServiceInfo,
} from "../../features/home/service/serviceInfoSlice";
import Loader from "../Loader";
import TruncatedText from "../TruncatedText";
import HomeLatestServices from "./HomeLatestServices";

const HomeInformation = () => {
  const dispatch = useDispatch();

  const { isLoading, serviceInfo, isSuccess } = useSelector(
    (state) => state.serviceInfo
  );

  useEffect(() => {
    dispatch(getServiceInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(RESET());
  }, [isSuccess, dispatch]);

  return (
    <section className="container px-4 ">
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          serviceInfo && (
            <div className="flex flex-col">
              <div className="flex gap-1 md:justify-end !z-10">
                <div className="w-full lg:w-3/5 bg-cover bg-right  lg:p-10 bg-no-repeat bg-[url('/images/leftGrayStarBg.svg')] ">
                  <div className="flex flex-col gap-10 my-10">
                    <h5 className="text-2xl md:text-5xl text-black tracking-wide  font-bold  text- h-auto">
                      {serviceInfo.title}
                    </h5>
                    <div className="text-xl md:text-2xl  text- tracking-wide font-normal text-black">
                      <TruncatedText text={serviceInfo?.content || ""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full lg:-mt-80  ">
                <div className=" rounded-md lg:w-1/3 h-full flex flex-col items-center justify-between">
                  <div className="w-full relative rounded-lg !-z-[3] ">
                    <img
                      src={serviceInfo?.image || ""}
                      alt=""
                      className="w-full h-full group-hover:scale-105 transition-all duration-200  object-contain rounded-lg -z-[3]"
                    />
                    <div
                      style={{ opacity: `${serviceInfo?.opacity}%` }}
                      className="absolute inset-0  !z-[3] bg-black   text-white "
                    ></div>
                  </div>
                </div>
              </div>

              <HomeLatestServices />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default HomeInformation;
