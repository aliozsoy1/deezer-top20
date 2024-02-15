import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // CSS dosyasını import ediyoruz

const MusicList = () => {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        // İlk 10 şarkıyı alıyoruz
        const response1 = await axios.get('https://api.deezer.com/chart?limit=10');
        const data1 = response1.data.tracks.data;
        document.title = "Deezer En İyi 20 Şarkı";
        // Sonraki 10 şarkıyı alıyoruz
        const response2 = await axios.get('https://api.deezer.com/chart?limit=10&index=10');
        const data2 = response2.data.tracks.data;

        // İki yanıtı birleştiriyoruz
        const combinedData = [...data1, ...data2];
        setMusicData(combinedData);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  const getSongPageUrl = async (songId) => {
    try {
      const response = await axios.get(`https://api.deezer.com/track/${songId}`);
      const songData = response.data;
      if (songData.link) {
        window.open(songData.link, '_blank');
      } else {
        console.error('Song URL not found in API response');
      }
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  };

  return (
    <div className="music-list"> {/* music-list sınıfı burada */}
      <h1 className='top-baslik'>En İyi 20 Şarkı</h1>
      <ul className="music-items"> {/* music-items sınıfı burada */}
        {musicData.map((track) => (
          <li key={track.id} className="music-item"> {/* music-item sınıfı burada */}
            <img src={track.album.cover_medium} alt={track.title} />
            <div>
              <h3>{track.title}</h3>
              <p>{track.artist.name}</p>
              <button className='dinle-button' onClick={() => getSongPageUrl(track.id)} style={{ cursor: 'pointer' }}>Dinle</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;