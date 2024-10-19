/* Calculate the bounding rectangle of all polygons in a
   document and scale them to fit within a specified
   width and height. This will make a real mess of things
   if your SVG contains other objects besides polygons. */
function fitPolygonsToBounds() {
    var width = 500,
        height = 500;
    var o = document.getElementById('mask');
    var s = o.getElementsByTagName('path');
    minx = miny = 1e100;
    maxx = maxy = -minx;
    for (var i = 0; i < s.length; i++) {
        var x = s[i].getBBox();
        if (x.x < minx) minx = x.x;
        if (x.y < miny) miny = x.y;
        if (x.x + x.width > maxx) maxx = x.x + x.width;
        if (x.y + x.height > maxy) maxy = x.y + x.height;
    }
    minx = Math.min(minx, 0);
    miny = Math.min(miny, 0);
    maxx = Math.max(maxx, width);
    maxy = Math.max(maxy, height);
    if (minx < 0 || maxx > width || miny < 0 || maxy > height) {
        var scalex = width / (maxx - minx);
        var scaley = width / (maxy - miny);
        var scale = Math.min(scalex, scaley);
        if (scalex > scale) {
            minx -= (width - (maxx - minx) * scale) / 2;
        }
        if (scaley > scale) {
            miny -= (height - (maxy - miny) * scale) / 2;
        }
        for (i = 0; i < s.length; i++) {
            var m = s[i].getCTM();
            m = m.scale(scale).translate(-minx, -miny);
            s[i].setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")");
	console.log(i)
        }
    }
    return false;
}
fitPolygonsToBounds();
