import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { convertDateTime } from "../../../helper/date-fns";
import { getContact } from "../../../features/contact/contactSlice";
import { Meta } from "../../../components/layout";

const ViewContact = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { contact } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getContact(id));
  }, [id, dispatch]);

  return (
    <>
      <Meta title="İcarə" />
      <div className="p-6 bg-white   rounded-lg shadow dark:bg-slate-700 dark:bg-opacity-50  ">
        <div className="flex items-center gap-2 justify-between mb-3">
          <h3 className="text-gray-700  dark:text-slate-100 text-xl font-semibold">
            Icarə müraciəti
          </h3>
          <p className="font-semibold">
            Tarix:
            <span className="ms-2">{convertDateTime(contact?.created_at)}</span>
          </p>
        </div>
        <div className="flex  flex-col gap-3 mt-5">
          <div className="flex gap-2 items-center">
            <h5 className="text-base  dark:text-gray-200">Ad:</h5>
            <p className="font-normal text-gray-700  dark:text-gray-400">
              {contact?.full_name}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <h5 className="text-base  dark:text-gray-200">Email:</h5>
            <p className="font-normal text-gray-700  dark:text-gray-400">
              {contact?.email}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <h5 className="text-base  dark:text-gray-200">Nömrə:</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <a href={`tel:+91${contact?.number}`}>{contact?.number}</a>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <h5 className="text-base  dark:text-gray-200">Mövzu:</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {contact?.subject}
            </p>
          </div>
          <div className="flex gap-2">
            <h5 className="text-base  dark:text-gray-200">Qeyd:</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {contact?.note}
            </p>
          </div>
        </div>

        <Link
          to="/admin/contacts"
          className="text-white bg-emerald-500  shadow-lg shadow-gray-500/50  font-medium rounded-lg text-sm px-3 py-2 text-center  flex max-w-max items-center my-4"
        >
          <BiArrowBack className="me-2" /> geri
        </Link>
      </div>
    </>
  );
};

export default memo(ViewContact);
