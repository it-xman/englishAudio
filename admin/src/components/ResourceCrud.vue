<template>
    <div>
        <avue-crud
                :data="data.data"
                :option="option"
                @row-save="create"
                @row-update="update"
                @row-del="del"
                v-if="option.column"
        >
        </avue-crud>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class ResourceCrud extends Vue {
        @Prop(String) resource!:string
        data = {}
        option = {}

        created() {
            this.fetch()
            this.fetchOption()
        }

        async create(row: any, done: any) {
            await this.$http.post(`${this.resource}`, row)
            this.$message.success('创建成功')
            await this.fetch()
            done()
        }

        async update(row: any, index: number, done: any) {
            const data: any = row
            delete data.$index
            await this.$http.put(`${this.resource}/${row._id}`, data)
            this.$message.success('修改成功')
            await this.fetch()
            done()
        }

        async del(row: any) {
            await this.$http.delete(`${this.resource}/${row._id}`)
            this.$message.success('删除成功')
            await this.fetch()
        }


        async fetch() {
            const response = await this.$http.get(`${this.resource}`)
            this.data = response.data;
        }

        async fetchOption() {
            const response = await this.$http.get(`${this.resource}/option`)
            this.option = response.data
        }
    }

</script>

<style>
</style>
