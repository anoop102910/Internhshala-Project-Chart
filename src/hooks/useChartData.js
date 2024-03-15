import { useState, useEffect } from "react";
import axios from "axios";

export const useChartData = (url, options) => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setChartData(response.data.requests);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  return [chartData, isLoading,error];
};
