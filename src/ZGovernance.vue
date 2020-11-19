<template lang="pug">
  div(v-if="isDrizzleInitialized")
    h1 ZGovernance
    div(class="row spacer legend")
      small zLOT staked will accrue rewards based on the protocol's performance fee and zTreasury share's values
    div(class="row")
      div(class="column")
        div(class="gov-panel")
          div(class="gov-title") <strong>ZGOVERNANCE STATS</strong>
          div(class="gov-body")
            div Total Staked: 8,888.00 <span class="unit">ZLOT</span>
            div Reward Rate: 88,800 <span class="unit">ZLOT/WEEK</span>
    div(class="row")
      div(class="column")
        div(class="gov-panel")
          div(class="gov-title") <strong>ZTREASURY STATS</strong>
          div(class="gov-body")
            div <span class="label">Earnings Distributed:</span> 29,823.1888 <span class="unit">ZHEGIC</span>
            div <span class="label">Last Distribution:</span> Thursday at 4:03 pm
            div <span class="label">Maintainer's Share:</span> 10 %
            div <span class="label">Governance Share:</span> 90%
    div(class="row")
      div(class="column")
        div(class="gov-panel")
          div(class="gov-title") <strong>YOUR STATS</strong>
          div(class="gov-body")
            div <span class="label">Staked:</span> 88 <span class="unit">ZLOT</span>
            div <span class="label">% of Staked ZLOT:</span> 88.88%
            div <span class="label">ZLOT Balance:</span> 8,888.88  <span class="unit">ZLOT</span>
            div <span class="label">Total Reward Claimed:</span> 88 <span class="unit">ZHEGIC</span>
            div <span class="label">Reward Rate:</span> 888.88 <span class="unit">ZHEGIC/WEEK</span>
            div <span class="label">Rewards Available:</span> 888 <span class="unit">ZHEGIC</span>


</template>

<script>
//import InfoPanel from './components/InfoPanel'
import { mapGetters } from 'vuex'
//import ethers from 'ethers'
//import axios from 'axios'

//const max_uint = new ethers.BigNumber.from(2).pow(256).sub(1).toString()

export default {
  name: 'ZGovernance',
  components: {
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
div.legend {
  max-width: 500px;
}
div.gov-panel {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

div.gov-title {
  height: 25px;
  margin-bottom: 0.1em;
  vertical-align: middle;
}

div.gov-body span {
  display:flex;
}
</style>