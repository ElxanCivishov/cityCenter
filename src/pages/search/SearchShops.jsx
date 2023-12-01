import React, { useMemo } from "react";
import { ServiceCardForSearch } from "../../components/cards";

const SearchShops = ({ services, search }) => {
  const displayServices = useMemo(() => {
    if (!search.get("search")) {
      return services.slice(0, 4);
    }
    return services;
  }, [services, search]);

  return (
    <>
      {displayServices.map((s) => (
        <ServiceCardForSearch key={s.id} service={s} />
      ))}
    </>
  );
};

export default SearchShops;
