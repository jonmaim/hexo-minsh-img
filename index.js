'use strict';

var path = require('path');
var gm = require('gm');
var Promise = require('bluebird');

/* first parameter is the image filename. Second parameter is the alt text, third param is caption and fourth param is width ratio in %
Parameters 2-4 need to be separated by ','
example:
{% minsh_img image.png this is my alt text, this is my caption, 50 %}}
.*/

var minshImg = function(args) {
  var PostAsset = hexo.model('PostAsset');

  var slug = args[0];
  if (!slug) { return; }

  var asset = PostAsset.findOne({post: this._id, slug: slug});
  if (!asset) { return; }

  var argsText = args.slice(1).join(' ');
  var argsArray = argsText.split(', ');
  var altText = '';
  var captionText = '';
  var widthRatio = 100;

  if (argsArray.length > 0) {
    altText = argsArray[0];
    if (argsArray.length > 1) {
      captionText = argsArray[1];
      if (argsArray.length > 2) {
        widthRatio = argsArray[2];
      }
    }
  }

  var p = path.join(hexo.base_dir, asset._id);

  return new Promise(function(resolve, reject){
    gm(p + '[0]').size(function (err, size) {
      if (err) { return reject(err); }

      var width = size.width;
      var height = size.height;
      width = Math.floor(size.width*widthRatio/100);
      height = Math.floor(size.height*widthRatio/100);

      var r = '<div class="minsh-img"><img src="' + hexo.config.root + asset.path + '" alt="' + altText + '" title="' + altText + '" style="max-width:' + width + 'px; max-height: '+ height +'px" />';
      if (captionText !== '') { r += '<figcaption>' + captionText + '</figcaption>'; }
      r += '</div>';

      return resolve(r);
    });
  });
};

hexo.extend.tag.register('minsh_img', minshImg, {async : true});
