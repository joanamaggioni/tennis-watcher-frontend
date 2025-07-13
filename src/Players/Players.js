import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile from '../assets/profile.png';
import LoadingOverlay from '../Loading/LoadingOverlay';
import './Players.css';

const generateRandomPlayerIds = (count = 15, min = 1000, max = 2500) => {
  const ids = new Set();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }
  return Array.from(ids);
};

const formatDateBR = (dateStr) => {
  if (!dateStr) return '';

  const separator = dateStr.includes('-') ? '-' :
                    dateStr.includes('.') ? '.' :
                    null;

  if (!separator) return dateStr; 

  const parts = dateStr.split(separator);

  if (separator === '.' && parts.length === 3) {
    const [day, month, year] = parts;
    return `${day}/${month}/${year}`;
  }

  if (separator === '-' && parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  return dateStr;
};

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const API_KEY = '813f002a9052378d0b67f82ab7dd5c0584910df4d9eaccb2360ab156f588ede7';

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerIds = generateRandomPlayerIds();
      console.log('IDs gerados:', playerIds);
      setLoading(true);
      try {
        const requests = playerIds.map(id =>
          axios.get(`https://api.api-tennis.com/tennis/`, {
            params: {
              method: 'get_players',
              player_key: id,
              APIkey: API_KEY,
            },
          })
        );

        const responses = await Promise.all(requests);
        const jogadores = responses
          .map(res => res.data.result)
          .flat()
          .filter(Boolean);

        setPlayers(jogadores);
      } catch (err) {
        console.error('Erro ao buscar jogadores', err);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = selectedCountry
    ? players.filter(p =>
        p.player_country?.toLowerCase().includes(selectedCountry.toLowerCase())
      )
    : players;

  if (loading) {
    return (
      <LoadingOverlay/>
    );
  }

  return (
    <div className="players-container">
      <h2>🎾 Jogadores</h2>

     <div className="country-filter">
        <label htmlFor="countrySearch">Filtrar por país:</label>
        <input
          id="countrySearch"
          type="text"
          placeholder="Ex: france, spain..."
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        />
      </div>

      {filteredPlayers.length === 0 ? (
        <p>Nenhum jogador encontrado.</p>
      ) : (
        <div className="players-grid">
          {filteredPlayers.map(player => (
            <div key={player.player_key} className="player-card">
              <img
                src={
                  player.player_logo && player.player_logo.trim() !== ''
                    ? player.player_logo
                    : profile
                }
                alt={player.player_name}
                className="player-img"
              />
              <h4>{player.player_name}</h4>
              <p><strong>País:</strong> {player.player_country}</p>
              <p><strong>Nascimento:</strong> {formatDateBR(player.player_bday)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
