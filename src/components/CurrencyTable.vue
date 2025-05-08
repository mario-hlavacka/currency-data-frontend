<template>
  <h1>Currencies Table</h1>
  <table class="table">
    <thead>
      <tr>
        <th v-for="header in headers">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currency in currencies">
        <td>{{ currency.source }}</td>
        <td>{{ currency.name }}</td>
        <td><img height="40px" width="40px" :src="currency.icon" :alt="currency.name" /></td>
        <td>{{ currency.current_price.toFixed(2) }} €</td>
        <td>{{ currency.percent_change_24h.toFixed(2) }} %</td>
        <td>
          {{
            Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(currency.market_cap)
          }}
          €
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ref } from 'vue'
import echo from '../echo'
import axios from 'axios'

type Currency = {
  name: string
  icon: string
  current_price: number
  percent_change_24h: number
  market_cap: number
  source: string
}

export default {
  data() {
    return {
      currencies: ref<Currency[]>([]),
      headers: ['Source', 'Name', 'Icon', 'Current price', 'Percentage change 24h', 'Market cap'],
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/api/currencies')
      .then((response) => {
        this.currencies = response.data
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error)
      })

    echo.channel('currencies').listen('CurrenciesUpdated', (event: any) => {
      this.currencies = event.currencies
    })
  },
}
</script>
