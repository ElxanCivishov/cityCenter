import React, { useMemo } from "react";
import { ServiceCardForSearch } from "../cards";

const SearchShops = ({ services, search }) => {
  const displayServices = useMemo(() => {
    if (!search.get("search")) {
      return services.slice(0, 4);
    }
    return services;
  }, [services, search]);

  return (
    <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 my-6 transition-all duration-400">
      {displayServices.map((s) => (
        <ServiceCardForSearch key={s.id} service={s} />
      ))}
    </div>
  );
};

export default SearchShops;
