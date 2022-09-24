import React, { useEffect, useState } from "react";

export default function useFetch({ url }: { url: string }) {
  const [response, setResponse] = useState({
    isLoading: false,
    data: null,
    error: "",
  });

  async function fetcher(url: string) {
    setResponse((res) => {
      return {
        ...res,
        isLoading: true,
      };
    });

    try {
      const res = await fetch(url);
      if (!res.ok) {
        setResponse((res) => {
          return {
            ...res,
            isLoading: false,
            error: res.error,
          };
        });
        return;
      }
      const json = await res.json();

      setResponse((res: any) => {
        return {
          ...res,
          isLoading: false,
          data: json,
        };
      });
    } catch (err: any) {
      setResponse((res) => {
        return {
          ...res,
          isLoading: false,
          error: err,
        };
      });
    }
  }

  useEffect(() => {
    fetcher(url);
  });

  return response;
}
