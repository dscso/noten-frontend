<template>
	<div class="selector-container">
        <div>
            <div v-for="row in 5" :key="row">
                {{row}}
                <span v-for="index in 3" :key="index"><button class="selector-button" @click="$emit('onChange', 16 - (index + (row - 1) * 3)) * row">{{16 - (index + (row - 1) * 3)}}</button></span>
            </div>
            <div>
                6
                <span><button class="selector-button" @click="$emit('onChange',0)">0</button></span>
            </div>
        </div>
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