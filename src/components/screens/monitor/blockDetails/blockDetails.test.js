import { mountWithRouter } from '@utils/testHelpers';
import { truncateAddress } from '@utils/account';
import { blocks } from '../../../../../test/constants/blocks';
import transactions from '../../../../../test/constants/transactions';
import BlockDetails from './blockDetails';

describe('BlockDetails page', () => {
  let wrapper;
  const props = {
    t: (key) => key,
    blockDetails: {
      isLoading: false,
      data: blocks[0],
      loadData: jest.fn(),
      error: false,
    },
    blockTransactions: {
      isLoading: false,
      data: [],
      loadData: jest.fn(),
    },
    match: {
      url: `/monitor/blocks/${blocks[0].id}`,
    },
    history: {
      location: {
        search: `?id=${blocks[0].id}`,
      },
    },
  };

  const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
  };

  beforeEach(() => {
    wrapper = mountWithRouter(BlockDetails, props);
  });

  it('renders a page properly without errors', () => {
    expect(wrapper.find('h1').at(0)).toHaveText('Block details');
    expect(wrapper.find('label').at(0)).toHaveText('Block ID');
    expect(wrapper.find('span.copy-title').at(0)).toHaveText(
      truncateAddress(blocks[0].id),
    );
    expect(wrapper.find('label').at(1)).toHaveText('Height');
    expect(wrapper.find('label').at(2)).toHaveText('Date');
    expect(wrapper.find('label').at(3)).toHaveText('Confirmations');
    expect(wrapper.find('label').at(4)).toHaveText('Version');
    expect(wrapper.find('label').at(5)).toHaveText('Generated by');
    expect(wrapper.find('label').at(6)).toHaveText('Total forged');
    expect(wrapper.find('label').at(7)).toHaveText('Reward');
    expect(wrapper.find('label').at(8)).toHaveText('Total burnt');
    expect(wrapper.find('label').at(9)).toHaveText('Total fee');
    resizeWindow(1000, 500);
  });

  it('renders a page with error', () => {
    const newProps = {
      ...props,
      blockDetails: {
        ...props.blockDetails,
        error: true,
      },
    };
    wrapper = mountWithRouter(BlockDetails, newProps);
    expect(wrapper.find('h1').at(0)).toHaveText('Block details');
    expect(wrapper).toContainMatchingElement('Feedback');
    expect(wrapper.find('span').at(0)).toHaveText(
      'Failed to load block details.',
    );
  });

  it('renders a page with transaction list', () => {
    wrapper = mountWithRouter(BlockDetails, props);
    expect(wrapper.find('TransactionRow')).toHaveLength(0);

    const newProps = {
      ...props,
      blockTransactions: {
        ...props.blockTransactions,
        isLoading: false,
        data: transactions,
      },
    };
    wrapper = mountWithRouter(BlockDetails, newProps);
    expect(wrapper.find('TransactionRow')).toHaveLength(transactions.length);
  });

  it('shows a message when empty transactions response', () => {
    const newProps = {
      ...props,
      blockTransactions: {
        ...props.blockTransactions,
        error: 'failed',
      },
    };
    wrapper = mountWithRouter(BlockDetails, newProps);
    expect(wrapper.find('Empty')).toHaveLength(1);
  });
});
