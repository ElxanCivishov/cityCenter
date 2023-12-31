import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMobile,
  FaEnvelope,
} from "react-icons/fa";

import { RESET, getLayout } from "../../features/layout/layoutSlice";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const dispatch = useDispatch();

  const { isSuccess, layout } = useSelector((state) => state.layout);

  useEffect(() => {
    dispatch(getLayout());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(RESET());
    }
  }, [isSuccess, dispatch]);
  return (
    <footer className="bg-white text-black">
      <div className="container p-4 md:p-0">
        <Newsletter />
        <div className="p-4 border-t border-t-slate-200">
          <div className="grid md:grid-cols-5">
            <div className="flex mt-4 flex-col  col-span-2 gap-1 md:gap-2 text-black">
              {layout && (
                <>
                  <h4 className="  font-semibold">Bizimlə əlaqə</h4>
                  <div className="flex items-center gap-2">
                    {(layout.number_1 || layout.number_2) && (
                      <>
                        <FaMobile />
                        <Link
                          to={`tel:${layout.number_1}`}
                          className=" hover:underline text-sm md:text-base flex items-center gap-1"
                        >
                          {layout.number_1}
                        </Link>
                        {layout.number_2 && (
                          <>
                            ,{" "}
                            <Link
                              to={`tel:${layout.number_2}`}
                              className=" hover:underline text-sm md:text-base flex items-center gap-1"
                            >
                              {layout.number_2}
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {layout.email && (
                    <Link
                      to={`mailto:${layout.email}`}
                      className=" hover:underline text-sm md:text-base flex items-center gap-2"
                    >
                      <FaEnvelope className="text-zinc-800" />
                      {layout.email}
                    </Link>
                  )}

                  {layout.address_url && layout.address && (
                    <Link
                      to={layout.address_url}
                      target="_blank"
                      className=" hover:underline text-sm md:text-base flex items-center gap-2"
                    >
                      <FaLocationDot />
                      {layout.address}
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="mt-4 ">
              <h4 className="text-black mb-2 font-semibold">Keçidlər</h4>
              <div className="flex flex-col gap-1 md:gap-2">
                <Link
                  className="text-black hover:underline text-sm md:text-base"
                  to="/magaza-ve-restoranlar"
                >
                  Mağaza və Restoran
                </Link>

                <Link
                  className="text-black hover:underline text-sm md:text-base"
                  to="/xeberler-ve-yenilikler"
                >
                  Xəbər və Yenilik
                </Link>
                <Link
                  className="text-black hover:underline text-sm md:text-base"
                  to="/elaqe"
                >
                  Əlaqə
                </Link>
              </div>
            </div>
            <div className="mt-4 w-full order-first md:order-last col-span-2 rounded-lg overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d759.9387871569635!2d49.832676016867985!3d40.3699532153875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db70fa941df%3A0x7cf18d5b9d7eabbe!2sCity%20Centre%2C%20%C6%8Fhm%C9%99d%20Cavad%20k.%20ma%C4%9Faza%2036.!5e0!3m2!1saz!2saz!4v1701415308324!5m2!1saz!2saz"
                className="w-full h-full border-0 order-first rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div
          className={`p-4 pb-16 md:pb-4  xs:border-t xs:border-t-slate-200 flex items-center  gap-2 ${
            layout?.instagram || layout?.facebook
              ? "justify-between"
              : "justify-center"
          }`}
        >
          <p className="mb-0 text-black text-sm md:text-base font-medium">
            &copy; {new Date().getFullYear()} Bütün hüquqlar qorunur!
          </p>
          {(layout?.instagram || layout?.facebook) && (
            <div className="flex  gap-1 items-center">
              {layout?.instagram && (
                <Link
                  to={layout?.instagram}
                  target="_blank"
                  className="flex w-full flex-col items-center justify-center text-red-500 hover:text-red-600"
                >
                  <FaInstagramSquare className="text-3xl" />
                </Link>
              )}
              {layout?.facebook && (
                <Link
                  to={layout?.facebook}
                  target="_blank"
                  className="flex w-full flex-col items-center justify-center text-blue-500 hover:text-blue-600"
                >
                  <FaFacebookSquare className="text-3xl" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
