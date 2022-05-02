import { tokenMap } from '@token/configuration/tokens';
import { validateAddress } from '@common/utilities/validators';

const blocksFiltersMap = {
  addressList: {
    key: 'addressList',
    test: (addressList) =>
      !addressList.some((address) =>
        validateAddress(tokenMap.LSK.key, address)
      ),
  },
  timestamp: { key: 'timestamp', test: (str) => /^(\d+)?:(\d+)?$/.test(str) },
  generatorAddress: {
    key: 'generatorAddress',
    test: (address) => !validateAddress(tokenMap.LSK.key, address),
  },
  generatorUsername: {
    key: 'generatorUsername',
    test: (username) =>
      typeof username === 'string' &&
      validateAddress(tokenMap.LSK.key, username) === 1,
  },
  height: { key: 'height', test: (num) => !Number.isNaN(parseInt(num, 10)) },
  limit: { key: 'limit', test: (num) => typeof num === 'number' },
  offset: { key: 'offset', test: (num) => typeof num === 'number' && num > 0 },
  sort: {
    key: 'sort',
    test: (str) =>
      [
        'height:asc',
        'height:desc',
        'totalAmount:asc',
        'totalAmount:desc',
        'totalFee:asc',
        'totalFee:desc',
        'timestamp:asc',
        'timestamp:desc',
      ].includes(str),
  },
};

export default blocksFiltersMap;
