import React, { useEffect, useMemo, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { SAVED_BEERS_KEY } from '../../utils';
import { Star, StarBorder } from '@mui/icons-material';
import { orange } from '@mui/material/colors';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [savedList, setSavedList] = useState<{ [key: string]: IBeer }>({});

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
  // ToDo: move to hook
  useEffect(() => {
    const initSavedList = async () => {
      const data = JSON.parse(
        (await localStorage.getItem(SAVED_BEERS_KEY)) || '{}'
      );
      setSavedList(data);
    };

    initSavedList();
  }, []);

  const isSaved = useMemo(
    () => beer && beer.id && Object.keys(savedList).includes(beer.id),
    [beer, savedList]
  );
  // ToDo: dedupe
  const handleSavedClick = (IBeer: boolean, beer?: IBeer) => {
    if (!beer) {
      return;
    }
    if (IBeer) {
      const newSavedList = { ...savedList, [beer.id]: beer };
      setSavedList({ ...newSavedList });
      localStorage.setItem(SAVED_BEERS_KEY, JSON.stringify(newSavedList));
    } else {
      const newSavedList = { ...savedList };
      delete newSavedList[beer.id];
      setSavedList({ ...newSavedList });
      localStorage.setItem(SAVED_BEERS_KEY, JSON.stringify(newSavedList));
    }
  };

  return (
    <article>
      <section>
        <header>
          <h1>Beer name: {beer?.name}</h1>
        </header>
        <main>
          <div
            onClick={() => handleSavedClick(!isSaved, beer)}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: orange[800],
              cursor: 'pointer',
            }}
          >
            {isSaved ? <Star /> : <StarBorder />}{' '}
            {isSaved ? 'Remove from saved' : 'Add to saved'}
          </div>
          <p>
            <b>Type: </b> {beer?.brewery_type}
          </p>
          <p>
            <b>Phone: </b>
            <a href={`tel:${beer?.phone}`}>{beer?.phone}</a>
          </p>
          <p>
            <b>Website: </b>
            <a href={`tel:${beer?.website_url}`}>{beer?.website_url}</a>
          </p>
          <p>
            <b>Address: </b> {beer?.street}, {beer?.city},{' '}
            {beer?.state_province}, {beer?.country}
          </p>
        </main>

        {beer && (
          <MapContainer
            center={[+beer.latitude, +beer.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: 600 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[+beer.latitude, +beer.longitude]} />
          </MapContainer>
        )}
      </section>
    </article>
  );
};

export default Beer;
