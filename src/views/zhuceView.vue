<template>
    <div class="login-page">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="login-title">壹番日语学习平台</span>
            </div>
            <div class="login-form">
                <el-form :model="form" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户名">
                            <template slot="prepend"><i style="font-size:20px" class="el-icon-user"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <el-input type="text" v-model="form.password" auto-complete="off" placeholder="请输入密码">
                            <template slot="prepend"><i style="font-size:20px" class="el-icon-key"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:100%;" type="primary" @click="zhuce">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            loading: false,
            form: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入账户', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        zhuce: function () {
            axios({
                url: '/api/user',
                method: 'post',
                data: {
                    username: this.form.username,
                    password: this.form.password
                }
            }).then(() => {
                alert("注册成功")
                window.open("http://localhost:7001/#/login");
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
.login-page {
    background: url("../assets/tupian/PV5-4K-372.png") no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-title {
    font-size: 20px;
}

.box-card {
    width: 375px;

    padding: 0;
}

.router-link-active {
    text-decoration: none;
    color: rgb(20, 20, 20);
}

a {
    text-decoration: none;
    color: rgb(12, 12, 12);
}
</style>