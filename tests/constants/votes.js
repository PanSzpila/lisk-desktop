export default [
  {
    amount: '1000000000000',
    delegateAddress: '5059876081639179984L',
    delegate: {
      username: 'genesis_1',
      totalVotesReceived: '1000000000000',
      delegate: {
        isBanned: false,
        pomHeights: [478, 555],
        lastForgedHeight: 0,
        consecutiveMissedBlocks: 0,
      },
    },
  },
];

const generateVotes = (index) => ({
  asset: { votes: [{ delegateAddress: `lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y${index + 10}`, amount: `${index + 10}0000000` }] },
  block: {
    height: 16418742 + index,
    id: '1f48b9f4dae3a027b73685810016edadfff45175955b6ea3b24951597a99b498',
    timestamp: 1653519360,
  },
  sender: {
    address: 'lskd6yo4kkzrbjadh3tx6kz2qt5o3vy5zdnuwycmw',
    publicKey: 'ea62fbdd5731a748a63b593db2c22129462f47db0f066d4ed3fc70957a456ebc',
    username: `testUsername_${index + 1}`,
  },
  height: 16418742 + index,
});

export const votesList = Array(10).fill(1).map((_, idx) => generateVotes(idx));
