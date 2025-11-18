import { useState } from "react";

export default function useApi(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const request = async (...args) => {
    try {
      setLoading(true);
      const result = await apiFunc(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Something went wrong");
      return null;
    }
  };

  return { request, loading, error };
}
