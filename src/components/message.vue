<template>
    <div :class="type">
        <span v-show="type=='error'">Fehler:</span>
        <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'message',
    props: {
        type: {
            validator: function (value) {
                return ['error'].indexOf(value) !== -1;
            }
        }
    }
}
</script>

<style scoped>
div.error {
    background-color: #fce4e4;
    border: 1px solid #fcc2c3;
    float: left;
    padding: 10px 10px;
    margin-bottom: 10px;
}

span.error {
    color: #cc0033;
    font-size: 13px;
}
</style>