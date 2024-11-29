"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "./services/api";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login realizado com sucesso!");
      router.push("/member/home"); // Redireciona para a home do membro
    } catch (error: any) {
      alert(
        "Erro ao fazer login: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold mb-4">Login de Membro</h1>
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
        onClick={() => router.push("/admin/login")}
        className="w-full mt-4 bg-secondary text-white py-2 rounded hover:bg-primary"
      >
        Área do Administrador
      </button>
    </div>
  );
};

export default Home;
