<template lang="pug">
div(class="info-panel")
	p <strong>{{ lp_symbol }}</strong>
	div(class="stats")
		span(class="stats-data") Total Deposited: 1111.111
		span(class="stats-data") Pool Rate: 1111.111 ZLOT/WEEK
		span(class="stats-data") Your Liquidity: 0
		span(class="stats-data") Your Unclaimed Rewards: 0
		span(class="stats-data") Your LP Balance: 0
	div
		input(size="is-small" v-model.number="amount" type="number" min=0)
	p
	button(:disabled='!has_allowance_pool', @click.prevent='on_deposit') 🏦 Deposit
	button(:disabled='!has_balance_pool', @click.prevent='on_withdraw') 💸 Withdraw
</template>

<script>

export default {
  name: "InfoPanel",
  props: ['lp_symbol'],

  computed: {
  }
}

</script>
<style>
span.stats-data {
	display:flex;
}
</style>