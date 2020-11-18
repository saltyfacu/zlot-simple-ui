<template lang="pug">
	div(v-if="isDrizzleInitialized")
		h1 Pools
		div(class="row")
			p Your ZLOT balance: 0
		div(class="row")
			div(class="column")
				info-panel(lp_symbol='ZHEGIC-HEGIC')
			div(class="column")
				info-panel(lp_symbol='ZHEGIC-ETH')
		div(class="row spacer")
		div(class="row")
			div(class="column")
				info-panel(lp_symbol='HEGIC-DAI')
			div(class="column")
				info-panel(lp_symbol='ZLOT-DAI')

</template>

<script>
import InfoPanel from './components/InfoPanel'
import { mapGetters } from 'vuex'
//import ethers from 'ethers'
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
  filters: {},
  methods: {},
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData', 'contractInstances']),
  },  
}

</script>

<style>
.spacer {
	padding: 1em;
}
</style>