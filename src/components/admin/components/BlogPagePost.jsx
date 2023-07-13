import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firestore from "../../utils/Firestore";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const firestore = new Firestore();
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
    let test2 = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    await firestore.getDocById("blog", id).then((res) => {
      setData((old) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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

        data2[res.views[i].data.toDate().getHours()] =
          data2[res.views[i].data.toDate().getHours()] + 1;
      }
      if (ok) {
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

  const max = (array) => {
    let maxim = 0;
    // console.log(array)
    array.forEach((e) => {
      // console.log  (e);
      if (e > maxim) {
        maxim = e;
      }
    });
    return maxim;
  };

  const hours = (array) => {
    let maxim = 0,
      index = 0;
    array.forEach((e, i) => {
      if (e > maxim) {
        maxim = e;
        index = i;
      }
    });

    return index + " - " + (index + 1);
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
      <h2 style={{ color: "white" }}>Vizualizari din ultimul an</h2>
      <Chart
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
          <div className="tti">
            <h3 data-aos="fade-down">Vizualizari detaliate</h3>
            <div data-aos="fade-left" className="linie"></div>
          </div>
          <h4>
            numar maxim de vizualizari:{" "}
            <span>{max(chartData2.datasets[0].data)}</span>
          </h4>
          <h4>
            maximul de vizualizari a fost intre orele:{" "}
            <span>
              {chartData2.datasets[0].data &&
                hours(chartData2.datasets[0].data)}
            </span>
          </h4>
        </div>
        <div className="rr">
          <Chart
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
    </div>
  );
}

export default BlogPagePost;
