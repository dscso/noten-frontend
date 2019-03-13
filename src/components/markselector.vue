<template>
	<div class="selector-container">
        <table>
            <tr v-for="row in 5" :key="row">
                <td>{{row}}</td>
                <td v-for="index in 3" :key="index"><button class="selector-button" @click="$emit('onChange', 16 - (index + (row - 1) * 3)) * row">{{16 - (index + (row - 1) * 3)}}</button></td>
            </tr>
            <tr>
                <td>6</td>
                <td>&nbsp;</td>
                <td><button class="selector-button" @click="$emit('onChange',0)">0</button></td>
            </tr>
        </table>
	</div>
</template>
<script>
export default {
    name: 'markselector',
    props: {
        onChange: {type: Function},
        current: {type: Number}
    }
}
</script>
<style scoped>
.selector-container {
    position: absolute;
    border: 1px solid #ccc!important;
    border-radius: 5px;
}
.selector-button {
    height: 33px;
    width: 33px;
}
</style>