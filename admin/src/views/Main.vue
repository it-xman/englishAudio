<template>
    <el-container>
        <el-aside width="200px">
            <el-menu mode="vertical" :default-active="$route.path" :router="true" class="main-menu">
                <el-submenu
                        v-for="(item, index) in menu.items"
                        :key="`menu-item-${index}`"
                        :index="index + 1 + ''">
                    <template slot="title">{{item.title}}</template>
                    <el-menu-item
                            v-for="(subItem, subIndex) in item.items"
                            :key="`menu-item-${index + 1}-${subIndex + 1}`"
                            :index="subItem.path">
                        {{subItem.title}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                English
            </el-header>

            <el-main>
                <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class Main extends Vue {
        menu = {
            items: [
                {
                    title: '内容管理',
                    items: [
                        {
                            title: '首页',
                            path: '/'
                        },
                        {
                            title: '课程管理',
                            path: '/courses/list'
                        },
                        {
                            title: '课时管理',
                            path: '/episodes/list'
                        }
                    ]
                },
                {
                    title: '运营管理',
                    items: [
                        {
                            title: '用户管理',
                            path: '/users/list'
                        }
                    ]
                }
            ]
        }
    }

</script>

<style lang="scss">
    .main-menu {
        height: 100vh;
    }
</style>
