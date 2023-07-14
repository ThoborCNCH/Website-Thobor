import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firestore from "../../utils/Firestore";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const firestore = new Firestore();
const zile = [
  "duminica",
  "luni",
  "marti",
  "miercuri",
  "joi",
  "vineri",
  "sambata",
];
const luni = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];
const ore = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

function BlogPagePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  let [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let [data2, setData2] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  let [data3, setData3] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [ok, setOk] = useState(true);
  let [chartData, setChartData] = useState({
    labels: luni,
    datasets: [
      {
        tension: 0.3,
        fill: false,
        label: "Vizualizari",
        data: data,
        borderColor: "white",
        radius: 5,
        borderWidth: 2,
      },
    ],
  });
  let [chartData3, setChartData3] = useState({
    labels: zile,
    datasets: [
      {
        tension: 0.3,
        fill: false,
        label: "Vizualizari",
        data: data3,
        borderColor: "white",
        radius: 5,
        borderWidth: 2,
      },
    ],
  });
  let [chartData2, setChartData2] = useState({
    // labels: ore,
    datasets: [
      {
        tension: 0.3,
        fill: false,
        label: "Vizualizari pe ora",
        data: data2,
        borderColor: "white",
        radius: 5,
        borderWidth: 2,
      },
    ],
  });

  const getIt = async () => {
    console.log(ok);

    await firestore.getDocById("blog", id).then((res) => {
      setData((old) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setData3((old) => [0, 0, 0, 0, 0, 0, 0]);
      setData2([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      setPost({ ...res });
      for (let i = 0; i < res.views.length && ok; i++) {
        data[res.views[i].data.toDate().getMonth()] =
          data[res.views[i].data.toDate().getMonth()] + 1;
        // const index = res.views[i].data.toDate().getHours();
        // setData2([data2[index]++]);
        // increment(index);

        data3[res.views[i].data.toDate().getDay()] =
          data3[res.views[i].data.toDate().getDay()] + 1;

        // console.log(zile[res.views[i].data.toDate().getDay()]);

        data2[res.views[i].data.toDate().getHours()] =
          data2[res.views[i].data.toDate().getHours()] + 1;
      }
      if (ok) {
        setChartData3({
          labels: zile,

          datasets: [
            {
              label: false,
              data: data3,
              backgroundColor: [
                "#26b33e",
                "#FFFF00",
                "#6ef188",
                "#146622",
                "#06083d",
                "#F96167",
                "#F9E795",
              ],
              borderColor: "white",
            },
          ],
        });
        setChartData2({
          labels: ore,

          datasets: [
            {
              label: false,
              data: data2,
            },
          ],
        });
        setChartData({
          labels: luni,
          datasets: [
            {
              backgroundColor: ["#26b33e"],
              tension: 0.3,
              fill: false,
              label: "Vizualizari",
              data: data,
              borderColor: "white",
              radius: 5,
              borderWidth: 2,
              data: data,
            },
          ],
        });
      }
      ok = false;
    });
  };

  const maxmin = (array) => {
    let maxim = 0,
      min = 9999999;
    array.forEach((e) => {
      if (e > maxim) {
        maxim = e;
      }
      if (e < min) min = e;
    });
    return { maxim, min };
  };

  const hours = (array) => {
    let maxim = 0,
      min = 9999999,
      index = 0,
      index2 = 0;
    array.forEach((e, i) => {
      if (e > maxim) {
        maxim = e;
        index = i;
      }
      if (e < min) {
        min = e;
        index2 = i;
      }
    });

    return {
      max: index + " - " + (index + 1),
      min: index2 + " - " + (index2 + 1),
    };
  };

  const days = (array) => {
    console.log(array);
    let maxim = 0,
      min = 9999999,
      index = 0,
      index2 = 0;
    array.forEach((e, i) => {
      if (e > maxim) {
        maxim = e;
        index = i;
      }
      if (e < min) {
        min = e;
        index2 = i;
      }
    });

    return { max: zile[index], min: zile[index2] };
  };

  useEffect(() => {
    AOS.init();
    getIt();
  }, []);

  return (
    <div className="adminpage">
      <div className="chart_part">
        <div className="form">
          <h1 data-aos="fade-right">STATISTICI POSTARE</h1>
        </div>
      </div>
      <h2 style={{ color: "white" }} data-aos="fade-left">
        Vizualizari din ultimul an
      </h2>
      <Chart
        data-aos="fade-up"
        className="chart"
        type="line"
        data={chartData}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            y: {
              ticks: {
                color: "white",
                beginAtZero: true,
                font: {
                  family: "montserrat",
                  size: 13,
                  weight: 400,
                },
              },
            },
            x: {
              ticks: {
                color: "white",
                beginAtZero: true,
                font: {
                  family: "montserrat",
                  size: 13,
                  weight: 400,
                },
              },
            },
          },
        }}
      />
      <div className="tti">
        <h3 data-aos="fade-down">Vizualizari detaliate</h3>
        <div data-aos="fade-left" className="linie"></div>
      </div>
      <div className="hour">
        <div className="ll">
          {" "}
          {/* <button
            //   debugging
            onClick={() => {
              //   console.log(chartData.datasets[0].data);
              console.log(chartData2.datasets[0].data);
            }}
          >
            show
          </button> */}
          <h1 data-aos="fade-left">Statistica per saptamana</h1>
          <h4 data-aos="fade-right">
            numar maxim de vizualizari:{" "}
            <span data-aos-delay={500} data-aos="fade-down">
              {maxmin(chartData2.datasets[0].data).maxim}
            </span>
          </h4>
          <h4 data-aos="fade-right">
            maximul de vizualizari a fost intre orele:{" "}
            <span data-aos="fade-up" data-aos-delay={500}>
              {chartData2.datasets[0].data &&
                hours(chartData2.datasets[0].data).max}
            </span>
          </h4>
          <hr data-aos="fade-zoom" />
          <h4 data-aos="fade-left">
            numar minim de vizualizari:{" "}
            <span data-aos="fade-down" data-aos-delay={500}>
              {maxmin(chartData2.datasets[0].data).min}
            </span>
          </h4>
          <h4 data-aos="fade-right">
            minimul de vizualizari a fost intre orele:{" "}
            <span data-aos="fade-up" data-aos-delay={500}>
              {chartData2.datasets[0].data &&
                hours(chartData2.datasets[0].data).min}
            </span>
          </h4>
        </div>
        <div className="rr">
          <Chart
            data-aos="fade-left"
            type="polarArea"
            data={chartData2}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  ticks: {
                    color: "white",
                    beginAtZero: true,
                    font: {
                      family: "montserrat",
                      size: 13,
                      weight: 400,
                    },
                  },
                },
                x: {
                  ticks: {
                    color: "white",
                    beginAtZero: true,
                    font: {
                      family: "montserrat",
                      size: 13,
                      weight: 400,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="hour">
        <div className="rr">
          <Chart
            type="pie"
            data-aos="fade-right"
            data={chartData3}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  ticks: {
                    color: "white",
                    beginAtZero: true,
                    font: {
                      family: "montserrat",
                      size: 13,
                      weight: 400,
                    },
                  },
                },
                x: {
                  ticks: {
                    color: "white",
                    beginAtZero: true,
                    font: {
                      family: "montserrat",
                      size: 13,
                      weight: 400,
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div className="ll">
          {" "}
          {/* <button
            //   debugging
            onClick={() => {
              //   console.log(chartData.datasets[0].data);
              console.log(chartData2.datasets[0].data);
            }}
          >
            show
          </button> */}
          <h1 data-aos="fade-left">Statistica per ore</h1>
          <h4 data-aos="fade-right">
            numar maxim de vizualizari:{" "}
            <span data-aos-delay={500} data-aos="fade-down">
              {maxmin(chartData3.datasets[0].data).maxim}
            </span>
          </h4>
          <h4 data-aos="fade-left">
            maximul de vizualizari a fost:{" "}
            <span data-aos-delay={500} data-aos="fade-up">
              {chartData3.datasets[0].data &&
                days(chartData3.datasets[0].data).max}
            </span>
          </h4>
          <hr data-aos="fade-zoom" />
          <h4 data-aos="fade-right">
            numar min de vizualizari:{" "}
            <span data-aos-delay={500} data-aos="fade-down">
              {maxmin(chartData3.datasets[0].data).min}
            </span>
          </h4>
          <h4 data-aos="fade-left">
            maximul de vizualizari a fost:{" "}
            <span data-aos-delay={500} data-aos="fade-up">
              {chartData3.datasets[0].data &&
                days(chartData3.datasets[0].data).min}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default BlogPagePost;
