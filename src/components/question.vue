<template>
    <div class="question flex-col"
         ref="itemWrap">
        <div class="item-wrap flex"
             :style="slideW">
            <div class="scroll-wrap" v-for="item in curQues" :key="item" v-bar> 
                <div class="item">
                    <!-- 题目描述 -->
                    <div class="desc">
                        <div class="txt">
                            {{`Q${(item + 1)}、${gameQuestions[item].question.name}`}}
                        </div>
                        <img class="pic" :src="gameQuestions[item].question.image">
                    </div>
                    <!-- 问题选项 -->
                    <div class="opts">
                        <div class="opt flex" 
                            v-for="(opt, index) in gameQuestions[item].options" 
                            :key="opt.name">
                            <div class="handler flex-mid-center"
                                :style="handlerBg"
                                @click="slideToR($event, opt.target.type, opt.target.issueOrResultId)">
                                <div class="order">{{optOrder(index)}}</div>
                            </div>
                            <div class="txt">
                                {{opt.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer flex">
            <img class="pic" :src="images.I006" :style="border">
            <img class="gif" :src="images.I007">
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
            gameQuestions: this.gameData.gameQuestions, // 问题集合
            images: this.theme.images, // 图片地址
            txtColor: this.theme.texts.color, // 文字颜色
            curQues: [ // 当前已答问题
                0
            ],
            curQ: 0 // 当前问题在问题数组中的索引
        }
    },

    computed: {
        // 问题容器宽度 根据问题数目计算
        slideW() {
            return {
                color: this.txtColor.T002,
                width: this.curQues.length * 100 + 'vw',
                transform: `translateX(-${(this.curQ) * 100}vw)`
            }
        },

        // 选项背景
        handlerBg() {
            return {
                backgroundImage: `url(${this.images.I005})`,
                color: this.txtColor.T003
            }
        },

        // 底部虚线
        border() {
            return {
                borderBottom: `1px dashed ${this.txtColor.T004}`
            }
        }
    },

    methods: {
        /**
         * 返回选项对应的ABCD
         * @param {Number} index 选项序号 
         * @return {String} ABCD
         */
        optOrder(index) {
            let txt = ['A', 'B', 'C', 'D'];
            return txt[index];
        },

        /**
         * 选择答案跳转
         * @param {Object} event 事件对象
         * @param {Number} type 跳转类型 0 问题 1 答案
         * @param {Number} index 跳转索引 
         */
        slideToR(event, type, index) {
            let _this = this,
                target = event.currentTarget;
            // 跳转判断
            if(type === 0) {  // 0 => 问题
                target.style.backgroundImage = `url(${_this.images.I009})`;

                // 短暂延迟
                setTimeout(() => {
                    _this.curQues.push(index);  // 推入下一题
                    _this.curQ++; // 当前问题加 1
                    target.style.backgroundImage = `url(${_this.images.I005})`;

                    // 恢复顶端
                    _this.scrollToTop();
                }, 500);
                
            } else {
                // 清空问题队列
                _this.curQues = [0];  
                _this.curQ = 0;
                // 跳转至答案
                let target = index;
                _this.$router.push(`result/${target}`);
            }
        },

        // 将所有问题滚动置顶
        scrollToTop() {
            let items = document.querySelectorAll('.item');

            items.forEach((item) => {
                item.scrollTop = 0;
            });
        }
    },

    mounted() {
        let _this = this,
            box = _this.$refs.itemWrap,
            hammer = new Hammer(box, {});

        // 左滑
        hammer.on('swiperight', () => {

            if(_this.curQ === 0) {
                _this.$router.push('introduction');
            } else {
                _this.curQ--;
                _this.curQues.pop();
            }
        });
    }
}
</script>
<style lang="less">
    @import '../assets/less/common.less';
    .question {
        justify-content: space-between;
        height: 100vh;
        text-align: left;
        font-size: .4rem;
        line-height: .64rem;
        overflow-x: hidden;

        .item-wrap {
            margin-top: 1.22rem;
            transition: transform 0.2s linear;

            .scroll-wrap {
                /* 单个问题 */
                width: 100vw;

                .item {
                    width: 100vw;
                    padding: 0 .72rem 0 .72rem;
                    padding-right: .72rem !important;
                    box-sizing: border-box !important;
                    
                    /* 问题描述 */
                    .desc {
                        padding-bottom: .15rem;

                        .pic {
                            display: block;
                            width: 100%;
                            margin-top: .15rem;
                            font-size: 0;
                        }
                    }

                    /* 问题选项 */
                    .opts {
                        .opt {
                            align-items: center;
                            margin-top: .3rem;
                            font-size: .36rem;

                            .handler {
                                width: 1rem;
                                height: 1rem;
                                font-size: .64rem;
                                background-size: contain;
                                background-position: center center;
                                background-repeat: no-repeat;
                            }
                        }

                        .txt {
                            margin-left: .3rem;
                        }
                    }
                }
            }
        }

        /* 底部背景 */
        .footer {
            flex-shrink: 0;
            align-items: bottom;
            position: relative;
            height: 1rem;
            margin: .35rem 0 1.63rem 0;
            overflow: hidden;

            .pic {
                width: 7.5rem;
            }

            .gif {
                position: absolute;
                left: 1rem;
                bottom: 0;
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>


