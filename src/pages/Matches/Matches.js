import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import LoadingOverlay from '../../Loading/LoadingOverlay';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import './Matches.css';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('asc');

  const API_KEY = '813f002a9052378d0b67f82ab7dd5c0584910df4d9eaccb2360ab156f588ede7';

  const formatDateBR = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const sortMatches = (matchesArray, order) => {
    return [...matchesArray].sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      if (order === 'asc') return dateA - dateB;
      else return dateB - dateA;
    });
  };

  const fetchMatches = async () => {
    if (!dateStart || !dateEnd) {
      alertify.error('Por favor, preencha ambas as datas para buscar partidas.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://api.api-tennis.com/tennis/`, {
        params: {
          method: 'get_fixtures',
          APIkey: API_KEY,
          date_start: dateStart,
          date_stop: dateEnd,
        },
      });

      if (response.data.success === 1 && Array.isArray(response.data.result)) {
        const sortedMatches = sortMatches(response.data.result, order);
        setMatches(sortedMatches);
      } else {
        alertify.warning('Nenhuma partida encontrada para esse período.');
        setMatches([]);
      }
    } catch (err) {
      alertify.error('Erro ao buscar partidas. Tente novamente mais tarde.');
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMatches((prev) => sortMatches(prev, order));
  }, [order]);

  return (
    <div className="content">
      <h1>📅 Partidas</h1>

      <div className="filters">
        <label htmlFor="dateStart">
          Início:
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </label>

        <label htmlFor="dateEnd">
          Fim:
          <input
            type="date"
            id="dateEnd"
            name="dateEnd"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </label>

        <button onClick={fetchMatches}>🔍 Buscar</button>

        <div className="order-container">
          <label htmlFor="orderSelect">
            <span>Ordenar por data:</span>
          </label>
          <select
            id="orderSelect"
            name="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="styled-select"
          >
            <option value="asc">Mais antigas primeiro</option>
            <option value="desc">Mais recentes primeiro</option>
          </select>
        </div>
      </div>

      <div className="matches-list">
        {loading ? (
          <LoadingOverlay />
        ) : matches.length === 0 ? (
          <p>Nenhuma partida encontrada nesse período.</p>
        ) : (
          <div className="matches-grid">
            {matches.map((match) => (
              <div className="match-card" key={match.event_key}>
                <p className="players">
                  🎾 <strong>{match.event_first_player}</strong> vs <strong>{match.event_second_player}</strong>
                </p>
                <p>📍 {match.tournament_name}</p>
                <p>
                  📆 {formatDateBR(match.event_date)} 🕐 {match.event_time}
                </p>
                <p>Status: {match.event_status || 'Pendente'}</p>
                <p>Resultado: {match.event_final_result || '-'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
