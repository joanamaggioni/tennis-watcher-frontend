import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingOverlay from '../../Loading/LoadingOverlay';
import './LiveMatches.css';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [odds, setOdds] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = '813f002a9052378d0b67f82ab7dd5c0584910df4d9eaccb2360ab156f588ede7';

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        const [liveRes, oddsRes] = await Promise.all([
          axios.get('https://api.api-tennis.com/tennis/', {
            params: {
              method: 'get_livescore',
              APIkey: API_KEY,
            },
          }),
          axios.get('https://api.api-tennis.com/tennis/', {
            params: {
              method: 'get_live_odds',
              APIkey: API_KEY,
            },
          }),
        ]);

        if (liveRes.data.result) setMatches(liveRes.data.result);
        if (oddsRes.data.result) setOdds(oddsRes.data.result);
      } catch (error) {
        console.error('Erro ao buscar dados ao vivo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderOdds = (eventKey) => {
    const eventOdds = odds[eventKey];
    if (!eventOdds || !eventOdds.live_odds) return <p style={{ fontSize: '0.8rem' }}>Sem odds disponíveis</p>;

    return (
      <ul style={{ fontSize: '0.85rem', marginTop: 6 }}>
        {eventOdds.live_odds.map((odd, i) => (
          <li key={i}>
            <strong>{odd.odd_name}</strong>: {odd.value} {odd.suspended === 'Yes' && '(Suspenso)'}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard">
      <div className="content">
        <h1>🎾 Partidas Ao Vivo</h1>
        {loading ? (
          <LoadingOverlay/>
        ) : (
          <div className="players-grid">
            {matches.length === 0 ? (
              <p>Nenhuma partida ao vivo no momento.</p>
            ) : (
              matches.map((match) => (
                <div className="player-card" key={match.event_key}>
                  <h4>{match.event_first_player} vs {match.event_second_player}</h4>
                  <p><strong>Status:</strong> {match.event_status}</p>
                  <p><strong>Pontuação:</strong> {match.event_game_result}</p>
                  <p><strong>Torneio:</strong> {match.tournament_name}</p>
                  <p><strong>Serve:</strong> {match.event_serve || 'N/A'}</p>
                  <div><strong>Odds:</strong> {renderOdds(match.event_key)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatches;
