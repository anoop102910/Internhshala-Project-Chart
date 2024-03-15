import Chart from "./components/Chart";
import { useChartData } from "./hooks/useChartData";

function App() {
  const [data, loading, error] = useChartData("https://checkinn.co/api/v1/int/requests");


  // get total number of request from each hotel using each hotel id
  let totalRequests = 0;
  const chartData = data.reduce((acc, current) => {
    const existingHotel = acc.find(item => item.hotel.id === current.hotel.id);
    totalRequests++;
    if (existingHotel) {
      existingHotel.requests++;
    } else {
      acc.push({ hotel: { ...current.hotel }, requests: 1 });
    }
    return acc;
  }, []);

  const chartOptions = {
    options: {
      chart: {
        type: "line",
      },
      subtitle: {
        text: "Requests per hotel",
        align: "center",
        margin: 100,
        style: {
          fontSize: "20",
        },
      },
      xaxis: {
        categories: chartData.map(data => data.hotel.shortname),
      },
    },
    series: [
      {
        name: "requests",
        data: chartData.map(data => data.requests),
      },
    ],
  };

  // get unique department
  const departmentId = [...new Set(data.map(request => request.desk.id))];

  // get department name
  const department = departmentId.map(deskId => {
    const requestWithDesk = data.find(request => request.desk.id === deskId);
    return requestWithDesk.desk.name;
  });

  if (loading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center flex-col ">
        <div className="w-[44rem] h-[20rem] bg-slate-300 animate-pulse rounded-md shadow-md"></div>
      </div>
    );

  if (error) return <div className="text-3xl font-bold">Something went wrong </div>;

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col ">
        <Chart chartOptions={chartOptions} />
        <div className="w-[44rem]">
          <p className="text-xl text-slate-800 text-center">Total Requests : {totalRequests}</p>
          <p className="mt-4 text-sm text-slate-500 leading-6">
            List of <span className=" italic">unique</span> department names across all the Hotels :{" "}
            {department + " "}{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
