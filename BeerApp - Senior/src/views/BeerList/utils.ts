import { getBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { BEER_LIST_KEY } from '../../utils';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const response = await getBeerList();
      setData(response.data);
    } catch (error) {
      handle(error);
      setData(JSON.parse((await localStorage.getItem(BEER_LIST_KEY)) || '{}'));
    }
  })();
};

export { fetchData };
