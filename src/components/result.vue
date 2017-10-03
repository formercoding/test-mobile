<template>
    <div class="result">
        <div class="share">
            <v-qrcode class="pic" :value="qrcode" :size="parseInt(120 * ratio)"></v-qrcode>
            <div class="txt flex-col">
                <span class="txt-top">更多精彩</span>
                <span class="txt-bot">长按二维码</span>
            </div>
        </div>
        <div class="desc">
            <div class="msg" :style="color(txtColor.T002)">结果为：</div>
            <h1 class="title" :style="color(txtColor.T001)">{{result.name}}</h1>
            <img class="pic" :src="result.image">
            <div class="split" :style="bgColor(txtColor.T002)"></div>
            <div class="txt" :style="color(txtColor.T002)">{{result.content}}</div>
        </div>
        <router-link to="/introduction" class="restart-wrap flex" >
            <img class="restart" :src="images.I008">
        </router-link>
    </div>
</template>
<script>
import vQrcode from 'qrcode.vue'
export default {
    props: {
        isMusic: {
            type: Boolean,
            default: true,
        },
        gameData: Object,
        theme: Object
    },

    data() {
        let ratio = window.innerWidth / 750;
        return {
            ratio: ratio, // px实际倍率
            qrcode: this.gameData.qrcodeUrl, // 二维码链接
            gameResults: this.gameData.gameResults, // 答案集合
            images: this.theme.images, // 图片地址
            txtColor: this.theme.texts.color, // 文字颜色
            curR: this.$route.params.id // 当前结果索引
        }
    },

    computed: {
        result() {
            return this.gameResults[this.curR];
        },
    },

    created() {
        // this.closeMusic();
    },

    methods: {
        // 关闭音乐
        closeMusic() {
            this.$emit('update:isMusic', false);
        },

        /**
         * 文字颜色
         * @param {String} color 颜色值 
         */
        color(color) {
            return {
                color: color
            }
        },

        /**
         * 背景颜色
         * @param {String} color 颜色值 
         */
        bgColor(color) {
            return {
                backgroundColor: color
            }
        }
    },

    components: {
        vQrcode
    }
}
</script>
<style lang="less" scoped>
    @import '../assets/less/common.less';
    .result {
        width: 100vw;

        /* 分享二维码 */
        .share {
            display: flex;
            align-items: center;
            height: 1.6rem;
            background: #000;

            .pic {
                margin-left: 1.1rem;
                font-size: 0;
            } 

            .txt {
                height: .96rem;
                align-items: flex-start;
                justify-content: space-between;
                margin-left: .3rem;
                font-size: .24rem;
                color: #fff;
                line-height: .48rem;
            }
        }

        /* 答案描述 */
        .desc {
            padding: .48rem .75rem .8rem .75rem;

            .msg {
                text-align: center;
                font-size: .32rem;
                line-height: .45rem;
            }

            .title {
                margin-top: .32rem;
                text-align: center;
                font-size: .64rem;
                line-height: .9rem;
            }

            .pic {
                display: block;
                width: 6rem;
                margin-top: .4rem;
                font-size: 0;
            }
            
            .split {
                width: .6rem;
                height: .1rem;
                margin-top: .4rem;
            }

            .txt {
                margin-top: .2rem;
                text-align: justify;
                font-size: .28rem;
                line-height: .45rem;
            }
        }

        /* 重新测试 */
        .restart-wrap {
            justify-content: center;
            padding-bottom: 1.57rem;

            .restart {
                width: 3.6rem;
                height: .88rem;
            }
        }

    }
</style>


