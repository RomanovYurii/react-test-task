import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import {
  Avatar,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import _orderBy from 'lodash/orderBy';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredAndSortedBeerList, setFilteredAndSortedBeerList] =
    useState<Array<Beer>>(beerList);
  const [filterValue, setFilterValue] = useState('');
  const [sortOptions, setSortOptions] = useState<{
    sortBy: string;
    order: 'asc' | 'desc';
  }>({
    sortBy: 'name',
    order: 'asc',
  });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  // eslint-disable-next-line
  useEffect(
    fetchData.bind(this, (_beerList: Beer[]) => {
      setBeerList(_beerList);
      setPagination((prev) => ({ ...prev, count: _beerList.length }));
      setFilteredAndSortedBeerList(
        _beerList.slice(
          pagination.page * pagination.rowsPerPage,
          pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
        )
      );
    }),
    []
  );

  useEffect(() => {
    setFilteredAndSortedBeerList(
      _orderBy(
        beerList.filter((beer) =>
          beer.name.toLowerCase().includes(filterValue.toLowerCase())
        ),
        sortOptions.sortBy,
        sortOptions.order
      )
    );
  }, [filterValue, sortOptions, pagination]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
    }));
  }, [filterValue]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <div>
          <TextField
            id="beers-filter"
            label="Serach by name"
            variant="standard"
            value={filterValue}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Search..."
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <FormControl sx={{ width: 100, mx: 3 }}>
            <InputLabel variant="standard" id="sort-by-select-label">
              Sort by
            </InputLabel>
            <Select
              variant="standard"
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={sortOptions.sortBy}
              label="Sort by"
              onChange={(e) =>
                setSortOptions((prev) => ({ ...prev, sortBy: e.target.value }))
              }
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'brewery_type'}>Type</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 100 }}>
            <InputLabel variant="standard" id="sort-by-select-label">
              Sort order
            </InputLabel>
            <Select
              variant="standard"
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={sortOptions.order}
              label="Sort by"
              onChange={(e) =>
                setSortOptions((prev) => ({
                  ...prev,
                  order: e.target.value as 'asc' | 'desc',
                }))
              }
            >
              <MenuItem value={'asc' as 'asc'}>Asc</MenuItem>
              <MenuItem value={'desc' as 'desc'}>Desc</MenuItem>
            </Select>
          </FormControl>
        </div>
        <main>
          <List>
            {filteredAndSortedBeerList
              .slice(
                pagination.page * pagination.rowsPerPage,
                pagination.page * pagination.rowsPerPage +
                  pagination.rowsPerPage
              )
              .map((beer) => (
                <ListItemButton
                  key={beer.id}
                  onClick={onBeerClick.bind(this, beer.id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={beer.name}
                    secondary={beer.brewery_type}
                  />
                </ListItemButton>
              ))}
          </List>
          <TablePagination
            component="div"
            count={filteredAndSortedBeerList.length}
            page={pagination.page}
            onPageChange={(_, page) =>
              setPagination((prev) => ({
                ...prev,
                page,
              }))
            }
            rowsPerPage={pagination.rowsPerPage}
            onRowsPerPageChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                rowsPerPage: +e.target.value,
              }))
            }
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
