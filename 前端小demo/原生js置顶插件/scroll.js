/* 
@param option = {
        ele: document.documentElement, // 默认移动文档滚动条
        targetScroll: 0, // 目标距离
        duration: 1000, // 滚动总时间
        interval: 1000 / 60, // 每次时间间隔,帧率
        onscrollBefore: undefined, //滚动之前回调
        onscrollEnd: undefined //滚动之后回调
        
}


*/

function scroll(option = {}) {
    defaultOptions = { // 默认选项
        ele: document.documentElement, // 默认移动文档滚动条
        targetScroll: 0, // 目标距离
        duration: 1000, // 滚动总时间
        interval: 1000 / 60, // 每次时间间隔,帧率
        onscrollBefore: undefined,
        onscrollEnd: undefined
    }
    var options = Object.assign(defaultOptions, option);

    options.onscrollBefore(start); // 滚动之前回调

    function start() { // 开始滚动的运动函数
        /* 
        每次滚动距离 = 总距离 / 总次数
        => perDistance = (目标距离-当前距离) / (总时间/帧率) 
        => perDistance = (options.targetScroll - options.ele.scrollTop)/ Math.ceil(options.duration/options.interval)
        =>
        */
        options.distance = options.targetScroll - options.ele.scrollTop; // 滚动总距离
        options.times = Math.ceil(options.duration / options.interval); // 滚动总次数
        options.perDistance = options.distance / options.times; // 每次滚动距离
        var curTimes = 0; // 声明一个参数用于记载运动次数

        var timer = setInterval(function () {
            if (curTimes == options.times) {
                clearInterval(timer);
                options.onscrollEnd(); //滚动结束之后回调
            }
            options.ele.scrollTop += options.perDistance;
            curTimes++;
        }, options.interval);

    }
}
