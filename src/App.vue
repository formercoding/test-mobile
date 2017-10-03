<template>
    <div id="app" :style="noScroll">
        <div class="loading-page" v-show="loading">
            <img class="pic" :src="theme.images.I010">
            <div class="close" @click="loading = false">{{restTime}}</div>
        </div>
        <div class="wrap" :style="imgBg(theme.images.I002)">
            <div class="music-wrap flex" v-if="isMusic">
                <audio ref="audio" 
                    :src="theme.sounds.S001" 
                    loop="loop"
                    autoplay="autoplay">
                    亲 您的浏览器不支持html5的audio标签
                </audio>
                <div class="music icon" :style="musicBg" @click="switchSound"></div>
            </div>
            <router-view :gameData="gameData"
                         :isMusic.sync="isMusic"
                         :theme="theme">
            </router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            isPlay: true, // 是否开启音乐
            isMusic: true, // 是否有音乐
            loading: true, // 处于加载状态
            restTime: 3, // 剩余loading时间
            theme: { // 游戏主题
                images: {
                    I001: './static/播放-min.png', // 音乐背景
                    I002: './static/bg01-min.png', // 页面背景图片
                    I003: './static/停止播放-min.png', // 音乐关闭后背景图标
                    I004: './static/首页-btn.gif', // 开始测试按钮图片
                    I005: './static/U_option-min.png', // 选项背景
                    I006: './static/BG3-min.png', // 问答页底部背景
                    I007: './static/wwew.gif', // 进度gif
                    I008: './static/btn-min.png', // 重新测试图片
                    I009: './static/btn-active.png', // 选项被选中
                    I010: './static/loading.png' // 背景图
                },
                texts: {
                    color: {
                      T001: '#000', // 标题颜色
                      T002: '#000', // 内容颜色
                      T003: '#fff', // 问题选项颜色
                      T004: '#4A4A4a' // 底部虚线颜色
                    }
                },
                sounds: {
                    S001: 'http://static-10006892.file.myqcloud.com/test_game/media/bgsound.mp3', // 背景音乐
                    S002: 'http://static-10006892.file.myqcloud.com/test_game/media/click.mp3', // 点击音效
                },
            },

            // 游戏数据
            gameData: {
                qrcodeUrl: 'www.baidu.com', // 分享二维码

                // 游戏设置
                gameBase: {
                    description: `作为中国四
                大名著小说之一，无论是原著小说，还说衍生出的
                影视动画，西游记早已是家喻户晓。西游记中的唐
                僧师徒一行人，性格各异，特色鲜明。你会是师徒
                四人里的谁呢？`, // 游戏简介做多500个字符
                    image: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 游戏简介图片地址
                    keyword: '共享测试游戏', // 关键字
                    name: '你是西游记中的谁', // 游戏标题最多12个字符
                    share: { // 分享的设置
                        shareConfig: { // 分享设置
                            shareContent: '姜青铜', // 分享描述
                            shareImage: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 分享图片地址
                            shareTitle: '玩游戏啦', // 分享标题
                        },
                        shareType: 'true' // 是否自定义分享
                    } 
                },

                // 设置游戏问题
                gameQuestions: [{
                        question: { // 问题文字描述
                            image: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 问题图片地址
                            name: '你是不是傻0', // 问题描述
                        },
                        options: [ // 问题选项数组
                            {
                                name: '是傻是傻是傻是傻是傻', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 1
                                }
                            }, {
                                name: '不傻', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 1
                                }
                            },  {
                                name: '不傻', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 1
                                }
                            },  {
                                name: '不傻', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 1
                                }
                            }
                        ]
                    }, {
                        question: { // 问题文字描述
                            image: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 问题图片地址
                            name: '你还记得最后唐僧取得经书回程时，那只驼他们过河的乌龟为何会发怒吗？会发怒吗？发怒吗？怒吗？吗？', // 问题描述
                        }, 
                        options: [ // 问题选项数组
                            {
                                name: '傻哦', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 0
                                }
                            }, {
                                name: '不傻哦', // 答案文字描述
                                target: {
                                    type: 0,
                                    issueOrResultId: 0
                                }
                            }, {
                                name: '不傻哦', // 答案文字描述
                                target: {
                                    type: 1,
                                    issueOrResultId: 1
                                }
                            }, {
                                name: '不傻哦', // 答案文字描述
                                target: {
                                    type: 1,
                                    issueOrResultId: 0
                                }
                            }
                        ] 
                    }
                ],

                // 设置游戏结果
                gameResults: [
                    {
                        _id: 0, // 测试结果序号
                        content: `八戒生性懒惰，又好色、贪吃，时常被孙悟空骂作“呆子”。其实这个“呆子”并不呆，
                        在危机时刻他总是能想出好点子来化解危机，也懂得施展甜言蜜语让孙悟空为他办了事还能沾沾自喜。
                        总结：象猪八戒的人其实是秀外慧中的，除了好色之外，基本上是个很可爱，很讨人喜欢的类型。这样
                        的人善良、大度，与世无争，偶尔小小的犯傻也会让人觉得非常真实可爱。`, // 测试结果描述
                        image: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 测试结果图片地址
                        name: 'wo是姜青铜', // 测试结果标题
                    }, {
                        _id: 0, // 测试结果序号
                        content: `八戒生性懒惰，又好色、贪吃，时常被孙悟空骂作“呆子”。其实这个“呆子”并不呆，
                        在危机时刻他总是能想出好点子来化解危机，也懂得施展甜言蜜语让孙悟空为他办了事还能沾沾自喜。
                        总结：象猪八戒的人其实是秀外慧中的，除了好色之外，基本上是个很可爱，很讨人喜欢的类型。这样
                        的人善良、大度，与世无争，偶尔小小的犯傻也会让人觉得非常真实可爱。`, // 测试结果描述
                        image: 'http://bbs.cguse.com/attachments/month_1004/1004241424c162021c314fa9c0.jpg', // 测试结果图片地址
                        name: '你是姜青铜', // 测试结果标题
                    }
                ]
            }
        }
    },

    computed: {
        noScroll() {
            if(this.loading) {
                return {
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden'
                }
            } else {
                return {
                    width: '100vw'
                }
            }
        },

        // 音乐背景
        musicBg() {
            let _this = this,
            images = _this.theme.images;

            return this.isPlay ? {backgroundImage: `url(${images.I001})`} : 
            {backgroundImage: `url(${images.I003})`};
        }
    },

    created() {

        // 广告倒计时
        this.loadFunc();
    },

    methods: {
        // 音乐开关
        switchSound() {
            let _this = this;

            if(!_this.$refs.audio.paused) {
                _this.isPlay = false;
                _this.$refs.audio.pause(); // 关闭
            } else {
                _this.$refs.audio.play(); // 开启
                _this.isPlay = true;
            }
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
        },

        /* loading 函数 */
        loadFunc() {
            let _this = this;

            // loading倒计时
            let timer = setInterval(() => {

                // 时间到退出loding状态
                if(_this.restTime === 0) {
                    clearInterval(timer);
                    _this.loading = false;
                } else{
                    _this.restTime--;
                }
            }, 1000);
        },

        /*
         * 设置微信分享
         * param {Object} data 返回的对象
         */
        setShareConf(data) {
            let _this     = this,
                config    = _this.jsSdkConf,
                shareConf = _this.wxShareInfo;

            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timestamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'hideMenuItems'
                ]
            });

            wx.ready(() => {
                let shareOpts = {
                    title: shareConf.shareTitle,
                    desc: shareConf.shareContent,
                    imgUrl: shareConf.shareImage,
                    link: config.shareUrl
                };

                wx.hideMenuItems({
                    menuList: [
                        'menuItem:copyUrl',
                        'menuItem:openWithQQBrowser',
                        'menuItem:share:email',
                        'menuItem:openWithSafari'
                    ]
                });

                wx.onMenuShareTimeline(shareOpts); // 分享到朋友圈
                wx.onMenuShareAppMessage(shareOpts); // 分享给朋友
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import "./assets/less/common.less";

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    font-size: .32rem;

    /* 加载页 */
    .loading-page {
        position: relative;
        z-index: 20;

        .pic {
            width: 100vw;
            height: 100vh;
            z-index: 100;
        }

        .close {
            position: absolute;
            right: .44rem;
            top: .44rem;
            width: .64rem;
            height: .64rem;
            text-align: center;
            line-height: .64rem;
            font-size: .32rem;
            color: #fff;
            border-radius: 50%;
            background: rgba(0, 0, 0, .1);
        }
    }

    /* 游戏公共背景 音乐 */
    .wrap {
        background-repeat: repeat;

        /* 音乐图标 */
        @keyframes rotate { /* 旋转动画 */
            from {transform:rotate(0);}
            to {transform: rotate(-360deg);}
        }
        .music-wrap {
            position: absolute;
            top: .44rem;
            right: .44rem;
            z-index: 10;
            justify-content: flex-end;
            
            .music {
                width: .64rem;
                height: .64rem;
                background-size: contain;
                animation: rotate 10s linear infinite;

            }
        }

    }

}
</style>
