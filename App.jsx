import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch(`${API}/rooms`);
    const data = await res.json();
    setRooms(data);
  };

  const addRoom = async () => {
    if (!roomNumber || !type || !price) {
      alert("Please fill all fields");
      return;
    }

    await fetch(`${API}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumber,
        type,
        price,
        status,
      }),
    });

    setRoomNumber("");
    setType("");
    setPrice("");
    setStatus("Available");

    fetchRooms();
  };

  const deleteRoom = async (id) => {
    await fetch(`${API}/rooms/${id}`, {
      method: "DELETE",
    });

    fetchRooms();
  };

  return (
    <div className="container">
      <h1>🏨 Hotel Manager System</h1>

      <h2>Add Room</h2>

      <input
        type="text"
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Room Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Available</option>
        <option>Occupied</option>
      </select>

      <br />
      <br />

      <button onClick={addRoom}>Add Room</button>

      <h2>Room List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomNumber}</td>
              <td>{room.type}</td>
              <td>₹{room.price}</td>
              <td>{room.status}</td>
              <td>
                <button onClick={() => deleteRoom(room.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;