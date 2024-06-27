<template>
    <div>
        <h1 style="color:slategrey; text-align: center;">几首经典音乐</h1>
        <img src="https://pic4.zhimg.com/80/v2-c5e1b8bf7f642f4560922d1b7acccf53_1440w.webp" width="200" />
        <button class="butt" @click="openaudio">千里千寻</button>
        <audio ref="audio" class="Audio">
            <source src="../assets/yinyue/qianliqianxun.mp3" />
        </audio>

        <img src="https://pic4.zhimg.com/80/v2-e81c476f5a7f2172a050e3784add56f3_1440w.webp" width="400" height="219" />
        <button class="butt" @click="haizei">海贼王</button>
        <audio ref="audio" class="Audio">
            <source src="../assets/yinyue/haizeiwang.mp3" />
        </audio>

        <img src="../assets/tupian/OIP-C.jpg" width="400" />
        <button class="butt" @click="dongjing">东京爱情</button>
        <audio ref="audio" class="Audio">
            <source src="../assets/yinyue/dongjing.mp3"/>
        </audio>

        <img src="https://pic2.zhimg.com/80/v2-58940f31a6952ef0237ca93e3fff11e9_1440w.webp" width="400" height="275" />
        <button class="butt" @click="longzhu">龙珠</button>
        <audio ref="audio" class="Audio">
            <source src="../assets/yinyue/longzhu.mp3" />
        </audio>
        <h1>更多音乐请前往</h1>
        <el-button type="primary" @click="qq">qq音乐</el-button>
        <el-button type="danger" @click="wy">网易云音乐</el-button>
        <h1>累了看会日剧or动漫</h1>
        <el-button type="primary" @click="dj" round>东京爱情故事</el-button>
        <el-button type="primary" @click="qx" round>千与千寻</el-button>
        <el-button type="primary" @click="ys" round>月色真美</el-button>
        <el-button type="primary" @click="gd" round>想看更多？点击前往</el-button>
    </div>
</template>

<script>


export default {
    data() {
        return {

        };
    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Audio",
    components: {},
    methods: {
        openaudio() {
            let music1 = new Audio();
            music1 = require("../assets/yinyue/qianliqianxun.mp3");
            this.$refs.audio.src = music1;
            this.$refs.audio.play();
        },
        haizei() {
            let music2 = new Audio();
            music2 = require("../assets/yinyue/haizeiwang.mp3");
            this.$refs.audio.src = music2;
            this.$refs.audio.play();
        }, dongjing() {
            let music3 = new Audio();
            music3 = require("../assets/yinyue/dongjing.mp3");
            this.$refs.audio.src = music3;
            this.$refs.audio.play();
        }, longzhu() {
            let music4 = new Audio();
            music4 = require("../assets/yinyue/longzhu.mp3");
            this.$refs.audio.src = music4;
            this.$refs.audio.play();
        }, qq() {
            window.open("https://y.qq.com/");
        }, wy() {
            window.open("https://music.163.com/");
        }, dj() {
            window.open("https://www.kanjuw.net/detail/?53094.html");
        }, qx() {
            window.open("https://www.kanjuw.net/search.php?searchword=%E5%8D%83%E4%B8%8E%E5%8D%83%E5%AF%BB");
        }, ys() {
            window.open("https://www.kanjuw.net/search.php?searchword=%E6%9C%88%E8%89%B2%E7%9C%9F%E7%BE%8E");
        }, gd() {
            window.open("https://www.kanjuw.net/");
        }
    }
}
</script>

<style scoped>
.butt:hover {
    background: rgb(41, 29, 170);
}

/* img {
    width: 100%;
    height: inherit;
} */
</style>