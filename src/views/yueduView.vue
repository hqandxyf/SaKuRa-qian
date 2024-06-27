<template>
    <div class="yuedu">
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-container>
                <el-main>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" label="篇章" width="50">
                        </el-table-column>
                        <el-table-column prop="riwen" label="日文" width="500">
                        </el-table-column>
                        <el-table-column prop="zhongwen" label="中文" width="500">
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" size="mini" @click="dialogFormVisible = true">编辑</el-button>
                    <el-button type="primary" size="mini" @click="getName">刷新</el-button>
                    <!-- 朗读 -->
                    <div>
                        <el-input class="inseret-input" clearable placeholder="请输入内容" v-model="input" style="width: 350px;margin-right: 10px"></el-input>
                        <el-button slot="append" @click="handleTransYuYin" icon="el-icon-microphone">朗读</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日文" :label-width="formLabelWidth">
                    <el-input v-model="form.riwen" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="中文" :label-width="formLabelWidth">
                    <el-input v-model="form.zhongwen" autocomplete="off"></el-input>
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
                zhongwen: '',
                riwen: ''
            },
            formLabelWidth: '120px'
        }
    }, mounted() {
        this.getName();
    }, methods: {
        getName: function () {//查询
            axios({
                url: '/api/yuedu',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        bianji: function () {//编辑
            axios({
                url: '/api/yuedu',
                method: 'put',
                data: {
                    id: this.form.id,
                    zhongwen: this.form.zhongwen,
                    riwen: this.form.riwen
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
                url: '/api/yuedu',
                method: 'post',
                data: {
                    id: this.form.id,
                    zhongwen: this.form.zhongwen,
                    riwen: this.form.riwen
                }
            }).then(res => {
                if (res != null) { alert("添加成功，请返回查看") }
                this.dialogFormVisible = false
            }).catch(err => {
                console.log(err)
            })
        },
        shanchu: function () {//删除
            var id1 = parseInt(this.form.id)
            axios.delete(`/api/yuedu/${id1}`)
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

<style></style>