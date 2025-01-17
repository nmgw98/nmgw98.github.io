const HTANDROID = "https://nqxhbdl.doido123.com/shidai/buyushidai.apk"; // Android
//const HTIOS = ""; // iOS
const HTIOS = "itms-services://?action=download-manifest&url=https://nqxhbdl.doido123.com/shidai/shidai.plist"; // iOS
// 是否显示底部
const ShowFooter = true;

var P1 = '';
var P2 = '';
var P3 = '';
var P4 = '';

// 底部内容
if (ShowFooter) {
    P1 = '健康游戏忠告：抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防上当受骗';
    P2 = '适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。';
    P3 = '鄂ICP备12014712号 | 互联网文化经营单位';
    P4 = 'Copyright©2011-2020 郎来科技 版权所有';
}


// const PChar = "健康游戏忠告：抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防上当受骗 \n 适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。\n 沪ICP备*******号-1 | 互联网文化经营单位 \n Copyright©2011-2020 **** 版权所有";

const CONFIGREGION = [
    "河南",
    "河北",
    "山西",
    "辽宁",
    "吉林",
    "黑龙江",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "广东",
    "湖南",
    "海南",
    "四川",
    "贵州",
    "云南",
    "陕西",
    "甘肃",
    "内蒙古",
    "青海",
    "北京",
    "上海",
    "天津",
    "宁夏",
    "重庆",
    "广西",
    "西藏",
    "新疆",
    "香港",
    "澳门",
    "台湾"
]; // 省份（直辖市、自治区、省）

function getUserIP(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.ipify.org?format=json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var ipData = JSON.parse(xhr.responseText);
                callback(ipData);
            }
        }
    };
    xhr.send();
}

// 使用方法
getUserIP(function (ipData) {

    //if (!(ipData && ipData.ip)) {
      //  show404();
      //  return;
    // }
    // console.log('IP Address: ' + ipData.ip);
    //getDataByIp(ipData.ip);
});

function show404() {
    window.location.href = './404.html';
}

function getDataByIp(ip) {
	// showBg();
	return;
    fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("data:", data);
                console.log("success");
                if (CONFIGREGION.indexOf(data.regionName) == -1) {
                    if (CONFIGREGION.indexOf(data.country) != -1) {
                        showBg();
                        return;
                    }
                    show404();
                } else {
                    showBg();
                }
            } else {
                console.log("fail");
                show404();
            }
        })
        .catch(error => {
            console.error("Error fetching data by IP: ", error);
            show404();
        });
}

function showBg() {
    $('.bysdmask').hide();
    $('.showbg').show();
    if (ShowFooter) {
        $("#swiper").css("top", "58%");
        $('.showshow').show();
        $('.footer').show();
        $('#p1').text(P1);
        $('#p2').text(P2);
        $('#p3').text(P3);
        $('#p4').text(P4);
    } else {
        $("#swiper").css("top", "66%");
        $('.showshow').hide();
        $('.footer').hide();
    }
    new BScroll('.wrapper', {
        scrollX: true,
        scrollY: false,
        snap: { // 滑动切换的一些配置
            speed: 800, // 滑动切换的速度
            easing: { // 滑动切换的动画效果
                style: 'ease-in'
            },
            threshold: 0.05, // 滑动切换到超过一半时切换到下一屏
            stepX: 300, // 横向切换距离为轮播图宽度
        }
    });
}

wechatOrQQBrowser();

const $btnDown = $('#download');
$btnDown.click(function () {
	 deviceType();
});

$('.bysdmask').click(function () {
    showBg();
});

function wechatOrQQBrowser() {
    const ua = window.navigator.userAgent.toLocaleLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/ QQ\//i) == " qq\/") {
        $('.bysdmask').show();
    } else {
        showBg();
    }
}

function deviceType() {
    const u = navigator.userAgent;
    const AdrType = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('android') > -1 || u.indexOf('linux') > -1 || u.indexOf('Windows') > -1;
    const iOSType = u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1 || !!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('Mac OS X') > -1;
    if (AdrType) {
        window.location.href = HTANDROID;
    } else if (iOSType) {
        window.location.href = HTIOS;
    }
}