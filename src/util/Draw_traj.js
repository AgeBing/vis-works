function arrowTo(ctx, p1, p2, arrowOptions) {
        // 初始化参数
        var opts = {
            startOffset: 2,             // 起点的留空长度
            endOffset: 2,               // 终点的留空长度
            offset: 0,                  // 偏移位（模拟动画效果用, 使用时建议将justifyAlign设为false） 
            color: '#E6E6FA',           // 默认颜色 
            activeIndex: -1,            // 高亮箭头的索引, 超出回到一圈起始位置。(默认-1，不做高亮处理) 
            activeColor: "#00FF00",     // 高亮颜色(Highligh Color)
            stepLength: 5,             // 间隔(步长)
            justifyAlign: true,         // 两端对齐(两边撑满, 配合activeIndex > 0时使用) 
            arrowLength: 10,            // 箭头长度(柄到顶点)            
            arrowTheta: 25,             // 箭头两边的夹角（度数） 
            arrowHeadlen: 4,            // 箭头两边斜边长度 
            arrowLineWidth: 1,          // 画箭头的线宽度
            lineWidth: 1,               // 两点间的连丝宽度（>0时，有效）
        };
 
 
        if (arrowOptions !== undefined && arrowOptions !== null) {
            opts = Object.assign(opts, arrowOptions);
        }

        // 计两点距离
        var len = Math.floor(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)));
        // 计算画多少个箭头(注意：最后一个箭头是不需要间隔(步长)，所以可用长度要加一个opts.stepLength)
        var loops = Math.floor((len - (opts.startOffset + opts.offset + opts.endOffset) + opts.stepLength) / (opts.arrowLength + opts.stepLength));
        // 两端对齐(两边撑满)，重算步长 
        if (opts.justifyAlign === true) {
            opts.stepLength = (len - (opts.startOffset + opts.offset + opts.endOffset) - (opts.arrowLength * loops)) / (loops - 1);
        }
 
 
        // 高亮箭头的索引, 超出回到一圈起始位置。(用于动画效果) 
        var highlightIndex = 0;               // 0 - 无动画效果                
        if (opts.activeIndex > 0) {
            if ((opts.activeIndex % loops) === 0) {
                highlightIndex = loops;
            }
            else {
                highlightIndex = opts.activeIndex % loops;
            }
        }
 
 
        var hudu = Math.atan2(p1.y - p2.y, p2.x - p1.x);    // 计算p1, p2两点的倾斜度（弧度）。(注意参数：p1.y - p2.y, p2.x - p1.x, 请勿搞错)
        var p0 = { x: p1.x, y: p1.y };                      // 原点坐标, 作为圆心。 (辅助计算箭头起点(柄)与顶点的坐标)
        var r;                                              // 半径。 (辅助计算箭头起点(柄)与顶点的坐标)
        var color;
        for (var i = 0; i < loops; i++) {
            // 箭头起点(柄)
            r = (opts.startOffset + opts.offset) + (opts.arrowLength + opts.stepLength) * i;     // 原点到箭头起点(柄)的半径
            p1 = {
                x: p0.x + Math.cos(hudu) * r,
                y: p0.y - Math.sin(hudu) * r
            };
 
 
            // 箭头终点（顶点）
            r = r + opts.arrowLength;                       // 原点到箭头顶点(柄)的半径
            p2 = {
                x: p0.x + Math.cos(hudu) * r,
                y: p0.y - Math.sin(hudu) * r
            };
 
            // 画一个箭头
            if (highlightIndex > 0 && i === (highlightIndex - 1)) {
                color = opts.activeColor;       //高亮箭头（动画效果）
            }
            else {
                color = opts.color;
            }
            drawArrow(ctx, p1, p2, opts.arrowTheta, opts.arrowHeadlen, opts.arrowLineWidth, color);
        }
    }
 
 
    // 画箭头
    // ctx - 画布上下文（我理解成画笔）
    // p1 - 起点
    // p2 - 终点
    // theta -- 夹角theta (是度数，不是弧度)
    // headlen -- 斜边长度
    // width -- 线宽
    // color -- 颜色
    function drawArrow(ctx, p1, p2, theta, headlen, width, color) {
        theta = (theta !== undefined && theta !== null) ? theta : 25;       //夹角(度数)
        headlen = (headlen !== undefined && headlen !== null) ? headlen : 6;   //斜边长度
        width = (width !== undefined && width !== null) ? width : 1;        //线宽
        color = (color !== undefined && color !== null) ? color : '#000';       //颜色
 
 
        var angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI,   //倾斜度(度数)
            angle1 = (angle + theta) * Math.PI / 180,            //夹角1
            angle2 = (angle - theta) * Math.PI / 180,            //夹角2   
            topX = headlen * Math.cos(angle1),                   //箭头上面点, X偏移位
            topY = headlen * Math.sin(angle1),                   //箭头上面点, Y偏移位
            botX = headlen * Math.cos(angle2),                   //箭头下面点, X偏移位   
            botY = headlen * Math.sin(angle2);                   //箭头下面点, Y偏移位      
        ctx.save();

        ctx.beginPath();
 
        //连结两点的线
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
 
 
        //终点箭头的两侧
        var arrowX = p2.x + topX;
        var arrowY = p2.y + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(p2.x, p2.y);           //终点
        arrowX = p2.x + botX;
        arrowY = p2.y + botY;
        ctx.lineTo(arrowX, arrowY);
 
 
        //颜色，线宽
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
 
 
        ctx.restore();
    }
 
 
    // 为Object扩展assign方法（合拼多个对象的属性，返回一个新对象）
    if (!Object.assign) {
        Object.defineProperty(Object, "assign", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target, firstSource) {
                "use strict";
                if (target === undefined || target === null)
                    throw new TypeError("Cannot convert first argument to object");
                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) continue;
                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                    }
                }
                return to;
            }
        });
    }

export default arrowTo