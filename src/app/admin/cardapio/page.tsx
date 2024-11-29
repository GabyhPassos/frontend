"use client";

import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AdminCardapio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [menuItems, setMenuItems] = useState([]); // Lista de itens do cardápio

  // Função para buscar os itens do cardápio
  const fetchMenuItems = async () => {
    try {
      const response = await api.get("/menu");
      console.log("Itens do cardápio recebidos:", response);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens do cardápio:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems(); // Busca os itens do cardápio ao carregar o componente
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", price: "", category: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const itemData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
      };

      await api.post("/menu", itemData);
      alert("Item do cardápio cadastrado com sucesso!");
      closeModal();
      fetchMenuItems(); // Atualiza a lista de itens após cadastro
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar item do cardápio");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cardápio</h1>
        <button
          onClick={openModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          + Novo Item
        </button>
      </div>

      {/* Lista de itens do cardápio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((menuItem: any) => (
          <div
            key={menuItem.id}
            className="bg-white shadow-md rounded overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold">{menuItem.name}</h2>
              <p className="text-gray-600">{menuItem.category}</p>
              <p className="text-primary font-bold mt-2">
                R$ {menuItem.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cadastrar Item do Cardápio</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1">
                  Nome do Item
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-bold mb-1">
                  Preço
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-bold mb-1"
                >
                  Categoria
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCardapio;
