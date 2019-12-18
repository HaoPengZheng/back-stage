<template>
  <div>
    <a-button type="primary" @click="publish" style="margin-right:8px" :disabled="getAddLotteryFormDisable">发布</a-button>
    <div id="qrCode" ref="qrCodeDiv" style="margin:8px:0"></div>
    <a-button
      type="primary"
      :disabled="getAddLotteryCouldGoStep<1"
      @click="goLast"
      style="margin-right:8px;"
    >上一步</a-button>
  </div>
</template>

<script>
import cheerio from "cheerio";
import axios from "axios";
import QRCode from "qrcodejs2";
import { deleteAttach, addAttach } from "@/api/attach";
import { publishLottery } from "@/api/lottery";
import { mixinAddLotteryState } from "../mixin";
export default {
  mixins: [mixinAddLotteryState],
  created() {},
  watch:{
      lottery(){
          if(this.lottery.publish){
               this.bindQRCode(
                `http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Lottery&act=index&path=${this.lottery.publishLink}`
              );
          }
      }
  },
  methods: {
    goLast() {
      this.$store.commit("Add_Lottery_Go_Last");
    },
    publish() {
      let lotteryInfo = this.lottery;

      axios
        .get(
          "http://test.00800.com.cn/data/upload/lottery/template/template.html"
        )
        .then(res => {
          let $ = cheerio.load(res.data);
          this.generateWheel($, lotteryInfo);

          var blob = new Blob([$.html()]);
          var file = new File([blob], `${lotteryInfo.lotteryName}.html`, {
            type: "html",
            lastModified: Date.now()
          });
          var data = new FormData();
          data.append("module", "lottery");

          data.append("file", file);
          let publishLink;
          addAttach(data)
            .then(res => {
              publishLink = res.data.data.file_url;
              let data = {
                publishLink: publishLink
              };

              return publishLottery(this.lottery.id, data);
            })
            .then(res => {
              console.log(
                `http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Lottery&act=index&path=${publishLink}`
              );
              this.bindQRCode(
                `http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Lottery&act=index&path=${publishLink}`
              );
            });
        });
    },
    bindQRCode: function(url) {
        document.getElementById('qrCode').innerHTML = ''
      new QRCode(this.$refs.qrCodeDiv, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    generateQrCode(url) {
      this.bindQRCode(url);
    },
    //生成大转盘页面
    generateWheel($, lotteryInfo) {
      this.generateBackground($, lotteryInfo);
      this.generateVar($, lotteryInfo);
      this.generateTitle($, lotteryInfo.lotteryName);
      this.generateLotteryItem($, lotteryInfo.lotteryItems);
      this.generateLosingPrice($, lotteryInfo.losingPrize);
    },
    //生成页面所需要的变量
    generateVar($, lotteryInfo) {
      //奖项名
      let prizes = Object.keys(lotteryInfo.lotteryItems);
      //这里应该添加的是未中奖信息
      prizes.push("谢谢抽奖");
      //概率
      let probability = [];
      let host = "localhost:8089";
      let lotteryId = lotteryInfo.id;
      let mulitImg = Object.values(lotteryInfo.lotteryItems).map(
        lotteryItem => {
          return lotteryItem.smallIconPath;
        }
      );
      let smallIconMap = {};
      var script = $(`<script>  
            var lotteryInfo = ${JSON.stringify(lotteryInfo)}
            if(document.referrer.indexOf('v.00800.com.cn')<0){
                location.href = 'http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Lottery&act=index&lotteryId=lotteryInfo.id'
            }
            var prizes = ${JSON.stringify(prizes)}    
            //获取地址栏参数
            function getUrlParam(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURIComponent(r[2]); return null;
            }
            window.setInterval(() => {
                if ($('.turnplate').css('background-position') == '0% 100%') {
                    $('.turnplate').css('background-position', '0% 0%')
                } else {
                    $('.turnplate').css('background-position', '0% 100%')
                }

            }, 100)
        $(document).ready(function () {
            let promiseAll = [],
                img = [],
                mulitImg = ${JSON.stringify(mulitImg)},
                imgTotal = mulitImg.length

            for (let i = 0; i < imgTotal; i++) {
                promiseAll[i] = new Promise((resolve, reject) => {
                    img[i] = new Image()
                    img[i].src = mulitImg[i]
                    img[i].onload = function () {
                        console.log(\`第\$\{i\}张加载完成\`)
                        resolve(img[i])
                    }
                    img[i].onerror = function (err) {
                        //图片出错，设置默认地址
                        this.src = "默认图片地址"
                    }
                })
            }
            Promise.all(promiseAll).then((img) => {
                render()
                drawRouletteWheel()
            })

            //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
        });
        function showModal() {
            $('.modal_warp').css('display', 'block')
            $('#myModal').modal('show')
        }
        function hideModal() {
            $('.modal_warp').css('display', 'none')
            $('#myModal').modal('hide')
        }

showAwardView = function(awardImagePath,jumpLink) {
                var str = '';
                str += '<div class="bg-mask"></div>';
                str += '<div class="pop-cj">';
                str += '<div class="close" alt="关闭"></div>';
                str += '<img class ="link" style="width:100%;margin:0 auto" src="';
                str +=  awardImagePath;
                str += '" alt="结果">';
                str += '</div>';
                //禁用滚动条
                disableScrool(true);
                $('body').append(str);

                $('.pop-cj .link').bind('click', function() {
                    closePop()
                    if(jumpLink!=''&&jumpLink!=undefined&&jumpLink!=null){
                         location.href = jumpLink
                    }
                });
                

                //10秒后关闭
                //setTimeout(closePop, 10000);

                //绑定关闭抽奖结果按钮
                $('.pop-cj .close').bind('click', '.close', closePop);
            }

            disableScrool = function(flag) {
                if (flag) {
                    $('html').addClass('noscroll').on('touchmove', function(event) {
                        event.preventDefault();
                    });
                } else {
                    $('html').removeClass('noscroll').unbind('touchmove');
                }
            }
            //关闭弹窗
            closePop = function() {
                $('.bg-mask').remove();
                $('.pop-cj').remove();
                disableScrool(false);
                isRun = false;
            }


         var api = {
        lottery:function (){
            let data ={
                uid:getUrlParam('uid')
            }
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: 'http://${host}/lottery/${lotteryId}/draw',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/x-www-form-urlencoded',
                    data:data,
                    success: function (msg) {
                        resolve(msg);
                    },
                    error: function (e) {
                        reject(e);
                    },
                    complete: function () {

                    }
                    })
                })
            },
        }

        var data = {
            lotteryId: '${lotteryId}',//写死的,
            uid: getUrlParam('uid'),
        }

        var turnplate = {
            restaraunts: [],				//大转盘奖品名称
            colors: [],					//大转盘奖品区块对应背景颜色
            outsideRadius: 188,			//大转盘外圆的半径
            textRadius: 155,				//大转盘奖品位置距离圆心的距离
            insideRadius: 65,			//大转盘内圆的半径
            startAngle: 0,				//开始角度
            bRotate: false				//false:停止;ture:旋转
        };

        var render = function () {
            //动态添加大转盘的奖品与奖品区域背景颜色
            turnplate.restaraunts = ${JSON.stringify(prizes)} 
            turnplate.colors = ["#fae3b0", "#e85958", "#FFFFFF", "#fae3b0", "#e85958", "#FFFFFF", "#fae3b0", "#e85958", "#FFFFFF", "#fae3b0", "#e85958", "#FFFFFF"];
            var rotateTimeOut = function () {
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: 2160,
                    duration: 8000,
                    callback: function () {
                        alert('网络超时，请检查您的网络设置！');
                    }
                });
            };

            //旋转转盘 item:奖品位置; txt：提示语;
            var rotateFn = function (item, txt ,prize) {
                var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
                if (angles < 270) {
                    angles = 270 - angles;
                } else {
                    angles = 360 - angles + 270;
                }
                $('#wheelcanvas').stopRotate();
                $('.pointer').unbind('click')
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: angles + 1800,
                    duration: 8000,
                    callback: function () {
                        //中奖提示
                        $('.pointer').bind('click', handlerPointerClick)
                        var prizeName = txt;
                        showAwardView(prize.awardImagePath,prize.jumpLink)
                        turnplate.bRotate = !turnplate.bRotate;
                    }
                });
            };
            var handlerPointerClick = function () {
                
                let startTime = new Date(lotteryInfo.startTime);
                let endTime = new Date(lotteryInfo.endTime);
                let now = new Date();
                if(now<startTime){

                    alert("抽奖活动还没开始！");
                    return;
                }
                if(now>endTime){
                    alert("抽奖活动已经结束！");
                    return ;
                }

                
                if (turnplate.bRotate) return;
                    turnplate.bRotate = !turnplate.bRotate;
                    //获取随机数(奖品个数范围内)
                    api.lottery().then(res => {
                        let prize = res.data
                        var item = prize.lotteryItemName
                        var index = turnplate.restaraunts.indexOf(item)
                        
                        if(index==-1){
                            index = turnplate.restaraunts.length-1
                        }
                        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                        rotateFn(index+1, turnplate.restaraunts[index],prize);
                    }).catch(err=>{
                        turnplate.bRotate = false
                        alert(JSON.parse(err.responseText).msg)
                    })

            };
            $('.pointer').bind('click', handlerPointerClick)

        }
        function rnd(n, m) {

            n = 1;//最小随机数
            m = 100;//最大随机数（概率范围最大值）
            //最大数数不超过最大随机数
            var ransluck = probability;//概率为比自己小的第一个数之间的差
            var randoms = Math.floor(Math.random() * (m - n + 1) + n);
            if (randoms <= ransluck[0]) {
                var random = 1;
            }
            else if (randoms <= ransluck[1]) {
                var random = 2;
            }
            else if (randoms <= ransluck[2]) {
                var random = 3;
            }
            else if (randoms <= ransluck[3]) {
                var random = 4;
            }
            else if (randoms <= ransluck[4]) {
                var random = 5;
            }
            else if (randoms <= ransluck[5]) {
                var random = 6;
            }
            else if (randoms <= ransluck[6]) {
                var random = 7;
            }
            else if (randoms <= ransluck[7]) {
                var random = 8;
            }
            else if (randoms <= ransluck[8]) {
                var random = 9;
            }
            else if (randoms <= ransluck[9]) {
                var random = 10;
            }
            return random;

        }

        function getPixelRatio(context) {
            var backingStore = context.backingStorePixelRatio
                || context.webkitBackingStorePixelRatio
                || context.mozBackingStorePixelRatio
                || context.msBackingStorePixelRatio
                || context.oBackingStorePixelRatio
                || context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;

        };


        function drawRouletteWheel() {
            var canvas = document.getElementById("wheelcanvas");
            var ctx = canvas.getContext('2d');
            var ratio = getPixelRatio(ctx);
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422 * ratio, 422 * ratio);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for (var i = 0; i < turnplate.restaraunts.length; i++) {
                    var angle = turnplate.startAngle + i * arc;
                    ctx.fillStyle = turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();

                    //----绘制奖品开始----
                    ctx.fillStyle = "#000";
                    var text = turnplate.restaraunts[i];
                    var tempText = turnplate.restaraunts[i];
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);

                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf("M") > 0) {
                        //流量包
                        var texts = text.split("M");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.font = j == 0 ? 'bold 1.5rem Microsoft YaHei' : '16px Microsoft YaHei';
                            if (j == 0) {
                                ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                            } else {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        }
                    } else if (text.indexOf("M") == -1 && text.length > 6) {
                        //奖品名称长度超过一定范围
                        text = text.substring(0, 6) + "||" + text.substring(6);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {

                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }

                    if(lotteryInfo.lotteryItems[tempText]!=null){
                        let tempLotteryItems = Object.values(lotteryInfo.lotteryItems);
                        if (tempLotteryItems instanceof Array) {
                            tempLotteryItems.forEach((lotteryItem, index) => {
                                if(lotteryItem.lotteryItemName==tempText){
                                    var img = document.getElementById(\`lotteryItem-icon-\$\{index\}\`);
                                    img.onload = function () {
                                        ctx.drawImage(img, -15, 25);
                                    };
                                    ctx.drawImage(img, -15, 25);
                                }
                            
                            });
                        }
                    }else{
                         var img = document.getElementById('losingPrice-icon');
                        img.onload = function () {
                            ctx.drawImage(img, -15, 25);
                        };
                        ctx.drawImage(img, -15, 25);
                    }

                    //把当前画布返回（调整）到上一个save()状态之前
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
        }
        drawRouletteWheel()
                <\/script>`);
      $("body").append(script);
    },
    //生成页面title
    generateTitle($, title) {
      $("title").html(title);
    },
    generateLotteryItem($, lotteryItems) {

      let tempLotteryItems = Object.values(lotteryItems);
      if (tempLotteryItems instanceof Array) {
        tempLotteryItems.forEach((lotteryItem, index) => {
          $(".content").append(
            `<img src="${lotteryItem.smallIconPath}" id="lotteryItem-icon-${index}" style="display:none;" />`
          );
        });
      }
    },
    generateLosingPrice($, losingPrice) {
      $(".content").append(
        `<img src="${losingPrice.smallIconPath}" id="losingPrice-icon" style="display:none;" />`
      );
    },
    generateBackground($, lotteryInfo) {
      $("body").prepend(
        `<img src="${lotteryInfo.backgroundImagePath}" id="bg-img" style="width: 100%" />`
      );
    },
    downloadHtml(str) {
      // 字符内容转变成blob地址
      var blob = new Blob([str]);
      var eleLink = document.createElement("a");
      eleLink.download = "text.html";
      eleLink.style.display = "none";
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    }
  }
};
</script>

<style>
</style>