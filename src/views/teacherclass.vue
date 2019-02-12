<template>
    <div>
        <div class="header">
            <h1>Klasse {{id}}</h1>
        </div>
        <table class="pure-table">
        <thead>
            <tr>
                <th>Name</th>
                <th class="rotate">Klausur 1</th>
                <th class="rotate">Klausur 2</th>
                <th class="rotate">Mündl 1</th>
            </tr>
        </thead>
        <tbody>
            <tr class="pure-table-odd">
                <td>Jurek Weber</td>
                <td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td>
                <td>4</td>
                <td>1+</td>
            </tr>
        </tbody>
        </table>

    </div>
</template>

<script>
export default {
    name: 'teacherclass',
    props: {
        id: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>
th.rotate {
    text-align:center;
    white-space:nowrap;
    transform-origin:50% 50%;
    transform: rotate(90deg);
    width:0;
}


th.rotate:before {
    content:'';
    width:0;
    padding-top:110%;/* takes width as reference, + 10% for faking some extra padding */
    display:inline-block;
    vertical-align:middle;
}
</style>