import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TMDB_Access_Key } from '../../config';

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [videoKey, setVideoKey] = useState('');
  const [videoInfo, setVideoInfo] = useState({});

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_Access_Key}`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        const trailer = data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setVideoKey(trailer.key);
          setVideoInfo(trailer);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />

      {videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}

      <div className="player-info">
        <p>{videoInfo.published_at?.slice(0, 10)}</p>
        <p>{location?.state?.title || 'Movie'}</p>
        <p>{videoInfo.type}</p>
      </div>
    </div>
  );
};

export default Player;
