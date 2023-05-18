import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <header>
          <h1>Beer name: {beer?.name}</h1>
        </header>
        <main>
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
