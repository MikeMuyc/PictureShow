!(function (e) {
    var t,
        n,
        o,
        c,
        i,
        l,
        d =
            '<svg><symbol id="icon-gou1" viewBox="0 0 1024 1024"><path d="M447.27308629 762.27739875c-12.94538297 0-25.89076594-4.31512803-34.52102087-17.26050986l-198.49586801-241.64714382c-17.26050987-17.26050987-12.94538297-47.46640384 4.31512803-60.41178568 17.26050987-17.26050987 47.46640384-12.94538297 60.41178567 4.3151269l163.97484828 198.49586802L736.38663395 274.66798307c12.94538297-17.26050987 43.15127581-21.5756379 60.41178568-8.63025493s21.5756379 43.15127581 8.63025493 60.41178681l-327.94969543 414.2522459c-4.31512803 17.26050987-17.26050987 21.5756379-30.20589284 21.5756379z"  ></path></symbol><symbol id="icon-guanbi" viewBox="0 0 1024 1024"><path d="M511.998966 1023.99998c-282.766789 0-511.998966-229.234225-511.998966-512.003062C0 229.230129 229.232177 0 511.998966 0c282.768837 0 512.001014 229.230129 512.001014 511.996918C1023.99998 794.765755 794.767803 1023.99998 511.998966 1023.99998zM511.998966 64.001919c-247.420428 0-447.999095 200.576619-447.999095 447.997047 0 247.422476 200.576619 447.999095 447.999095 447.999095 247.424524 0 448.001143-200.576619 448.001143-447.999095C960.000109 264.57649 759.421442 64.001919 511.998966 64.001919zM557.433754 512.179189l135.58347 135.581422c12.496871 12.498919 12.496871 32.757694 0 45.256613-12.496871 12.498919-32.757694 12.498919-45.254565 0l-135.585518-135.585518-136.507116 136.507116c-12.597223 12.591079-33.015741 12.591079-45.610916 0-12.595175-12.595175-12.595175-33.013693 0-45.608868l136.509164-136.509164-135.585518-135.585518c-12.498919-12.496871-12.498919-32.757694 0-45.252517 12.496871-12.500967 32.755646-12.500967 45.254565 0l135.587566 135.585518 137.51473-137.51473c12.593127-12.597223 33.015741-12.597223 45.610916 0 12.593127 12.593127 12.593127 33.015741 0 45.60682L557.433754 512.179189z"  ></path></symbol><symbol id="icon-zhankai" viewBox="0 0 1026 1024"><path d="M900.3584 304.2272c-10.98346667-10.98346667-28.00213333-11.63946667-38.43946667-1.80373333l-330.67626666 330.64853333c-13.47093333 14.1856-16.98773333 14.12693333-31.11786667 0l-330.64853333-330.64853333c-10.4384-9.86453333-27.45706667-9.17973333-38.43946667 1.80373333-11.18506667 11.18506667-11.80906667 28.6272-1.43146667 39.0368l367.28533334 367.28853334c4.52053333 4.52053333 10.4096 6.54933333 16.50133333 6.91733333h4.6048c6.09066667-0.4 11.984-2.42773333 16.50133333-6.91733333l367.28533334-367.28853334c10.3616-10.4096 9.73333333-27.87946667-1.41866667-39.0368z" fill="#2c2c2c" ></path></symbol><symbol id="icon-jiantou" viewBox="0 0 1024 1024"><path d="M406.93305901 360.078938l151.92310899 151.923109-151.919015 151.919015c-11.889795 11.889795-11.889795 31.16786 0 43.058678 11.889795 11.889795 31.16786 11.889795 43.058678 0l151.91901501-151.919015 10.64238399-10.642385c17.902742-17.902742 17.902742-46.929846 0-64.832587l-10.642384-10.642385-151.923108-151.923108c-11.889795-11.889795-31.16786-11.889795-43.058679 0-11.889795 11.890818-11.889795 31.168883 1e-8 43.058678z" fill="#1c1f21" ></path></symbol></svg>',
        a = (a = document.getElementsByTagName("script"))[a.length - 1].getAttribute("data-injectcss");
    if (a && !e.__iconfont__svg__cssinject__) {
        e.__iconfont__svg__cssinject__ = !0;
        try {
            document.write(
                "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
            );
        } catch (e) {
            console && console.log(e);
        }
    }

    function s() {
        i || ((i = !0), o());
    }

    (t = function () {
        var e, t, n, o;
        ((o = document.createElement("div")).innerHTML = d),
            (d = null),
        (n = o.getElementsByTagName("svg")[0]) &&
        (n.setAttribute("aria-hidden", "true"),
            (n.style.position = "absolute"),
            (n.style.width = 0),
            (n.style.height = 0),
            (n.style.overflow = "hidden"),
            (e = n),
            (t = document.body).firstChild
                ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n))
                : t.appendChild(e));
    }),
        document.addEventListener
            ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(t, 0)
            : ((n = function () {
                document.removeEventListener("DOMContentLoaded", n, !1), t();
            }),
                document.addEventListener("DOMContentLoaded", n, !1))
            : document.attachEvent &&
            ((o = t),
                (c = e.document),
                (i = !1),
                (l = function () {
                    try {
                        c.documentElement.doScroll("left");
                    } catch (e) {
                        return void setTimeout(l, 50);
                    }
                    s();
                })(),
                (c.onreadystatechange = function () {
                    "complete" == c.readyState && ((c.onreadystatechange = null), s());
                }));
})(window);
