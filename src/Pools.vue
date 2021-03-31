<template lang="pug">
	div(v-if="isDrizzleInitialized")
		h1 Pools
		div(class="row")
			p Your balance: <strong>{{ zlot_balance | fromWei(2) }} <span class="unit">ZLOT</span></strong>
		div(class="row")
			div(class="column")
				info-panel(lp_symbol='ZHEGIC-HEGIC' lp_contract='LP_HEGIC-zHEGIC' lp_link='https://app.uniswap.org/#/add/0x837010619aeb2AE24141605aFC8f66577f6fb2e7/0x584bC13c7D411c00c01A62e8019472dE68768430')
			div(class="column")
				info-panel(lp_symbol='ZHEGIC-ETH' lp_contract='LP_zHEGIC-ETH' lp_link='https://app.uniswap.org/#/add/0x837010619aeb2AE24141605aFC8f66577f6fb2e7/ETH')
		div(class="row spacer")
		div(class="row")
			div(class="column")
				info-panel(lp_symbol='HEGIC-DAI' lp_contract='LP_HEGIC-DAI' lp_link='https://app.uniswap.org/#/add/0x584bC13c7D411c00c01A62e8019472dE68768430/0x6B175474E89094C44Da98b954EedeAC495271d0F')
			div(class="column")
				info-panel(lp_symbol='ZLOT-DAI' lp_contract='LP_zLOT-DAI' lp_link='https://app.uniswap.org/#/add/0xA8e7AD77C60eE6f30BaC54E2E7c0617Bd7B5A03E/0x6B175474E89094C44Da98b954EedeAC495271d0F')

</template>

<script>
import InfoPanel from './components/InfoPanel'
import { mapGetters } from 'vuex'
import ethers from 'ethers'
//import axios from 'axios'

//const max_uint = new ethers.BigNumber.from(2).pow(256).sub(1).toString()

export default {
  name: 'Pool',
  components: {
    InfoPanel
  },
  data() {
    return {
      username: null,
      hegic_price: 0,
      deposit_amount: 0,
      withdraw_amount: 0,
      error: null
    }
  },
  filters: {
    fromWei(data, precision) {
      if (data === 'loading') return data
      if (data > 2**255) return '�~H~^'
      let value = ethers.utils.commify(ethers.utils.formatEther(data))
      let parts = value.split('.')

      if (precision === 0) return parts[0]

      return parts[0] + '.' + parts[1].slice(0, precision)
    },
  },
  methods: {
    call(contract, method, args, out='number') {
      let key = this.drizzleInstance.contracts[contract].methods[method].cacheCall(...args)
      let value
      try {
        value = this.contractInstances[contract][method][key].value 
      } catch (error) {
        value = null
      }
      switch (out) {
        case 'number':
          if (value === null) value = 0
          return new ethers.BigNumber.from(value)
        case 'address':
          return value
        default:
          return value
      }
    },
  },
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData', 'contractInstances']),
    zlot_balance() {
      return this.call('zLOT', 'balanceOf', [this.activeAccount])
    },
  },  
}

</script>

<style>
div.spacer {
	padding-top: 2em;
  padding-bottom: 2em;
}
</style>