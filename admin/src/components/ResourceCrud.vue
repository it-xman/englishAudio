<template>
    <div>
        <avue-crud
                :data="data.data"
                :option="option"
                @row-save="create"
                @row-update="update"
                @row-del="del"
                :page="page"
                @on-load="changePage"
                @sort-change="changeSort"
                @search-change="search"
                :uploadBefore="uploadBefore"
                v-model="obj"
                v-if="option.column"
        >
        </avue-crud>


        <!--        <el-upload-->
        <!--                class="avatar-uploader"-->
        <!--                action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--                :show-file-list="false"-->
        <!--                :on-success="handleAvatarSuccess"-->
        <!--                :on-change="getFile"-->
        <!--                :http-request="submit"-->

        <!--        >-->
        <!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--        </el-upload>-->

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class ResourceCrud extends Vue {
        @Prop(String) resource!: string
        data: any = {}
        option: any = {
            searchMenuSpan: 8,
        }
        page: any = {
            total: 0
        }

        query: any = {}

        obj: any = {}

        // imageUrl = ''

        // file = null

        // getFile(file) {
        //     this.file = file.raw;
        // }

        // handleAvatarSuccess(res, file) {
        //     console.log(res)
        //     console.log(file)
        //     this.imageUrl = URL.createObjectURL(file.raw);
        // }

        // async submit() {
        //     let params = new FormData()
        //     params.append('file', this.file)
        //
        //     let res: any = await this.$http.post('upload', params, {
        //         headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}
        //     })
        //
        //     console.log(res)
        // }

        async created() {
            await this.fetch()
            await this.fetchOption()

            // console.log(await this.$http.get(`mp3`))
        }

        async create(row: any, done: any) {
            await this.$http.post(`${this.resource}`, row)
            this.$message.success('创建成功')
            await this.fetch()
            done()
        }

        async update(row: any, index: number, done: any) {
            await this.$http.put(`${this.resource}/${row._id}`, row)
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
            const response = await this.$http.get(`${this.resource}`, {
                params: {
                    query: this.query
                }
            })
            this.data = response.data;
            this.page.total = response.data.total;

        }

        async fetchOption() {
            const response = await this.$http.get(`${this.resource}/option`)
            this.option = {...this.option, ...response.data}
        }

        async changePage({currentPage, pageSize}: any) {
            this.query.limit = pageSize;
            this.query.page = currentPage;
            await this.fetch()
        }

        async changeSort({prop, order}: any) {
            if (order === null) {
                this.query.sort = null
            } else {
                this.query.sort = {
                    [prop]: order === 'ascending' ? 1 : -1
                }
            }
            await this.fetch()
        }

        async search(query: any, done: any) {
            for (let key in query) {
                const field = this.option.column.find((value: { prop: string; }) => value.prop === key)
                if (field.regex) {
                    query[key] = {$regex: query[key]}
                }
            }
            this.query.where = query
            await this.fetch()
            done()
        }

        async uploadBefore(file: any, done: any) {
            let params = new FormData()
            params.append('file', file)
            let res: any = await this.$http.post('upload', params)
            this.obj.cover = res.data.url
            this.obj.file = res.data.url
            done()
        }
    }

</script>

<style>

</style>
