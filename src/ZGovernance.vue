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
            div Total Staked: {{ total_staked | fromWei(2) }} <span class="unit">ZLOT</span>
    div(class="row")
      div(class="column")
        div(class="gov-panel")
          div(class="gov-title") <strong>ZTREASURY STATS</strong>
          div(class="gov-body")
            div <span class="label">Earnings Distributed:</span> {{ total_earnings_distributed | fromWei(6) }} <span class="unit">ZHEGIC</span>
            div <span class="label">Last Distribution:</span> {{ last_earnings_distribution | fromTimestamp }}
            div <span class="label">Maintainer's Share:</span> {{ maintainer_share/shares_precision/100 | toPct(0) }}
            div <span class="label">Governance Share:</span> {{ governance_share/shares_precision/100 | toPct(0) }}
    div(class="row")
      div(class="column")
        div(class="gov-panel")
          div(class="gov-title") <strong>YOUR STATS</strong>
          div(class="gov-body")
            div <span class="label">Staked:</span> {{ your_stake | fromWei(6) }} <span class="unit">ZLOT</span>
            div <span class="label">% of Staked ZLOT:</span> {{ your_stake/total_staked | toPct(2) }}
            div <span class="label">ZLOT Balance:</span> {{ zlot_balance | fromWei(2) }}  <span class="unit">ZLOT</span>
            div <span class="label">Total Reward Claimed:</span> {{ total_earned_rewards | fromWei(2) }} <span class="unit">ZHEGIC</span>
            div <span class="label">Reward Rate:</span> {{ reward_rate | fromWei(2) }} <span class="unit">ZHEGIC/WEEK</span>
            div <span class="label">Rewards Available:</span> {{ earned | fromWei(2) }} <span class="unit">ZHEGIC</span>


</template>

<script>
//import InfoPanel from './components/InfoPanel'
import { mapGetters } from 'vuex'
import ethers from 'ethers'
import moment from 'moment'

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
  filters: {
    fromWei(data, precision) {
      if (data === 'loading') return data
      if (data > 2**255) return '�~H~^'
      let value = ethers.utils.commify(ethers.utils.formatEther(data))
      let parts = value.split('.')

      if (precision === 0) return parts[0]

      return parts[0] + '.' + parts[1].slice(0, precision)
    },
    toPct(data, precision) {
      if (isNaN(data)) return '?'
      return `${(data * 100).toFixed(precision)}%`
    },
    fromTimestamp(data) {
      if (data) {
        return moment.unix(String(data)).calendar()
      }
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
    total_earnings_distributed() {
      return this.call('zTreasury', 'totalEarningsDistributed', [])
    },
    last_earnings_distribution() {
      return this.call('zTreasury', 'lastEarningsDistribution', [])
    },
    maintainer_share(){
      return this.call('zTreasury', 'maintainerShare', [])
    },
    governance_share(){
      return this.call('zTreasury', 'governanceShare', [])
    },
    shares_precision(){
      return this.call('zTreasury', 'SHARES_PRECISION', [])
    },
    your_stake() {
      return this.call('zGovernance', 'balanceOf', [this.activeAccount])
    },
    total_staked() {
      return this.call('zGovernance', 'totalSupply', [])
    },
    earned() {
      return this.call('zGovernance', 'earned', [this.activeAccount])
    },
    reward_rate() {
      return this.call('zGovernance', 'rewardRate', [])
    },
    total_earned_rewards() {
      return this.call('zGovernance', 'totalEarnedRewards', [this.activeAccount])
    },

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