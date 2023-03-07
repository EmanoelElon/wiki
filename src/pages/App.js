import { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import ItemRepo from "../Components/ItemRepo";
import { api } from "../Components/services/api";
import { Container } from "./styles";


function App() {
  const[repos, setRepos] = useState([]);
  const[currentRepo, setCurrentRepo] = useState('');

  const handleSearchRepo = async () =>{
    const {data} = await api.get(`repos/${currentRepo}`);

    const isExist = repos.find(repo => repo.id === data.id)

    if (!isExist) {
      if(data.id){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
      }
    }
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter((repo) => repo.id !== id));
  }

  return (
    <Container>
      <img src="https://imgs.search.brave.com/-GVQudGbr5xpojDp8UADaRU6rbXUj3VFsVtFLNXY-y8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/c2hhcmVpY29uLm5l/dC9kYXRhLzIwMTYv/MDYvMjAvNjA2OTY0/X2dpdGh1Yl80MDk2/eDQwOTYucG5n" width={64} height={64} alt="GitHub Logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
