"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter(); // Para redirecionar o usuário

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", formData); // Chama o endpoint de registro
      alert("Usuário cadastrado com sucesso!");
      router.push("/admin/login"); // Redireciona para a página de login
    } catch (error: any) {
      alert(
        "Erro ao cadastrar usuário: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Usuário</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-2 border-primary rounded p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-2 border-primary rounded p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="w-full border-2 border-primary rounded p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
