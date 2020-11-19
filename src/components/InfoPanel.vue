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
	button(:disabled='!has_allowance_pool', @click.prevent='on_deposit') 🏦 Deposit
	button(:disabled='!has_balance_pool', @click.prevent='on_withdraw') 💸 Withdraw
</template>

<script>

export default {
  name: "InfoPanel",
  props: ['lp_symbol', 'lp_link'],

  computed: {
  },
  methods: {
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