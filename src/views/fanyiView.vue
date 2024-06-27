<template>
  <div class="container">
    <h1 class="title">中日文互相翻译</h1>
    <textarea v-model="inputText" placeholder="在这里输入文本~"></textarea>
    <div class="buttons">
      <button @click="translate('zh')">中文翻译为日文</button>
      <button @click="translate('ja')">日文翻译为中文</button>
    </div>
    <textarea v-model="outputText" placeholder="翻译结果将显示在这里o" readonly></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      outputText: ''
    };
  },
  methods: {
    async translate(targetLanguage) {
      try {
        let translation = '';
        if (targetLanguage === 'zh') {
          // 中文翻译为日文
          translation = await this.translateText(this.inputText, 'zh-CN', 'ja');
        } else if (targetLanguage === 'ja') {
          // 日文翻译为中文
          translation = await this.translateText(this.inputText, 'ja', 'zh-CN');
        }
        this.outputText = translation;
      } catch (error) {
        console.error('翻译出错:', error);
        alert('翻译出错，请重试！');
      }
    },
    async translateText(text, sourceLang, targetLang) {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0][0][0];
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

.buttons {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

</style>
