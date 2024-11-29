"use client";

import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AdminPedidos = () => {
  const [orders, setOrders] = useState([]); // Lista de pedidos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    items: "",
    total: "",
  });

  // Função para buscar pedidos
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      console.log("Pedidos recebidos:", response);
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Busca os pedidos ao carregar o componente
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ email: "", items: "", total: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Buscar o ID do usuário pelo email
      const userResponse = await api.get(`/users?email=${formData.email}`);
      console.log(userResponse)
      if (!userResponse.data || userResponse.data.length === 0) {
        alert("Usuário não encontrado!");
        return;
      }
      const userId = userResponse.data.id; // Pega o primeiro usuário encontrado com o email
      const newOrder = {
        userId, // Usa o ID do usuário buscado pelo email
        items: formData.items,
        total: parseFloat(formData.total),
      };

      await api.post("/orders", newOrder);
      alert("Pedido criado com sucesso!");
      closeModal();
      fetchOrders(); // Atualiza a lista de pedidos
    } catch (error) {
      console.error(error);
      alert("Erro ao criar pedido");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <button
          onClick={openModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          + Novo Pedido
        </button>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-6">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded overflow-hidden p-4"
          >
            <h2 className="text-lg font-bold">Pedido #{order.id}</h2>
            <p className="text-gray-600">Usuário: {order.user?.email || "N/A"}</p>
            <p className="text-gray-600">Itens: {order.items}</p>
            <p className="text-primary font-bold mt-2">
              Total: R$ {order.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Modal de criação de pedido */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Criar Pedido</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1">
                  Email do Usuário
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="items" className="block text-sm font-bold mb-1">
                  Itens
                </label>
                <textarea
                  id="items"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label htmlFor="total" className="block text-sm font-bold mb-1">
                  Total
                </label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  value={formData.total}
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

export default AdminPedidos;
