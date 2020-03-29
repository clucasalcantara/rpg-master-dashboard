import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Card, Avatar, Collapse } from "antd";
import MusicSelector from "../Component/MusicSelector";
import campainList from "../mock/campainList";
import playersList from "../mock/playersList";
import sessionsList from "../mock/sessionList";
import AddPlayerForm from "../Templates/AddPlayerForm";

const { Panel } = Collapse;

const PlayerItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 width: 100%;
 padding: 1rem;
`;

const PlayerInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
`;
const PlayerInfoTitle = styled.span`
 font-weight: bold;
`;

const CampainSection = styled.section`
 margin: 1rem 0;
 padding: 1rem 0;
 border-bottom: 1px solid #c7c7c7;
`;

const SessionItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 font-size: 14px;
 padding: 1rem 0.5rem;
`;

const EditButton = styled.button`
 border: 1px solid #767676;
 border-radius: 8px;
 background-color: #373737;
 color: white;
 font-weight: 400;
 cursor: pointer;
`;
const DeleteButton = styled.button`
 border: none;
 border-radius: 8px;
 background-color: #b21f66;
 color: white;
 font-weight: 400;
 cursor: pointer;
 margin-left: 1rem;
`;

const AvatarWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const SessionsListItem = ({ title, onClick, onDelete }) => (
 <SessionItem>
  <span>{title}</span>
  <div>
   <EditButton onClick={onClick}>Editar</EditButton>
   <DeleteButton onClick={onDelete}>Apagar</DeleteButton>
  </div>
 </SessionItem>
);

const PlayersListItem = ({
 name,
 character,
 avatar,
 classType,
 raceType,
 level,
}) => (
 <PlayerItem>
  <AvatarWrapper>
   <Avatar src={avatar} size="large" style={{ marginRight: "1rem" }} />
   <PlayerInfo>
    <PlayerInfoTitle>Personagem:</PlayerInfoTitle>
    <span>{character}</span>
   </PlayerInfo>
  </AvatarWrapper>
  <PlayerInfo>
   <PlayerInfoTitle>Jogador:</PlayerInfoTitle>
   <span>{name}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Raça:</PlayerInfoTitle>
   <span>{raceType}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Classe:</PlayerInfoTitle>
   <span>{classType}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Nível:</PlayerInfoTitle>
   <span>{level}</span>
  </PlayerInfo>
 </PlayerItem>
);

const EditCampain = () => {
 const [campain, setCampain] = useState("");
 const [players, setPlayers] = useState(playersList);
 const [addPlayerFormVisible, setPlayerFormVisible] = useState(false);
 const { id } = useParams();
 const history = useHistory();

 useEffect(() => {
  const filteredCampain = campainList.filter(
   (session) => session.url === `/campains/${id}`
  );
  setCampain(filteredCampain[0]);
 }, [id]);

 const OpenAddPlayerForm = () => {
  setPlayerFormVisible(true);
 };

 const AddPlayer = ({
  avatar,
  name,
  character,
  classType,
  raceType,
  level,
  email,
 }) => {
  const newPlayer = {
   id,
   avatar,
   name,
   character,
   classType,
   raceType,
   level,
   email,
  };

  const newPlayers = [...players, newPlayer];
  setPlayers(newPlayers);
  setPlayerFormVisible(false);
 };

 const DeletePlayer = (id) => {
  const filteredPlayers = players.filter((player) => player.id !== id);
  setPlayers(filteredPlayers);
  setPlayerFormVisible(false);
 };

 const { title, system } = campain || {
  title: "Não existe",
  system: "Não tem",
 };
 return (
  <Card title={title} bordered={false} style={{ width: "100%" }}>
   <CampainSection>
    <h1>SISTEMA</h1>
    <span>{system}</span>
   </CampainSection>
   <CampainSection>
    <h1>
     <span>JOGADORES</span>
     <DeleteButton onClick={OpenAddPlayerForm}>Adicinar</DeleteButton>
     <AddPlayerForm
      visible={addPlayerFormVisible}
      onClose={() => setPlayerFormVisible(false)}
      onSubmit={AddPlayer}
      onDelete={DeletePlayer}
     />
    </h1>
    {players.map(
     ({ avatar, name, character, classType, raceType, level }, index) => (
      <PlayersListItem
       key={index}
       avatar={avatar}
       name={name}
       character={character}
       classType={classType}
       raceType={raceType}
       level={level}
      />
     )
    )}
   </CampainSection>
   <CampainSection>
    <h1>
     <span>SESSÕES</span>
     <DeleteButton onClick={() => history.push("/sessions/newSession")}>
      Adicinar
     </DeleteButton>
    </h1>
    <Collapse accordion bordered={false}>
     {sessionsList.map(({ title, description, id }) => (
      <Panel key={id} header={title}>
       <SessionsListItem
        title={`${description} da sessão ${title}`}
        onClick={() => console.log("oi")}
        onDelete={() => console.log("oi")}
       />
      </Panel>
     ))}
    </Collapse>
   </CampainSection>
   <CampainSection>
    <h1>Música</h1>
    <MusicSelector onMusicAdded={(c) => console.log(c)} />
   </CampainSection>
  </Card>
 );
};

export default EditCampain;