import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import { Dayjs } from "dayjs";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    y: { ticks: { font: { size: 16, family: "pangolin" } } },
    x: { ticks: { font: { size: 16, family: "pangolin" } } },
  },
};

type Props = {
  games: {
    guesses: number;
    win: boolean;
    date: Dayjs;
  }[];
};

export default function Chart({ games }: Props) {
  const histogramData = games.reduce(
    (obj, game) => {
      const score = game.guesses;
      if (game.win) {
        obj[score] = (obj[score] || 0) + 1;
      } else {
        obj["fail"] = (obj["fail"] || 0) + 1;
      }
      return obj;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 } as any
  );
  const labels = Object.keys(histogramData);
  const dataset: ChartDataset = {
    // label: "Score",
    data: Object.values(histogramData),
    backgroundColor: "#da9100",
    type: "bar",
    maxBarThickness: 75,
    minBarLength: 1,
  };
  const data = {
    labels,
    datasets: [dataset],
  };
  return (
    <Bar
      className="my-8 border-[teal] border-[1px] p-2 rounded bg-white"
      // options={options}
      options={{
        scales: {
          y: { ticks: { font: { size: 16, family: "pangolin" } } },
          x: { ticks: { font: { size: 16, family: "pangolin" } } },
        },
        plugins: {
          title: { display: false },
          legend: { display: false },
        },
      }}
      data={data}
    />
  );
}
