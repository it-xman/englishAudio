<template>
    <div>
        <h3>{{create ? '创建课程' : '编辑课程'}}</h3>
        <ele-form
                v-model="data"
                :form-desc="fields"
                :request-fn="submit"
        >

        </ele-form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class CourseEdit extends Vue {
        @Prop(String) id!: string

        data = {}

        fields = {
            name: {
                label: '课程名称',
                type: 'input'
            },
            cover: {
                label: '课程封面图',
                type: 'input'
            }
        }

        created() {
            if (!this.create) {
                this.fetch();
            }
        }


        // 根据是否传递id参数，来显示创建还是编辑
        get create() {
            return !this.id
        }


        async fetch() {
            const response = await this.$http.get(`courses/${this.id}`);
            console.log(response.data)
            this.data = response.data
        }

        async submit(data: object) {
            const url =  this.create ? 'courses' : `courses/${this.id}`
            const method = this.create ? 'post' : 'put'
            await this.$http[method](url, data)
            this.$message.success('课程创建成功')
            this.data = {}
            this.$router.go(-1)
        }


    }

</script>

<style lang="scss">

</style>