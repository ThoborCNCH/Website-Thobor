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

function BlogPagePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  let [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let [ok, setOk] = useState(true);
  let [chartData, setChartData] = useState({
    labels: luni,
    datasets: [
      {
        tension: 0.3,
        fill: false,
        label: "Vizualizari",
        data: data,
        backgroundColor: ["#26b33e"],
        borderColor: "white",
        radius: 5,
        borderWidth: 2,
      },
    ],
  });
  const getIt = async () => {
    await firestore.getDocById("blog", id).then((res) => {
      setData((old) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setPost({ ...res });
      for (let i = 0; i < res.views.length && ok; i++) {
        data[res.views[i].data.toDate().getMonth()] =
          data[res.views[i].data.toDate().getMonth()] + 1;
        console.log("da");
      }
      if (ok) {
        setChartData({
          labels: luni,
          datasets: [
            {
              label: "Vizualizari",
              data: data,
              backgroundColor: ["#26b33e"],
            },
          ],
        });
      }
      ok = false;
    });
  };

  useEffect(() => {
    console.log(ok);
    getIt();
    console.log(ok);
  }, []);

  return (
    <div className="adminpage">
      {/* <button
    //   debugging
        onClick={() => {
          console.log(chartData.datasets[0].data);
        }}
      >
        show
      </button> */}
      <Chart type="line" data={chartData} />
    </div>
  );
}

export default BlogPagePost;
