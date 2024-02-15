/* eslint-disable no-unused-vars */
import { useState } from "react";

export const useNewsQuery = (initType = []) => {
  const [res, setRes] = useState(initType);
  const [loading, setLoading] = useState(false);

  const geFetchData = async (url, cb) => {
    setLoading(true);

    try {
      let res = await fetch(url);
      const result = await res.json();

      if (cb) {
        cb && cb(result);
      } else setRes(result);
      setLoading(false);
    } catch (err) {
      console.log("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };
  return [res, geFetchData, loading];
};


