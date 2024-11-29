"use client";

import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AdminProdutos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null, // Para armazenar o arquivo da imagem
  });
  const [preview, setPreview] = useState<string | null>(null); // Para pré-visualização
  const [products, setProducts] = useState([]); // Lista de produtos

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await api.get("/items");
      console.log("Produtos recebidos:", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };
  const backendUrl = "http://localhost:4500/";

  useEffect(() => {
    fetchProducts(); // Busca os produtos ao carregar o componente
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", price: "", description: "", image: null });
    setPreview(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file)); // Atualiza a pré-visualização
    }
  };

  const handleSave = async () => {
    try {
      let imagePath = null;

      // Upload da imagem
      if (formData.image) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", formData.image);

        const uploadResponse = await api.post("/items/upload", uploadFormData);

        console.log("Dados do upload", uploadResponse);

        imagePath = uploadResponse.data.path; // Caminho da imagem retornado pelo backend
      }

      // Cadastro do item
      const itemData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: imagePath,
      };

      await api.post("/items", itemData);
      alert("Produto cadastrado com sucesso!");
      closeModal();
      fetchProducts(); // Atualiza a lista de produtos após cadastro
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={openModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          + Novo Produto
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-primary font-bold mt-2">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1">
                  Nome do Produto
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
                  htmlFor="description"
                  className="block text-sm font-bold mb-1"
                >
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-bold mb-1">
                  Imagem do Produto
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded px-3 py-2"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Pré-visualização"
                    className="mt-4 w-full h-auto rounded"
                  />
                )}
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

export default AdminProdutos;
