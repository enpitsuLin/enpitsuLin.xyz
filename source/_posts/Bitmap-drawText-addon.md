---
title: Bitmap_drawText_addon
date: 2017-06-14 21:25:43
tags: [MV plugin, JavaScript]
categories: MV插件
---

canvas中fill渐变的应用bitmap&drawTextEx

![example](Bitmap-drawText-addon/bitmap_drawTextEx.png)


因为单纯的颜色会很单调。加上渐变并运用的得当会很有效。


```javascript
//=============================================================================
// Bitmap&DrawTextEx.js
//=============================================================================
(function() {
    Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
        this.gradientFillText(text, tx, ty, maxWidth, "#fff", this.textColor)
    };
    Bitmap.prototype.gradientFillText = function(text, x, y, mWidth, color1,
                                                 color2) {
        var context = this._context;
        var grad;
        grad = context.createLinearGradient(x, y-this.fontSize, x, y);
        grad.addColorStop(0, color1);
        grad.addColorStop(0.8, color2);
        context.save();
        context.fillStyle = grad;
        context.fillText(text, x, y, mWidth);
        context.restore();
        this._setDirty();
    };
    var _bitmapDrawTextEx_initialize =Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function(width,height) {
        _bitmapDrawTextEx_initialize.call(this,width,height)
        this.outlineColor = '#000';
    }
})();

```