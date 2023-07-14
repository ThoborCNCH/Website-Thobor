import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import Text from "../../utils/Text";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Placeholder from "../../utils/Placeholder";

const firestore = new Firestore();

function Crm({ taskss }) {
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
    preluat: false,
    createdAt: Timestamp.now(),
  });
  const [isAllowed, setIsAllowed] = useState(false);
  const [tasks_general, setTasksGeneral] = useState(taskss);

  const addNewTask = async () => {
    await firestore.addItem("tasks", newTask).then((res) => {
      setTasksGeneral((old) => [...old, res]);
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
              setMyTasks(res);
            });
        } else {
          setIsAllowed(true);
          await firestore
            .readDocuments("tasks", ["user", "==", user.email])
            .then((res) => {
              setMyTasks(res);
            });
        }
      });
  };

  useEffect(() => {
    getMy();
  }, []);
  useEffect(() => {
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
        setMyTasks((old) => [...old, task]);
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
    const storage = getStorage();
    let obj = { ...rezolvare };
    const storageRef = ref(storage, `crm/${rezolvare.file.name}`);
    try {
      await uploadBytes(storageRef, rezolvare.file);
      const url = await getDownloadURL(storageRef);
      obj["file"] = url;
    } catch (error) {}
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
        alert("rezolvare trimisa");
      });
  };

  const decide = async (id, decizie) => {
    let stare = "in lucru";
    if (decizie) stare = "terminat";
    await firestore
      .updateDocument("tasks", id, { aprobat: decizie, stare: stare })
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
      {isAllowed && (
        <div className="crm_part">
          <div className="form">
            <input
              type="text"
              onChange={(e) => updatenewTask("cerinta", e.target.value)}
            />
            <textarea
              cols="30"
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
                      <h4>preluat: {task.preluat ? task.de : "false"}</h4>
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
                      <p>{task.cerinta}</p>{" "}
                      <h4>preluat: {task.preluat ? task.de : "false"}</h4>
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
                      <td>{Text.returnSizedText(task.cerinta)}</td>
                      <td>{task.de}</td>
                      <td>{task.stare}</td>
                      <td>{JSON.stringify(task.aprobat)}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
      {!isAllowed && (
        <div className="rezolvare">
          <div className="tasks">
            {myTasks &&
              myTasks.map((task) => {
                return (
                  <>
                    <div className="task">
                      <h2>
                        task dat de <span>{task.user}</span>
                      </h2>
                      <p>{task.cerinta}</p>
                      {task.stare === "in lucru" ? (
                        <div className="rezz">
                          <h2>rezolvare</h2>
                          <textarea
                            cols="30"
                            rows="10"
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
                          <button
                            className="button"
                            onClick={() => setrezolvare(task.id)}
                          >
                            submit
                          </button>

                          <button
                            className="button"
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
                      ) : (
                        <>
                          <h1>Asteapta decizia lui {task.user}</h1>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      )}

      {isAllowed && (
        <div className="rezolvare">
          <div className="tasks">
            {myTasks &&
              myTasks.map((task) => {
                let date = task.createdAt.toDate();
                return (
                  <>
                    <div className="task">
                      <div className="info">
                        <h2>
                          task dat pe{" "}
                          <span>
                            {date.getDay()}.{date.getMonth()}.{date.getYear()}
                          </span>
                        </h2>
                        <p>{task.cerinta}</p>
                      </div>
                      {task.preluat && (
                        <div className="rez">
                          <h2>rezolvare de {task.de}</h2>
                          <p>{task.rezolvare.explicatie}</p>
                          <a href={task.rezolvare.file}>Download</a>
                          <button onClick={() => decide(task.id, true)}>
                            aprobat
                          </button>
                          <button onClick={() => decide(task.id, false)}>
                            refuzat
                          </button>
                        </div>
                      )}
                      <button onClick={() => delete_task(task.id)}>
                        Sterge task
                      </button>
                    </div>
                    <hr />
                  </>
                );
              })}
          </div>
        </div>
      )}
      {/* <div className="crm_part">
            <div className="form">

            </div>
        </div> */}
    </div>
  );
}

export default Crm;
