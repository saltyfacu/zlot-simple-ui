<template lang="pug">
  div(v-if="isDrizzleInitialized", id="app")
    h1 zLOT HEGIC POOL
    div Lots: {{ lots }}
    div Progress for lot # {{ lots+1 }}: {{ pool_unused_balance/lot_price | toPct()}}
    p
    div Hegic price (CoinGecko 🦎): {{ hegic_price | fromWei(4) | toCurrency(4) }}
    div Total Assets: {{ pool_total_underlying | fromWei(2) }}
    div Total AUM: {{ pool_total_aum | toCurrency(2) }}  
    p
    div Price Per Share: {{ pool_price_per_share | fromWei(8) }}
    div ETH Unclaimed Profit: {{ eth_unclaimed_rewards | fromWei(8) }}
    div WBTC Unclaimed Profit: {{ wbtc_unclaimed_rewards | fromSatoshi(8) }}
    p
    p
    div Your Account: <strong>{{ username || activeAccount }}</strong>
    div Your Pool shares ({{ zhegic_balance/zhegic_total_supply | toPct(2) }}): {{ zhegic_balance | fromWei(2) }}
    div Your Hegic Balance: {{ hegic_balance | fromWei(2) }}
    p
    label Amount 
    input(size="is-small" v-model.number="amount" type="number" min=0)
    p
    button(v-if="!has_allowance_pool", @click.prevent='on_approve_pool') {{ has_allowance_pool ? '✅ Approved' : '🚀 Approve' }}
    button(v-if="has_allowance_pool" :disabled='!has_allowance_pool', @click.prevent='on_deposit') 🏦 Deposit
    button(v-if="has_allowance_pool" :disabled='!has_allowance_pool', @click.prevent='on_deposit_all') 🏦 Deposit All
    button(:disabled='!has_zhegic_balance', @click.prevent='on_withdraw_all') 💸 Withdraw All
    div.red(v-if="error")
      span {{ error }}
    p
    p
      div.muted
        span Made with 💙  
        span Pool:  
        a(href='https://zlot.finance/', target='_blank') zLot Finance
        span  - UI:  
        a(href='https://twitter.com/fameal', target='_blank') fameal

</template>

<script>
import { mapGetters } from 'vuex'
import ethers from 'ethers'
import axios from 'axios'

const max_uint = new ethers.BigNumber.from(2).pow(256).sub(1).toString()
//const BN_ZERO = new ethers.BigNumber.from(0)
const ERROR_NEGATIVE = "You have to deposit a positive number of tokens 🐀"
const ERROR_NEGATIVE_WITHDRAW = "You don't have any vault shares"

export default {
  name: 'zLot',
  data() {
    return {
      username: null,
      hegic_price: 0,
      amount: 0,
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
    fromSatoshi(data, precision) {
      if (data === 'loading') return data
      if (data > 2**255) return '�~H~^'
      let value = ethers.utils.commify(ethers.utils.formatUnits(data, 8))
      let parts = value.split('.')

      if (precision === 0) return parts[0]

      return parts[0] + '.' + parts[1].slice(0, precision)
    },
    toPct(data, precision) {
      if (isNaN(data)) return '?'
      return `${(data * 100).toFixed(precision)}%`
    },
    toCurrency(data, precision) {
      if (typeof data !== "number") {
        data = parseFloat(data);
      }
      var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: precision
      })
      return formatter.format(data);
    },
  },
  methods: {
    on_approve_pool() {
      this.drizzleInstance.contracts['HEGIC'].methods['approve'].cacheSend(this.pool, max_uint, {from: this.activeAccount})
    },
    on_deposit() {
      this.error = null

      if (this.amount <= 0) {
        this.error = ERROR_NEGATIVE
        this.amount = 0
        return
      }

      this.drizzleInstance.contracts['HegicPool'].methods['deposit'].cacheSend(ethers.utils.parseEther(this.amount.toString()).toString(), {from: this.activeAccount})
    },
    on_deposit_all() {
      if (this.hegic_balance <= 0) {
        this.error = ERROR_NEGATIVE
        this.amount = 0
        return
      }

      this.drizzleInstance.contracts['HegicPool'].methods['depositAll'].cacheSend({from: this.activeAccount})
    },
    on_withdraw_all() {
      if (this.zhegic_balance <= 0) {
        this.error = ERROR_NEGATIVE_WITHDRAW
        this.amount = 0
        return
      }
      this.drizzleInstance.contracts['HegicPool'].methods['withdrawAll'].cacheSend({from: this.activeAccount})
    },
    async load_reverse_ens() {
      let lookup = this.activeAccount.toLowerCase().substr(2) + '.addr.reverse'
      let resolver = await this.drizzleInstance.web3.eth.ens.resolver(lookup)
      let namehash = ethers.utils.namehash(lookup)
      this.username = await resolver.methods.name(namehash).call()
    },

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

    user() {
      return this.activeAccount
    },
    pool() {
      return this.drizzleInstance.contracts['HegicPool'].address
    },
    lot_manager() {
      return this.drizzleInstance.contracts['LotManager'].address
    },
    lot_price() {
      return this.call('LotManager', 'lotPrice', [])
    },
    pool_unused_balance() {
      return this.call('HegicPool', 'unusedUnderlyingBalance', [])
    },
    pool_total_underlying() {
      return this.call('HegicPool', 'totalUnderlying', [])
    },
    pool_total_aum() {
      let toInt = new ethers.BigNumber.from(10).pow(18).pow(2).toString()
      return this.pool_total_underlying.mul(this.hegic_price).div(toInt)
    },
    pool_price_per_share() {
      return this.call('HegicPool', 'getPricePerFullShare', [])
    },
    eth_unclaimed_rewards(){
      return this.call('HegicStakingETH', 'profitOf', [this.lot_manager])

    },
    wbtc_unclaimed_rewards(){
      return this.call('HegicStakingWBTC', 'profitOf', [this.lot_manager])
    },
    lots() {
      let lots = this.call('LotManager', 'balanceOfLots', [], 'object')
      if (lots !== null) {
        console.log("ETH Lots: " + lots._ethLots)
        console.log("WBTC Lots: " + lots._wbtcLots)

        let total_lots = parseInt(lots._ethLots) + parseInt(lots._wbtcLots)
        return total_lots
      }

      return 0
    },
    zhegic_total_supply() {
      return this.call('zHEGIC', 'totalSupply', [])
    },
    zhegic_balance() {
      return this.call('zHEGIC', 'balanceOf', [this.activeAccount])
    },
    hegic_balance() {
      return this.call('HEGIC', 'balanceOf', [this.activeAccount])
    },
    has_allowance_pool() {
      return !this.call('HEGIC', 'allowance', [this.activeAccount, this.pool]).isZero()
    },
    has_zhegic_balance() {
      return (this.zhegic_balance > 0)
    },
  },
  created() {
    // Get HEGIC price from Coingecko
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=hegic&vs_currencies=usd')
      .then(response => {
        this.hegic_price = ethers.utils.parseUnits(String(response.data.hegic.usd),18)
      })

    // If the account is not undefined, try to load ENS name
    if (this.activeAccount !== undefined) this.load_reverse_ens()

    
  }
}
</script>

<style>
button {
  margin-right: 1em;
}
.muted {
  color: gray;
  font-size: 0.8em;
}
.red{
  color: red;
  font-weight: 700;
}
a, a:visited, a:hover {
  color: gray;
}
</style>