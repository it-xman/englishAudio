<template>
    <div>
        课程列表
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class CourseList extends Vue {
        data = {}


        created() {
            this.fetch()
        }

        async fetch() {
            const response = await this.$http('courses')
            console.log(response.data)
            this.data = response.data
        }

    }

</script>

<style>
</style>
