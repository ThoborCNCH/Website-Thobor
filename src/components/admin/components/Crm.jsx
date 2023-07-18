import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import Text from "../../utils/Text";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Placeholder from "../../utils/Placeholder";
import AOS from "aos";
import "aos/dist/aos.css";

const firestore = new Firestore();

function Crm({ taskss }) {
  const returnSizedText = (text) => {
    if (text.length > 50) return text.slice(0, 50) + "...";
    return text;
  };
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [role, setRole] = useState("");
  const [newTask, setNewTask] = useState({
    user: user.email,
    cerinta: "",
    detalii: "",
    departament: "",
    de: "",
    stare: "neinceput",
    aprobat: false,
    observatii: "",
    preluat: false,
    createdAt: Timestamp.now(),
  });
  const [isAllowed, setIsAllowed] = useState(false);
  const [tasks_general, setTasksGeneral] = useState(taskss);

  const addNewTask = async () => {
    await firestore.addItem("tasks", newTask).then((res) => {
      setTasksGeneral((old) => [res, ...old]);
      document.querySelectorAll("input, textarea").forEach((input) => {
        input.value = "";
      });
      alert("task adaugat");
    });
  };

  const [myTasks, setMyTasks] = useState([]);
  const getMy = async () => {
    await firestore
      .readDocuments("thobor_users", ["email", "==", user.email])
      .then(async (res) => {
        setRole(res[0].role);
        if (!["ldd", "alumni", "mentor", "admin"].includes(res[0].role)) {
          setIsAllowed(false);
          await firestore
            .readDocuments("tasks", ["de", "==", user.email])
            .then((res) => {
              setMyTasks(
                res.sort(function (x, y) {
                  return y.createdAt - x.createdAt;
                })
              );
            });
        } else {
          setIsAllowed(true);
          await firestore
            .readDocuments("tasks", ["user", "==", user.email])
            .then((res) => {
              setMyTasks(
                res.sort(function (x, y) {
                  return y.createdAt - x.createdAt;
                })
              );
            });
        }
      });
  };

  useEffect(() => {
    AOS.init();
    getMy();
  }, []);
  useEffect(() => {
    taskss = taskss.sort(function (x, y) {
      return y.createdAt - x.createdAt;
    });
    console.log(taskss);
    setTasksGeneral((old) => (old = taskss));
  }, [taskss]);

  const updateFieldById = (id, fieldToUpdate, newValue) => {
    setTasksGeneral((prevArray) => {
      const updatedArray = prevArray.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [fieldToUpdate]: newValue,
            ["de"]: user.email,
          };
        }
        return item;
      });

      return updatedArray;
    });
  };
  const preia = async (task) => {
    task.aprobat = false;
    await firestore
      .updateDocument("tasks", task.id, { preluat: true, de: user.email })
      .then((res) => {
        updateFieldById(task.id, "preluat", true);
        setMyTasks((old) => [task, ...old]);
        alert("task preluat");
      });
  };

  const updatenewTask = (field, e) => {
    setNewTask((old) => ({
      ...old,
      [field]: e,
    }));
  };

  const [rezolvare, setRezolvare] = useState({
    explicatie: "",
    file: {},
  });

  const updateRezolvare = (field, e) => {
    setRezolvare((old) => {
      return { ...old, [field]: e };
    });
  };

  const setrezolvare = async (id) => {
    if (!rezolvare.explicatie || !rezolvare.file) {
      alert("trebuie sa explici sau sa urci un fisier!");
    } else {
      let obj = { ...rezolvare };
      // console.log(rezolvare.file, rezolvare.file==={})
      if (Object.keys(rezolvare.file).length !== 0) {
        const storage = getStorage();
        const storageRef = ref(storage, `crm/${rezolvare.file.name}`);
        try {
          await uploadBytes(storageRef, rezolvare.file);
          const url = await getDownloadURL(storageRef);
          obj["file"] = url;
        } catch (error) {}
      }
      await firestore
        .updateDocument("tasks", id, { rezolvare: obj, stare: "terminat" })
        .then((res) => {
          setTasksGeneral((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "terminat",
                };
              }
              return item;
            });

            return updatedArray;
          });
          setMyTasks((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "terminat",
                };
              }
              return item;
            });

            return updatedArray;
          });
          setRezolvare({
            explicatie: "",
            file: {},
          });
          alert("rezolvare trimisa");
        });
    }
  };

  const [observatie, setObservatie] = useState("");
  const [p, setP] = useState(false);

  const decide = async (id, decizie) => {
    let obs = "";
    let stare = "in lucru";
    if (decizie) stare = "terminat";
    else {
      obs = observatie;
    }
    await firestore
      .updateDocument("tasks", id, {
        aprobat: decizie,
        stare: stare,
        observatii: obs,
      })
      .then((res) => {
        setTasksGeneral((prevArray) => {
          const updatedArray = prevArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ["aprobat"]: decizie,
              };
            }
            return item;
          });

          return updatedArray;
        });
        setMyTasks((prevArray) => {
          const updatedArray = prevArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ["aprobat"]: decizie,
              };
            }
            return item;
          });

          return updatedArray;
        });
        if (decizie) {
          setTasksGeneral((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "terminat",
                };
              }
              return item;
            });

            return updatedArray;
          });
          setMyTasks((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "terminat",
                };
              }
              return item;
            });

            return updatedArray;
          });
          alert("Ai aprobat acest task");
        } else {
          setTasksGeneral((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "in lucru",
                };
              }
              return item;
            });

            return updatedArray;
          });
          setMyTasks((prevArray) => {
            const updatedArray = prevArray.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ["stare"]: "in lucru",
                };
              }
              return item;
            });

            return updatedArray;
          });
          alert("Ai refuzat acest task");
        }
        setP(false);
        setObservatie("");
      });
  };
  const delete_task = async (id) => {
    await firestore.deleteDocument("tasks", id).then((res) => {
      setTasksGeneral(tasks_general.filter((item) => item.id !== id));
      setMyTasks(myTasks.filter((item) => item.id !== id));
      alert("task sters");
    });
  };

  const refuza = async (id) => {
    await firestore
      .updateDocument("tasks", id, {
        preluat: false,
        de: "",
        stare: "neinceput",
      })
      .then((res) => {
        updateFieldById(id, "preluat", false);
        setMyTasks(myTasks.filter((item) => item.id !== id));
        alert("task refuzat");
      });
  };
  const incepe_task = async (id) => [
    await firestore
      .updateDocument("tasks", id, { stare: "in lucru" })
      .then((res) => {
        setTasksGeneral((prevArray) => {
          const updatedArray = prevArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ["stare"]: "in lucru",
              };
            }
            return item;
          });

          return updatedArray;
        });
        setMyTasks((prevArray) => {
          const updatedArray = prevArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ["stare"]: "in lucru",
              };
            }
            return item;
          });

          return updatedArray;
        });
        alert("Ai inceput un task");
      }),
  ];

  return (
    <div className="adminpage">
      {!isAllowed && (
        <div className="crm_part">
          <div className="form">
            <h1>Tasks</h1>
          </div>
        </div>
      )}
      {isAllowed && (
        <div className="crm_part">
          <div className="form">
            <h1>Adauga task</h1>
            <input
              type="text"
              placeholder="Scrie o cerinta"
              onChange={(e) => updatenewTask("cerinta", e.target.value)}
            />
            <textarea
              cols="30"
              placeholder="Scrie detaliile pentru task"
              rows="10"
              onChange={(e) => updatenewTask("detalii", e.target.value)}
            ></textarea>
            <select
              onChange={(e) => updatenewTask("departament", e.target.value)}
            >
              <option value="">Departamente</option>
              <option value="programare">Programare</option>
              <option value="mecanica">Mecanica</option>
              <option value="proiectare">Proiectare</option>
              <option value="caiet">Caiet</option>
              <option value="marketing">Marketing</option>
            </select>
            <button className="button" onClick={addNewTask}>
              submit
            </button>
          </div>
        </div>
      )}
      <div className="lista">
        <div className="tti">
          <h3 data-aos="fade-down">Toate taskurile disponibile</h3>
          <div data-aos="fade-left" className="linie"></div>
        </div>
        {tasks_general &&
          tasks_general.map((task) => {
            if (task.departament === role && !isAllowed)
              return (
                <>
                  <div className="taskk">
                    <div className="info">
                      <h2>
                        task dat de <span>{task.user}</span>
                      </h2>
                      <p>{task.cerinta}</p>
                      <p>{task.detalii}</p>
                      {task.preluat ? (
                        <h4>
                          preluat: <span> {task.de}</span>
                        </h4>
                      ) : (
                        <h4>Nu e preluat de nimeni</h4>
                      )}
                    </div>
                    {!task.preluat && (
                      <button className="button" onClick={() => preia(task)}>
                        Preia task
                      </button>
                    )}
                  </div>
                </>
              );
            else if (isAllowed) {
              return (
                <>
                  <div className="taskk">
                    <div className="info">
                      <h2>
                        task dat de <span>{task.user}</span>
                      </h2>
                      <p>{task.cerinta}</p>
                      <p>{task.detalii}</p>
                      {task.preluat ? (
                        <h4>
                          preluat: <span> {task.de}</span>
                        </h4>
                      ) : (
                        <h4>Nu e preluat de nimeni</h4>
                      )}{" "}
                    </div>
                  </div>
                </>
              );
            }
          })}
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Preluat de</th>
              <th>Stare</th>
              <th>Aprobat</th>
            </tr>
          </thead>
          <tbody>
            {tasks_general &&
              tasks_general.map((task) => {
                return (
                  task.preluat && (
                    <tr>
                      <td>
                        <p>{returnSizedText(task.cerinta)}</p>
                      </td>
                      <td>
                        <h5>{task.de}</h5>
                      </td>
                      <td>
                        <h5>{task.stare}</h5>
                      </td>
                      <td>
                        <b>
                          {task.aprobat ? (
                            <span style={{ color: "#6ef188" }}>DA</span>
                          ) : (
                            <span style={{ color: "#dc3545" }}>NU</span>
                          )}
                        </b>
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="rezolvare">
        <div className="tti">
          <h3 data-aos="fade-down">Toate taskurile mele</h3>
          <div data-aos="fade-left" className="linie"></div>
        </div>
        {isAllowed ? (
          <>
            {myTasks &&
              myTasks.map((task) => {
                let date = task.createdAt.toDate();
                return (
                  <>
                    <div className="taskk">
                      <div className="info">
                        <h2>
                          task dat pe{" "}
                          <span>
                            {date.getDay()}.{date.getMonth()}.{date.getYear()}
                          </span>
                        </h2>
                        <p>{task.cerinta}</p>
                        <p>{task.detalii}</p>
                      </div>
                      {task.preluat && task.stare === "terminat" ? (
                        <>
                          <div className="rez">
                            <h2>
                              rezolvare de <span> {task.de}</span>
                            </h2>
                            {task.rezolvare.explicatie && (
                              <p>{task.rezolvare.explicatie}</p>
                            )}
                            <div className="buttons">
                              {typeof task.rezolvare.file === "string"  && (
                                <a href={task.rezolvare.file}>
                                  Download rezolvare
                                </a>
                              )}
                              <button onClick={() => decide(task.id, true)}>
                                aprobat
                              </button>
                              <button onClick={() => setP(true)}>
                                refuzat
                              </button>
                              {p && (
                                <>
                                  <textarea
                                    type="text"
                                    onChange={(e) =>
                                      setObservatie(e.target.value)
                                    }
                                    placeholder="Observatii"
                                  ></textarea>
                                  <button
                                    onClick={() => decide(task.id, false)}
                                  >
                                    Send
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <h2 style={{ margin: "10px 0" }}>
                          Inca nu e terminat acest task
                        </h2>
                      )}
                      <button
                        onClick={() => delete_task(task.id)}
                        className="delete"
                      >
                        Sterge task
                      </button>
                    </div>
                    <hr />
                  </>
                );
              })}
          </>
        ) : (
          <>
            {myTasks &&
              myTasks.map((task) => {
                return (
                  <>
                    <div className="taskk">
                      <h2>
                        task dat de <span>{task.user}</span>
                      </h2>
                      <p>{task.cerinta}</p>
                      {task.stare === "in lucru" ? (
                        <div className="rezz">
                          <h2>rezolvare</h2>
                          {task.observatii !== "" && (
                            <div className="obs">
                              <h3>*{task.observatii}</h3>
                            </div>
                          )}
                          <div className="inputs">
                            <textarea
                              cols="30"
                              rows="10"
                              placeholder="Descrie rezolvarea ta"
                              onChange={(e) =>
                                updateRezolvare("explicatie", e.target.value)
                              }
                            ></textarea>
                            <input
                              type="file"
                              onChange={(e) =>
                                updateRezolvare("file", e.target.files[0])
                              }
                            />
                          </div>
                          <button
                            className="button"
                            onClick={() => setrezolvare(task.id)}
                          >
                            submit
                          </button>

                          <button
                            className="delete"
                            onClick={() => refuza(task.id)}
                          >
                            refuza task
                          </button>
                        </div>
                      ) : task.stare === "neinceput" ? (
                        <>
                          <button
                            className="button"
                            onClick={() => incepe_task(task.id)}
                          >
                            Incepe task
                          </button>

                          <button
                            className="button"
                            onClick={() => refuza(task.id)}
                          >
                            refuza task
                          </button>
                        </>
                      ) : task.stare === "terminat" && !task.aprobat ? (
                        <>
                          <h3>Asteapta decizia lui {task.user}</h3>
                        </>
                      ) : (
                        task.stare === "terminat" &&
                        task.aprobat && (
                          <>
                            <h3>
                              Task aprobat de <span>{task.user}</span>
                            </h3>
                          </>
                        )
                      )}
                    </div>
                  </>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

export default Crm;
