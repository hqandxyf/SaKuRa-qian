<template>
    <div class="shoucangjia">
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-container>
                <el-main>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" label="id" width="100">
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" width="180">
                        </el-table-column>
                        <el-table-column prop="password" label="密码" width="180">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" size="mini" @click="dialogFormVisible = true">编辑</el-button>
                    <el-button type="primary" size="mini" @click="getName">刷新</el-button>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="form.status" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" size="mini" @click="xinzeng">新增</el-button>
                <el-button type="primary" size="mini" @click="bianji">完成</el-button>
                <el-button type="danger" size="mini" @click="shanchu">删除</el-button>
                <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            form: {
                id: '',
                username: '',
                password: '',
                status: ''
            },
            formLabelWidth: '120px'
        }
    }, mounted() {
        this.getName();
    }, methods: {
        getName: function () {//查询
            axios({
                url: '/api/user',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        bianji: function () {//编辑
            axios({
                url: '/api/user',
                method: 'put',
                data: {
                    id: this.form.id,
                    username: this.form.username,
                    password: this.form.password,
                    status: this.form.status
                }
            }).then(res => {
                this.tableData = res.data.data;
                this.dialogFormVisible = false
            }).catch(err => {
                console.log(err)
            })
        },
        xinzeng: function () {//新增
            axios({
                url: '/api/user',
                method: 'post',
                data: {
                    id: this.form.id,
                    username: this.form.username,
                    password: this.form.password,
                    status: this.form.status
                }
            }).then(res => {
                if (res != null) { alert("添加成功，请返回查看") }
                this.dialogFormVisible = false
            }).catch(err => {
                console.log(err)
            })
        },
        shanchu: function () {//删除收藏夹
            var id1 = parseInt(this.form.id)
            axios.delete(`/api/user/${id1}`)
                .then(() => {
                    alert("删除成功！")
                    this.dialogFormVisible = false
                })
                .catch(error => {
                    console.error('Error deleting resource:', error);
                });
            
        }
    }
}
</script>

<style>
.router-link-active {
    text-decoration: none;
    color: rgb(20, 20, 20);
}

a {
    text-decoration: none;
    color: rgb(12, 12, 12);
}
</style>