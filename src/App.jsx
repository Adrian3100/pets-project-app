import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

import React, { useEffect, useState } from "react";

import { getPets, addPet, updatePet, deletePet } from "./components/dynamo";

function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: "", species: "", status: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await getPets();
      setPets(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pet = {
        id: editingId || Date.now().toString(),
        ...form,
      };

      if (editingId) {
        await updatePet(editingId, form);
      } else {
        await addPet(pet);
      }

      setForm({ name: "", species: "", status: "" });
      setEditingId(null);
      fetchPets();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (pet) => {
    setForm({ name: pet.name, species: pet.species, status: pet.status });
    setEditingId(pet.id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      fetchPets();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <p style={{ color: "green" }}>Pets , Pets , Pets !!</p>
      <h1 className="text-4xl font-bold text-green-500"> Pet Adoption Center</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Species"
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          required
        />
        <input
          placeholder="Status (available, adopted)"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Pet</button>
      </form>

      <ul>
        {pets.map((pet) => (
          <li key={pet.id} style={{ marginBottom: 10 }}>
            <strong>{pet.name}</strong> ({pet.species}) - {pet.status}
            <button onClick={() => handleEdit(pet)} style={{ marginLeft: 10 }}>
               Edit
            </button>
            <button
              onClick={() => handleDelete(pet.id)}
              style={{ marginLeft: 5 }}
            >
               Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
