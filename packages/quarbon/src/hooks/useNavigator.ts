/** @format */

import { useNavigate } from "react-router-dom";

export function useNavigator() {
  const navigate = useNavigate();

  return {
    to(path: string, params: any = null) {
      sessionStorage.setItem(path, JSON.stringify(params));

      navigate(path);

      setTimeout(() => {
        sessionStorage.removeItem(path);
      }, 1000);
    },

    params(path: string) {
      let params = sessionStorage.getItem(path);
      
      if (params) return JSON.parse(params);

      return null;
    },
  };
}
