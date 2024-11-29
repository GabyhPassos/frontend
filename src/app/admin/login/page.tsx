"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      const token = response.data.token;

      const userResponse = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.data.isAdmin) {
        alert("Login de admin realizado com sucesso!");
        localStorage.setItem("token", token);
        router.push("/admin/produtos");
      } else {
        alert("Você não tem permissão para acessar esta área.");
      }
    } catch (error: any) {
      alert(
        "Erro ao fazer login: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/admin/cadastrar-usuario");
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold mb-4">Login de Administrador</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-primary rounded p-2"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-primary rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          Entrar
        </button>
      </form>
      <button
        onClick={handleRegisterRedirect}
        className="w-full bg-secondary text-white py-2 rounded mt-4 hover:bg-primary"
      >
        Cadastrar Usuário
      </button>
    </div>
  );
};

export default AdminLogin;
