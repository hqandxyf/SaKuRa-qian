<template>
    <div class="login-page">

        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header style="font-size: 40px; background-color:lightslategrey;">
                <i class="el-icon-collection" style="color:darkslategray;"></i><span>壹番日语学习平台</span>
                <el-button type="text" icon="el-icon-user-solid" style="float: right;font-size: 20px; color:dimgray;">
                    <router-link to="/login">登录</router-link>
                </el-button>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-openeds="['1', '3']" background-color="lightsteelblue">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>单词及其收藏夹</template>
                            <el-menu-item index="1-1">
                                <router-link to="/main/danci"><i class="el-icon-s-order"></i>单词总览</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/main/shou"><i class="el-icon-folder-opened"></i>收藏夹</router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2"><i class="el-icon-search"></i>
                            <router-link to="/main/sousuo">搜索</router-link>
                        </el-menu-item>
                        <el-menu-item index="3"><i class="el-icon-menu"></i>
                            <router-link to="/main/yuedu">阅读</router-link>
                        </el-menu-item>
                        <el-menu-item index="4"><i class="el-icon-magic-stick"></i>
                            <router-link to="/main/fanyi">翻译</router-link>
                        </el-menu-item>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-setting"></i>设置</template>
                            <el-menu-item index="6-1-3"><i class="el-icon-user-solid"></i>
                                <router-link to="/main/user">用户</router-link>
                            </el-menu-item>
                            <el-menu-item index="6-1-4"><i class="el-icon-switch-button"></i>
                                <router-link to="/login">退出登录</router-link></el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTime: ''
        };
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },

    methods: {
        zhuti1: function () {
            document.body.style.background = 'lightsteelblue'
        },
        zhuti2: function () {
            document.body.style.background = 'grey'
        }, updateTime() {
            const now = new Date();
            const hours = this.formatTime(now.getHours());
            const minutes = this.formatTime(now.getMinutes());
            const seconds = this.formatTime(now.getSeconds());
            this.currentTime = `${hours}:${minutes}:${seconds}`;
        },
        formatTime(time) {
            return time < 10 ? `0${time}` : time;
        },
        changeColor(value) {
            document.documentElement.style.setProperty('--theme-color', value);
        }
    }
}
</script>

<style>
.router-link-active {
    text-decoration: none;
    color: rgb(20, 20, 20);
}

html,
body {
    background: #f3f2f7;
}

a {
    text-decoration: none;
    color: rgb(12, 12, 12);
}

.el-header {
    height: 60px;
}

.el-aside {
    width: 300px;
    /* background-color:"lightsteelblue" */
}

.el-main {
    padding: 0;
    height: calc(100vh - 70px);
    overflow-y: auto;
}

span {
    font-family: '宋体';
}

.clock {
    justify-content: space-between;
    align-items: center;
}

.login-page {
    background: url("../assets/tupian/PV5-4K-372.png") no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;

}
</style>
