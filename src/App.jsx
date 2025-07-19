import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

import React, { useState, useEffect } from "react";
import { getPets, addPet, updatePet, deletePet } from "./components/dynamo.js";

export default function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    status: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");

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
    const pet = {
      id: editingId || Date.now().toString(),
      ...form,
    };
    try {
      if (editingId) {
        console.log(editingId, form)
        await updatePet(editingId, form);
      } else {
        await addPet(pet);
      }
      setForm({ name: "", species: "", status: "", imageUrl: "" });
      setEditingId(null);
      fetchPets();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (pet) => {
    setForm({
      name: pet.name,
      species: pet.species,
      status: pet.status,
      imageUrl: pet.imageUrl,
    });
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
  console.log(pets)
  const filteredPets = pets.filter((pet) =>
    filter === "All" ? true : pet.isAdopted.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        🐾 Pet Adoption Center
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded shadow mb-6 grid gap-4 md:grid-cols-2"
      >
        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Species"
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          required
        />
        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Status (available, adopted)"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded col-span-2"
        >
          {editingId ? "Update" : "Add"} Pet
        </button>
      </form>

      <div className="mb-4">
        <span className="mr-2">Filter:</span>
        {["All", "Available", "Adopted"].map((status) => (
          <button
            key={status}
            className={`mx-1 px-3 py-1 rounded ${
              filter === status
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
          >
            {pet.image && (
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-1">{pet.name}</h2>
              <p className="text-gray-300 text-sm mb-1">
                <span className="font-medium">Species:</span> {pet.species}
              </p>
              <p className="text-gray-300 text-sm mb-4">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    pet.status === "available"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {pet.status}
                </span>
              </p>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(pet)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-sm px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
                  className="bg-red-500 hover:bg-red-600 text-sm px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
