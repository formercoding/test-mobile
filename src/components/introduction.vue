<template>
    <div class="intro" ref="flexWrap">
        <div class="banner-wrap">
            <h1 class="title" :style="colorTitle">{{gameBase.name}}</h1>
            <img class="banner" :src="gameBase.image">
        </div>
        <div class="desc">
            <p class="title" :style="txtStyle">你是西游记中的谁</p>
            <div class="gif-wrap" :style="txtStyle">
                <img class="gif" :src="images.I007">
            </div>
            <p class="txt" :style="txtStyle">{{gameBase.description}}</p>
        </div>
        <div class="start-wrap">
            <audio  ref="audio" 
                    :src="theme.sounds.S002">
                    亲 您的浏览器不支持html5的audio标签
            </audio>
            <img class="start" :src="images.I004" @click="start">
        </div>
    </div>
</template>
<script>
import Hammer from 'hammerjs'

export default {
    props: {
        gameData: Object,
        theme: Object
    },

    data() {
        return {
           gameBase: this.gameData.gameBase, // 基础设置
           images: this.theme.images, // 图片地址
           txtColor: this.theme.texts.color, // 文字颜色
        }
    },

    computed: {
        // 标题颜色
        colorTitle() {
            return {
                color: this.txtColor.T001
            }
        },

        // 文字颜色
        colorTxt() {
            return {
                color: this.txtColor.T002
            }
        },

        // 底部加文字颜色样式
        txtStyle() {
            return {
                color: this.txtColor.T002,
                borderBottom: `1px dashed ${this.txtColor.T004}`
            }
        },
    },

    methods: {
        // 开始测试 点击音效 + 切换路由
        start() {
            let _this = this;

            // 点击音效
            _this.$refs.audio.play();

            // 切换路由 延迟等待音效
            setTimeout(()=> {
                _this.$router.push('question');
            }, 500);
            
        },

        /**
         * 背景图片地址
         * @param {String} url 图片地址
         * @return {Object} 背景对象
         */
        imgBg(url) {
            return {
                backgroundImage: `url(${url})`
            }
        }
    },

    mounted() {
        let _this = this,
            box = _this.$refs.flexWrap,
            hammer = new Hammer(box, {});

        hammer.on('swipeleft', () => {
            _this.$router.push('question');
        });

        // 小尾巴
        // loadAdIdouzi({
        //     "width": "100%",
        //     "height": "10vw",
        // }, "advertising", {
        //     placementType: "比记忆游戏",
        //     supplierId: dataBase.supplierId, // 商家ID
        //     flag: dataBase.flag, // 
        //     eventId: _this.getQueryString('eventId') // 活动ID
        // });

    }
}
</script>
<style lang="less" scoped>
     @import "../assets/less/common.less";
    .intro {
        width: 7.5rem;
        padding: 1.58rem .55rem 0 .55rem;

        /* banner */
        .banner-wrap {
            padding: 0 0 1.6rem 0;
            font-size: 0;
            
            .title {
                font-size: .56rem;
            }

            .banner {
                display: block;
                width: 6.4rem;
                margin-top: .8rem;
            }
        }

        .desc {
            text-align: justify;
            font-size: .32rem;
            line-height: .66rem;

            .title {
                text-align: left;
            }

            .gif-wrap {
                height: .66rem;
                text-align: left;
                font-size: 0;
                .gif {
                    height: .66rem;
                }
            }

            .txt {
                display: inline;
                padding-bottom: .1rem;
            }
        }

        .start-wrap {
            padding: 1.02rem 0;
            text-align: center;

            .start {
                width: 3.67rem;
            }
        }
    }

</style>


