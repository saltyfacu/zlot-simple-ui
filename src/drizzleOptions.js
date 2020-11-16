import ERC20 from './abi/ERC20.json'
import HegicStaking from './abi/HegicStaking.json'
import LotManager from './abi/LotManager.json'
import HegicPool from './abi/HegicPool.json'

import Web3 from 'web3'
let web3 = new Web3(Web3.givenProvider);

const options = {
  syncAlways: false,
  contracts: [
    {
      contractName: 'HEGIC',
      web3Contract: new web3.eth.Contract(ERC20, "0x584bc13c7d411c00c01a62e8019472de68768430")
    },
    {
      contractName: 'HegicStakingETH',
      web3Contract: new web3.eth.Contract(HegicStaking, "0x1Ef61E3E5676eC182EED6F052F8920fD49C7f69a")
    },
    {
      contractName: 'HegicStakingWBTC',
      web3Contract: new web3.eth.Contract(HegicStaking, "0x840a1AE46B7364855206Eb5b7286Ab7E207e515b")
    },
    {
      contractName: 'zHEGIC',
      web3Contract: new web3.eth.Contract(ERC20, "0x837010619aeb2ae24141605afc8f66577f6fb2e7")
    },
    {
      contractName: 'LotManager',
      web3Contract: new web3.eth.Contract(LotManager, "0x441ebc9be0bc74657efa1028f87452b3ef6d755e")
    },
    {
      contractName: 'HegicPool',
      web3Contract: new web3.eth.Contract(HegicPool, "0x9e4e091fc8921fe3575eab1c9a6446114f3b5ef2")
    },
  ],
  events: {
  },
  polls: {
    accounts: 5000
  }
}

export default options
