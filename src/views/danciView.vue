<template>
    <div class="danci">

        <!--动态将图片轮播图的容器高度设置成与图片一致-->
        <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="item in imagebox" :key="item.id">
                <img :src="item.idView" class="image">
            </el-carousel-item>
        </el-carousel>

        <el-container style="height: 700px; border: 1px solid #eee">
            <el-container>
                <el-main>
                    <el-table :data="tableData" border>
                        <el-table-column prop="id" label="序号" width="50"></el-table-column>
                        <el-table-column prop="zhongwen" label="中文" width="140"></el-table-column>
                        <el-table-column prop="riwen" label="日文" width="200"></el-table-column>
                        <el-table-column prop="liju" label="例句" width="320"></el-table-column>
                        <el-table-column prop="lijujieshi" label="例句解释" width="260"></el-table-column>
                    </el-table>
                    <el-button type="primary" size="mini" @click="dialogFormVisible = true">编辑</el-button>
                    <el-button type="primary" size="mini" @click="getdanci">刷新</el-button>
                    <div>
                        <el-input class="inseret-input" clearable placeholder="请输入内容" v-model="input" style="width: 350px;margin-right: 10px"></el-input>
                        <el-button slot="append" @click="handleTransYuYin" icon="el-icon-microphone">朗读</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <!-- 对话框 -->
        <el-dialog title="编辑单词信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="中文" :label-width="formLabelWidth">
                    <el-input v-model="form.zhongwen" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日文" :label-width="formLabelWidth">
                    <el-input v-model="form.riwen" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="例句" :label-width="formLabelWidth">
                    <el-input v-model="form.liju" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="例句解释" :label-width="formLabelWidth">
                    <el-input v-model="form.lijujieshi" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" size="mini" @click="xinzeng">新增</el-button>
                <el-button type="danger" size="mini" @click="shanchu">删除</el-button>
                <el-button type="primary" size="mini" @click="bianji">完成</el-button>
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
            drawer: false,
            direction: 'btt',
            input: '',
            voinceValue: 10,
            yusu: 0.7,
            selectVal: 'ja-JP',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            tableData: [],
            form: {
                id: '',
                zhongwen: "",
                riwen: "",
                liju: "",
                lijujieshi: ""
            },
            wenbenform: {
                zhongwen: "",
                riwen: ""
            },
            imagebox: [
                { id: 0, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_AbandonedCorridor.jpg') },
                { id: 1, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_AbandonedCorridor_Night.jpg') },
                { id: 2, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Beachside.jpg') },
                { id: 3, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Beachside_Sunset.jpg') },
                { id: 4, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Beachside_Night.jpg') },
                { id: 5, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Campus.jpg') },
                { id: 6, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Campus_Sunset.jpg') },
                { id: 7, idView: ('https://api.kivo.wiki/assets/images/gallery/1/BG_Campus_Night.jpg') }

            ],
            screenWidth: 0
        }
    },
    methods: {
        setSize: function () {
            this.bannerHeight = 400 / 1920 * this.screenWidth;
        },
        getdanci: function () {
            axios({
                url: '/api/danci/listall',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        bianji: function () {//编辑
            axios({
                url: '/api/danci',
                method: 'put',
                data: {
                    id: this.form.id,
                    zhongwen: this.form.zhongwen,
                    riwen: this.form.riwen,
                    liju: this.form.liju,
                    lijujieshi: this.form.lijujieshi
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
                url: '/api/danci',
                method: 'post',
                data: {
                    id: this.form.id,
                    zhongwen: this.form.zhongwen,
                    riwen: this.form.riwen,
                    liju: this.form.liju,
                    lijujieshi: this.form.lijujieshi
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
            axios.delete(`/api/danci/${id1}`)
                .then(() => {
                    alert("删除成功！")
                    this.dialogFormVisible = false
                })
                .catch(error => {
                    console.error('Error deleting resource:', error);
                });

        },
        mohu: function () {//模糊查询
            axios({
                url: '/api/danci',
                method: 'get',
                params: {
                    zhongwen: this.wenbenform.zhongwen,
                    riwen: this.wenbenform.riwen
                }
            }).then(res => {
                this.tableData = res.data.data
            }).catch(err => {
                console.log(err)
            })
        }, handleTransYuYin() {
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
        }, mounted() {
            
            // 首次加载时,需要调用一次
            this.screenWidth = window.innerWidth;
            this.setSize();
            // 窗口大小发生改变时,调用一次
            window.onresize = () => {
                this.screenWidth = window.innerWidth;
                this.setSize();
            };
            this.getdanci();
        }
    }
}

</script>

<style scope>
.router-link-active {
    text-decoration: none;
    color: rgb(20, 20, 20);
}

.speech-wrap .inseret-input {
    width: 400px;
}

a {
    text-decoration: none;
    color: rgb(12, 12, 12);
}


.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

img {
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
}
</style>