import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";

const firestore = new Firestore();

function Users({ userss }) {
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
  return (
    <>
      <div className="adminpage">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => update(e.target.value, "email")}
        />
        <input
          type="text"
          placeholder="Rol"
          onChange={(e) => update(e.target.value, "role")}
        />
        <button onClick={add}>Submit</button>
        <br />
        <br />
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
              users .map((user) => {
                return (
                  <>
                    <tr>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
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
  );
}

export default Users;
