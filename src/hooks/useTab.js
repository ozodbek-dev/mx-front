import { get } from "lodash";
import qs from "qs";
import { useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const useTab = ({ tabKey = "tab", customParams, defaultValue = "1" } = {}) => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const handleTabChange = useCallback(
    (v, key, params = {}) => {
      setSearchParams({
        ...qs.parse(search.slice(1)),
        ...params,
        ...customParams,
        [key ? key : tabKey]: v,
      });
    },
    [tabKey, setSearchParams, search, customParams]
  );

  const getTab = (tabKey) =>
    get(qs.parse(search.slice(1)), tabKey, defaultValue);
  return { tab: getTab(tabKey) ?? defaultValue, handleTabChange, tabs: getTab };
};

export default useTab;
