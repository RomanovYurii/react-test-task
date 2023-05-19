import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';
import { BEER_LIST_KEY } from '../../utils';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      handle(error);
      setData(
        JSON.parse((await localStorage.getItem(BEER_LIST_KEY)) || '[]').find(
          (beer: Beer) => beer.id === id
        )
      );
    }
  })();
};

export { fetchData };
