import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)

    })
    .then((res) => res.json())
    .then((data) => {
      const newUser = [...user, data]
      setUsers(newUser);
      form.reset()
    });
    
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <h1 className="text-center text-2xl font-semibold">
        user management system
      </h1>

      <div className="text-center my-3 ">
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="border px-4 py-1 mb-2"
          />{" "}
          <br />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="border px-4 py-1"
          />{" "}
          <br />
          <input
            type="submit"
            value="add user"
            className="border px-4 py-1 bg-fuchsia-600 text-amber-50 rounded-sm my-3"
          />
        </form>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.id} className="border-2 p-5">
            <h6>ID: {user.id}</h6>
            <h4>Name: {user.name}</h4>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
