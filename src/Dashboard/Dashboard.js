import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import LoadingOverlay from '../Loading/LoadingOverlay';
import './Dashboard.css';

const Dashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = '813f002a9052378d0b67f82ab7dd5c0584910df4d9eaccb2360ab156f588ede7'; 

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get('https://api.api-tennis.com/tennis/', {
          params: {
            method: 'get_tournaments',
            APIkey: API_KEY,
          },
        });

        if (res.data.success === 1) {
          setTournaments(res.data.result);
        } else {
          setTournaments([]);
        }
      } catch (err) {
        console.error('Erro ao buscar torneios:', err);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const tournamentCountByType = tournaments.reduce((acc, curr) => {
    const type = curr.event_type_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(tournamentCountByType).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard de Torneios</h1>

      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <p>Total de torneios: <strong>{tournaments.length}</strong></p>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-25} textAnchor="end" interval={0} height={100} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#392620" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
