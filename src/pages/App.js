import logo from "../assets/images/github-logo.png"
import { Container } from "./styles";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";
import Button from "../components/Button";
import { api } from "../services/api";

export default function App() {
    const [currentRepo, setCurrentRepo] = useState("Lul4t3ch/");
    const [repos, setRepos] = useState([]);

    const handleSearchRepo = async () => {
        const { data } = await api
            .get(`repos/${currentRepo}`)
            .catch((error) => {
                alert("O repositório não foi localizado!");
            });

        if (data.id) {
            const exists = repos.find((repo) => repo.id === data.id);
            if (!exists) {
                setRepos((prev) => [...prev, data]);
                setCurrentRepo("Lul4t3ch/");
                return;
            }
            alert("O repositório já foi adicionado!");
        }
    };

    const handleRemoveRepo = (id) => {
        setRepos(repos.filter((repo) => repo.id !== id));
    };

    return (
        <Container>
            <img src={logo} width={72} height={72} alt="github logo" />
            <Input
                value={currentRepo.trim()}
                onChange={(event) => setCurrentRepo(event.target.value)}
            />
            <Button onClick={handleSearchRepo} />
            {repos.map((repo) => (
                <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />
            ))}
        </Container>
    );
}