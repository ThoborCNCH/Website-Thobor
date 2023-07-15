import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";

const firestore = new Firestore();

function Users({ userss, isAllowed }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    email: "",
    role: "",
  });
  useEffect(() => {
    setUsers((old) => (old = userss));
  }, [userss]);

  const update = (e, field) => {
    setUser((old) => ({ ...old, [field]: e }));
  };

  const add = async () => {
    if (user.email === "" || user.role === "")
      alert("Completeaza toate campurile");
    else
      await firestore.addItem("thobor_users", user).then((res) => {
        console.log(res);
        setUsers((old) => [res, ...old]);
      });
    console.log(users);
  };

  const delete_user = async (id) => {
    await firestore.deleteDocument("thobor_users", id).then((res) => {
      setUsers((old) => (old = old.filter((o) => o.id != id)));
    });
  };

  return isAllowed ? (
    <>
      <div className="adminpage">
        <div className="users_part">
          <div className="form">
            <h1>FOR USERS</h1>
            <h4>Scrie emailul persoanei din echipa</h4>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => update(e.target.value, "email")}
            />
            <h4>Alege departamentul</h4>
            <select onChange={(e) => update(e.target.value, "role")}>
              <option value="">Departamente</option>
              <option value="programare">Programare</option>
              <option value="mecanica">Mecanica</option>
              <option value="proiectare">Proiectare</option>
              <option value="caiet">Caiet</option>
              <option value="marketing">Marketing</option>
              <option value="admin">Admin</option>
              <option value="ldd">Lider de departament</option>
              <option value="alumni">Alumni</option>
              <option value="mentor">Mentor</option>
            </select>
            <button className="button" type="submit" onClick={add}>
              Submit
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <>
                    <tr>
                      <td>
                        <p>{user.email}</p>
                      </td>
                      <td>
                        <h4>{user.role}</h4>
                      </td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => delete_user(user.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <h1>Nu ai acces aici</h1>
  );
}

export default Users;
