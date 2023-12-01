import { Link } from "react-router-dom";
import { FaShoppingCart, FaBlog } from "react-icons/fa";
import { MdNewReleases, MdRestaurant } from "react-icons/md";

const categories = [
  {
    id: 1,
    path: "/magaza-ve-restoranlar",
    title: "Mağazalar",
    icon: (
      <FaShoppingCart className="group-hover:text-white text-xl md:text-2xl" />
    ),
  },
  {
    id: 2,
    path: "/magaza-ve-restoranlar",
    title: "Restoranlar",
    icon: (
      <MdRestaurant className="group-hover:text-white text-xl md:text-2xl" />
    ),
  },
  {
    id: 3,
    path: "/xeberler-ve-yenilikler",
    title: "Xəbərlər",
    icon: <FaBlog className="group-hover:text-white text-xl md:text-2xl" />,
  },
  {
    id: 4,
    path: "/xeberler-ve-yenilikler",
    title: "Yeniliklər",
    icon: (
      <MdNewReleases className="group-hover:text-white text-xl md:text-2xl" />
    ),
  },
];

const HomeCategories = () => {
  return (
    <section className="container px-4 ">
      <div className="grid  xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {categories.map((item, index) => (
          <Link to={item.path} key={index}>
            <div className="w-full h-[150px] p-4 flex items-center justify-center gap-2 bg-white hover:bg-gradient-to-r to-colorSecondary from-colorPrimary transition-all duration-100 rounded-lg shadow-lg group hover:-translate-y-2 text-black group">
              {item.icon}
              <span className="group-hover:text-white text-base md:text-xl  text-black">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
