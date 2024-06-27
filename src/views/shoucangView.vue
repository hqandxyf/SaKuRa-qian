<template>
    <div class="shoucangjia">
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-container>
                <el-main>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="shoucangjianame" label="收藏夹名" width="180">
                        </el-table-column>
                        <el-table-column prop="danciming" label="单词名" width="180">
                        </el-table-column>
                        <el-table-column prop="zhongwenshiyi" label="中文释义">
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" size="mini" @click="dialogFormVisible = true">编辑</el-button>
                    <el-button type="primary" size="mini" @click="getName">刷新</el-button>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog title="编辑收藏夹信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收藏夹名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单词名" :label-width="formLabelWidth">
                    <el-input v-model="form.danciname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="中文释义" :label-width="formLabelWidth">
                    <el-input v-model="form.zhongwenshiyi" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" size="mini" @click="xinzeng">新增</el-button>
                <el-button type="primary" size="mini" @click="bianji">编辑</el-button>
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
            input: '',
            voinceValue: 10,
            yusu: 0.7,
            selectVal: 'ja-JP',
            tableData: [],
            dialogFormVisible: false,
            form: {
                id: '',
                name: '',
                danciname: '',
                zhongwen: ''
            },
            formLabelWidth: '120px'
        }
    }, mounted() {
        this.getName();
    }, methods: {
        getName: function () {//查询
            axios({
                url: '/api/shoucangjia',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        bianji: function () {//编辑
            axios({
                url: '/api/shoucangjia',
                method: 'put',
                data: {
                    id: this.form.id,
                    shoucangjianame: this.form.name,
                    danciming: this.form.danciname,
                    zhongwenshiyi: this.form.zhongwenshiyi
                }
            }).then(res => {
                this.tableData = res.data.data;
                this.dialogFormVisible = false
            }).catch(err => {
                console.log(err)
            })
        },
        xinzeng: function () {//新增收藏夹
            axios({
                url: '/api/shoucangjia',
                method: 'post',
                data: {
                    id: this.form.id,
                    shoucangjianame: this.form.name,
                    danciming: this.form.danciname,
                    zhongwenshiyi: this.form.danciname
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
            axios.delete(`/api/shoucangjia/${id1}`)
                .then(() => {
                    alert("删除成功！")
                    this.dialogFormVisible = false
                })
                .catch(error => {
                    console.error('Error deleting resource:', error);
                });

        },handleTransYuYin() {
            if (this.input) {
                let msg = new SpeechSynthesisUtterance(this.input);
                msg.volume = this.voinceValue;
                msg.rate = this.yusu;
                msg.pitch = this.voinceValue;
                msg.lang = this.selectVal;
                this.throttle(window.speechSynthesis.speak(msg), 2000);
            } else {
                this.$message.error('输入框内容不能为空');
            }

        },
        throttle(fn, delay) {
            let last = 0
            return function () {
                const now = new Date()
                if (now - last > delay) {
                    fn.apply(this, arguments)
                    last = now
                }
            }
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