import { Link } from "react-router-dom";

const ServiceCardForSearch = ({ service }) => {
  return (
    <>
      {service && (
        <Link
          to={`/magaza-ve-restoranlar/${service.id}`}
          className="h-full w-full mb-6"
        >
          <div className="w-full h-full border border-slate-100 p-4 flex flex-col  transition-all duration-200 rounded-lg shadow-lg group md:hover:-translate-y-3">
            <div className="w-full h-full flex overflow-hidden items-center justify-center rounded-lg  max-h-[200px] md:max-h-full">
              <img
                src={service.logo}
                alt=""
                className="w-full group-hover:scale-105 transition-all duration-200  object-contain rounded-lg"
              />
            </div>
            <h2 className="group-hover:text-colorPrimary text-start text-sm md:text-base mt-4 text-black font-medium">
              {service.name}
              {" - "}
              {`Mərtəbə ${
                service.floor === 1
                  ? "bir"
                  : service.floor === 2
                  ? "iki"
                  : service.floor === 3
                  ? "üç"
                  : null
              } `}
            </h2>
          </div>
        </Link>
      )}
    </>
  );
};

export default ServiceCardForSearch;
