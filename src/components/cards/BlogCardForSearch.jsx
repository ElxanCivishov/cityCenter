import { Link } from "react-router-dom";
import noimage from "/images/noImage.png";
import { convertDateTime } from "../../helper/date-fns";
import TruncatedText from "../TruncatedText";
const BlogCardForSearch = ({ blog }) => {
  return (
    blog && (
      <div className="w-full h-full bg-white  transition-all duration-200  group  shadow-lg rounded-lg">
        <Link to={`/xeber/${blog.id}`} className="h-full w-full">
          <div className="w-full rounded-t-lg overflow-hidden flex items-center justify-center  h-[250px] bg-white">
            <img
              src={blog.image || noimage}
              alt=""
              className="w-full h-full group-hover:scale-105 transition-all duration-200  object-cover "
            />
          </div>
          <div className="p-4 bg-white mt-2 flex flex-col justify-between gap-2 md:gap-3">
            <h5 className="text-sm md:text-base text-black font-bold">
              {blog.title}
            </h5>
            <p className="text-[13px]  font-semibold text-black">
              <span className=" text-xs md:text-sm capitalize">
                {convertDateTime(blog.updated_at)}
              </span>
            </p>
            <div className="text-[15px]  font-medium text-black">
              <TruncatedText text={blog?.content || ""} maxLength={50} />
            </div>
          </div>
        </Link>
      </div>
    )
  );
};

export default BlogCardForSearch;
