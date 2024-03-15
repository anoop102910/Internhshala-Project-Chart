import React, { useEffect, useState } from "react";
import { useChartData } from "../hooks/useChartData";
import ReactApexChart from "react-apexcharts";

function Chart({chartOptions}) {
  return (
    <div>
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={400}
        width={700}
      />
    </div>
  );
}

export default Chart;
