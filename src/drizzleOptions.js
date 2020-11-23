import ERC20 from './abi/ERC20.json'
import HegicStaking from './abi/HegicStaking.json'
import LotManager from './abi/LotManager.json'
import HegicPool from './abi/HegicPool.json'
import zTreasury from './abi/zTreasury.json'
import zGovernance from './abi/zGovernance.json'
import UNIV2 from './abi/UNIV2.json'

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
      contractName: 'zHEGIC',
      web3Contract: new web3.eth.Contract(ERC20, "0x837010619aeb2ae24141605afc8f66577f6fb2e7")
    },
    {
      contractName: 'zLOT',
      web3Contract: new web3.eth.Contract(ERC20, "0xa8e7ad77c60ee6f30bac54e2e7c0617bd7b5a03e")
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
      contractName: 'LotManager',
      web3Contract: new web3.eth.Contract(LotManager, "0x441ebc9be0bc74657efa1028f87452b3ef6d755e")
    },
    {
      contractName: 'HegicPool',
      web3Contract: new web3.eth.Contract(HegicPool, "0x9e4e091fc8921fe3575eab1c9a6446114f3b5ef2")
    },
    {
      contractName: 'zTreasury',
      web3Contract: new web3.eth.Contract(zTreasury, "0x3fc929dB2168cFe8E7b5e5370761A4f1b7163911")
    },
    {
      contractName: 'zGovernance',
      web3Contract: new web3.eth.Contract(zGovernance, "0x7c7b924b4eaed3DA875Bc792b5C1a0b33d118047")
    },
    {
      contractName: 'LP_zLOT-DAI',
      web3Contract: new web3.eth.Contract(UNIV2, "0x48598b64d88ab649e49e82f9e328eeee5011a8ff")
    },
    {
      contractName: 'LP_HEGIC-zHEGIC',
      web3Contract: new web3.eth.Contract(UNIV2, "0x6ddc12ef2940137f89af63f05196a4c9d4883ee4")
    },
    {
      contractName: 'LP_zHEGIC-ETH',
      web3Contract: new web3.eth.Contract(UNIV2, "0x2855d51a6c054e5e879bfce18e3a028ae5c190f7")
    },
    {
      contractName: 'LP_HEGIC-DAI',
      web3Contract: new web3.eth.Contract(UNIV2, "0x502700f282e6bfc2bb3b805893fadffacf688e7b")
    },
  ],
  events: {
  },
  polls: {
    accounts: 5000
  }
}

export default options
