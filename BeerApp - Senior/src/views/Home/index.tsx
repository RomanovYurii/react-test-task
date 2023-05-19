import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Link, Paper, TextField } from '@mui/material';
import styles from './Home.module.css';
import { SAVED_BEERS_KEY } from '../../utils';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<{ [key: string]: Beer }>({});

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  useEffect(() => {
    const initSavedList = async () => {
      const data = JSON.parse(
        (await localStorage.getItem(SAVED_BEERS_KEY)) || '{}'
      );
      setSavedList(data);
    };

    initSavedList();
  }, []);

  const handleListItemClick = (
    e: ChangeEvent<HTMLInputElement>,
    beer: Beer
  ) => {
    if (e.target.checked) {
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

  const removeAll = () => {
    localStorage.setItem(SAVED_BEERS_KEY, JSON.stringify({}));
    setSavedList({});
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined" />
                <Button variant="contained">Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={Object.keys(savedList).includes(beer.id)}
                      onChange={(e) => handleListItemClick(e, beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant="contained" size="small" onClick={removeAll}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {Object.values(savedList).map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={true}
                      onChange={(e) => handleListItemClick(e, beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!Object.values(savedList).length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
