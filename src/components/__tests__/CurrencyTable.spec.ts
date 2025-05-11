import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import CurrencyTable from '../CurrencyTable.vue'
import axios from 'axios'

describe('CurrencyTable', () => {
  it('renders properly', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: [
        {
          name: 'Bitcoin',
          icon: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
          current_price: 92173,
          percent_change_24h: 0.71387,
          market_cap: 1830940543303,
          source: 'CoinGecko',
        },
        {
          name: 'Ethereum',
          icon: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
          current_price: 2267.09,
          percent_change_24h: 8.98552,
          market_cap: 273208999508,
          source: 'CoinGecko',
        },
      ],
    })

    const wrapper = mount(CurrencyTable)
    await flushPromises()

    const rows = wrapper.findAll('tr')
    expect(rows.length).toBe(3)
  })
})
