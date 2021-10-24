import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getApi() {
      try {
        const { data } = await api.get("repositories");
        setRepositories(data);
      } catch (error) {
        console.log(error);
      }
    }
    getApi();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: "Desafio Node.js",
      url: "https://github.com/lsferreira934/conceitos-nodejs",
      techs: ["Node.js", "..."],
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository=> repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
