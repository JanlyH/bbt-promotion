(function () {
    //console.log('2:'+(+new Date()-now));
    var h = window.location.href, d = document;
    d.write("<script>KISSY.config('packages',{" +
        "gallery:{" +
        " base:'/kissy-gallery/gallery-build/'" +
        "  }" +
        "});" +
        "KISSY.config({" +
        " base:'http://assets.baobeituan.com/assets/lib/kissy/build/'"+
        "});</script>");
})();