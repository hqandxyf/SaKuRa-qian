<template>
  <div>
    <el-input v-model="input1" :placeholder="placeholder" prefix-icon="el-icon-search"
      style="width: 350px;margin-right: 10px" @clear="search"></el-input>
    <el-button icon="el-icon-search" type="primary" @click="mohu" size="mini">
      搜索
    </el-button>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-container>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="id" label="序号" width="50"></el-table-column>
            <el-table-column prop="zhongwen" label="中文" width="140"></el-table-column>
            <el-table-column prop="riwen" label="日文" width="200"></el-table-column>
            <el-table-column prop="liju" label="例句" width="320"></el-table-column>
            <el-table-column prop="lijujieshi" label="例句解释" width="260"></el-table-column>
          </el-table>

          <div>
            <el-input class="inseret-input" clearable placeholder="请输入内容" v-model="input"
              style="width: 350px;margin-right: 10px"></el-input>
            <el-button slot="append" @click="handleTransYuYin" icon="el-icon-microphone">朗读</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入想要查询的单词...'
    }
  },
  data() {
    return {
      input: '',
      input1: '',
      voinceValue: 10,
      yusu: 0.7,
      selectVal: 'ja-JP',
      dialogFormVisible: false,
      tableData: [],

    }
  }, methods: {
    mohu: function () {//模糊查询
      axios({
        url: '/api/danci',
        method: 'get',
        params: {
          zhongwen: this.input1,
          riwen: this.input1
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
    }
  }
}
</script>

<style></style>