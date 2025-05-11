<template>
  <div>
    <h1 class="text-3xl py-6 text-center">Currencies Table</h1>
    <table class="table rounded-t-lg">
      <thead class="bg-gray-800 uppercase font-bold text-white">
        <tr>
          <th class="px-6 py-2" v-for="header in headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white-0 divide-y divide-gray-700 text-black">
        <tr
          class="odd:bg-white even:bg-gray-50"
          v-for="currency in currencies"
          :key="generateCurrencyKey(currency)"
        >
          <td class="px-6 py-2">{{ currency.source }}</td>
          <td class="px-6 py-2">{{ currency.name }}</td>
          <td class="px-6 py-2">
            <img height="40px" width="40px" :src="currency.icon" :alt="currency.name" />
          </td>
          <td class="pr-6 py-2 text-right">{{ formatNumber(currency.current_price) }} €</td>
          <td class="pr-6 py-2 text-right">{{ formatNumber(currency.percent_change_24h) }} %</td>
          <td class="pr-6 py-2 text-right">{{ formatNumber(currency.market_cap) }} €</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" role="status" class="text-center py-5">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import echo from '../echo'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { Currency } from '@/types/Currency'
import LoadingSpinner from './LoadingSpinner.vue'

const currencies = ref<Currency[]>([])
const loading = ref<boolean>(true)
const headers = ['Source', 'Name', 'Icon', 'Current price', 'Percentage change 24h', 'Market cap']

onMounted(() => {
  axios
    .get(import.meta.env.VITE_CURRENCIES_ENDPOINT_URL)
    .then((response) => {
      currencies.value = response.data
      loading.value = false
    })
    .catch((error) => {
      console.error('There was an error fetching the data:', error)
    })

  echo.channel('currencies').listen('CurrenciesUpdated', (event: any) => {
    currencies.value = event.currencies
  })
})

function generateCurrencyKey(currency: Currency): string {
  return `${currency.source}-${currency.name}`
}

const formatNumber = (value: number) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
</script>
