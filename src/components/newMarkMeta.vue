<template>
    <div class="popup">
        <div class="popup-content">
            <form class="pure-form pure-form-stacked" v-on:submit.prevent="submit">
                <h3>Neue Spalte hinzufügen</h3>
                <label for="form-name">Name der Note:</label>
                <input id="form-name" v-model="name" type="text" />
                <label for="form-valance">Wertung: (2 mal/3 mal) oder in Prozent:</label>
                <input id="form-valance" v-model="valance" type="text" />
                <button type="submit" class="pure-button pure-button-primary">Speichern</button>
                <button type="button" class="pure-button button-error" @click="$emit('done', false)">Abbrechen</button>
            </form>
            <spinner v-show="loading"/>
        </div>
        <div class="popup-blackout" @click="$emit('done', false)"></div>
    </div>
</template>
<script>
import spinner from '../components/spinner'
import message from '../components/message.vue'

export default {
    name: 'newmarkmeta',
    components: {spinner, message},
    props: {
        id: { type: String },
        done: {type: Function}
    },
    data: function () {
        return {
            name: null,
            valance: null,
            loading: false
        }
    },
    methods: {
        submit: function () {
            var self = this;
            var params = {
                name: this.name,
                courseid: this.id,
                valance: this.valance
            }
            this.loading = true;
            this.$store.dispatch('newMarkMeta', params).then(function (resp) {
                console.log("mark created...")
                self.$store.dispatch('fetchMarks', self.id).then(function (resp) {
                    self.loading = false
                    console.log("reloading marks done....")
                    self.$emit('done', true)
                }, function (error) {
                    alert(error)
                })
            }, function (error) {
                alert(error)
            });
        }
    }
}
</script>
<style scoped>
.popup {
    z-index: 5;
    float: middle;
}
.popup-content {
    z-index: 6;
    position:fixed;
    left: 50%;
    margin-left: -150px;
    width: 300px;
    padding: 20px 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    border: 1px solid #ccc;
}
.popup-blackout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}
.button-error {
    background: rgb(202, 60, 60); /* this is a maroon */
    color: white;
}
h3 {
    margin-top: 0px;
}
</style>