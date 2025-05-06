<template>
    <h1>Currency Table</h1>

    <table class="table">
        <thead>
            <tr>
                <th v-for="header in ['name', 'icon', 'current_price', 'percent_change_24h', 'market_cap']">{{ header }}</th>
            </tr>
        </thead>
        <tbody v-for="currency in [1,2,3,4,5,6]">
            <tr>
                <td>{{ currency }}</td>
                <td>{{ currency }}</td>
            </tr>
        </tbody>
    </table>
</template>