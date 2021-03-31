<template lang="pug">
div(class="info-panel")
	div(class="stats-title")
		| <strong>{{ lp_symbol }}</strong>
		a(class="liquidity-button" :href="lp_link" target="_blank") ➕ Add Liquidity
	div(class="stats-body")
		div <span class="label">Total Deposited:</span> 1111.111
		div <span class="label">Pool Rate:</span> 1111.111 <span class="unit">ZLOT/WEEK</span>
		div <span class="label">Your Liquidity:</span> 0
		div <span class="label">Your Unclaimed Rewards:</span> 0
		div <span class="label">Your LP Balance:</span> 0
	div(class="stats-actions")
		input(size="is-small" v-model.number="amount" type="number" min=0)
		| 
		<span class="unit"> {{ lp_symbol }} </span>
	p
	button(:disabled='!has_lp_allowance', @click.prevent='on_deposit') 🏦 Deposit
	button(:disabled='!has_lp_balance', @click.prevent='on_withdraw') 💸 Withdraw
</template>

<script>
import { mapGetters } from 'vuex'
import ethers from 'ethers'

export default {
	name: "InfoPanel",
	props: ['lp_symbol', 'lp_contract', 'lp_link'],
	data() {
		return {
			amount: 0,
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
	computed: {
		...mapGetters('accounts', ['activeAccount', 'activeBalance']),
		...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
		...mapGetters('contracts', ['getContractData', 'contractInstances']),
		lp(){
			return this.drizzleInstance.contracts[this.lp_contract].address
		},
		lp_balance() {
			return this.call(this.lp_contract, 'balanceOf', [this.activeAccount])
		},
		has_lp_allowance() {
			return !this.call(this.lp_contract, 'allowance', [this.activeAccount, this.lp]).isZero()
		},
		has_lp_balance() {
			return (this.lp_balance > 0)
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
		}
	},
}

</script>
<style>
div.stats-title {
	height: 25px;
	margin-bottom: 1em;
	vertical-align: middle;
}

a.liquidity-button {
	margin-left: 4em;
	min-width: 110px;
	border-style: solid;
	border-width : 1px 1px 1px 1px;
	border-radius: 2px;
	text-decoration : none;
	padding : 3px;
	border-color : #000000;
	font-size: 10px;
}

div.stats-actions {
	margin-top: 0.5em;
}
</style>