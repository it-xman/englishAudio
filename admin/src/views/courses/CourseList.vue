<template>
    <div>
        <el-button type="primary" size="small" @click="$router.push(`/courses/create`)">创建课程</el-button>
        <el-table :data="data.data" border stripe>
            <el-table-column v-for="(field, name) in fields"
                             :prop="name"
                             :key="name"
                             :label="field.label"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row}">
                    <el-button type="primary" size="small" @click="$router.push(`/courses/edit/${row._id}`)">编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="del(`/courses/${row._id}`)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class CourseList extends Vue {
        data = {};

        fields = {
            _id: {
                label: "IP"
            },
            name: {
                label: '课程名称'
            },
            cover: {
                label: '课程封面图'
            }
        }


        created() {
            this.fetch()
        }

        async fetch() {
            const response = await this.$http.get('courses')
            this.data = response.data;
        }

        async del(url: string) {
            try {
                await this.$confirm('此操作将删除数据，确认删除?', '删除');
            } catch (e) {
                return;
            }
            await this.$http.delete(url)
            this.$message.success('删除成功')
            await this.fetch()
        }

    }

</script>

<style>
</style>
