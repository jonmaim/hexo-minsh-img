'use strict';

var path = require('path');
var gm = require('gm');
var Promise = require('bluebird');

/* first parameter is the image filename and second parameter is the alt text. If the alt text starts with 'caption:' then a figcaption will be added as well and the alt text and caption text will be the same. */

var minshImg = function(args) {
  var PostAsset = hexo.model('PostAsset');

  var slug = args[0];
  if (!slug) { return; }

  var asset = PostAsset.findOne({post: this._id, slug: slug});
  if (!asset) { return; }

  var altText = args.slice(1).join(' ');
  var captionText = null;
  if (altText.indexOf('caption:') === 0) {
    altText = captionText = altText.substr(8);
  }

  var p = path.join(hexo.base_dir, asset._id);

  return new Promise(function(resolve, reject){
    gm(p + '[0]').size(function (err, size) {
      if (err) { return reject(err); }

      var r = '<p class="minsh-img"><img src="' + hexo.config.root + asset.path + '" style="max-width:' + size.width + 'px" alt="' + altText + '" title="' + altText + '" />';
      if (captionText) { r += '<figcaption>' + captionText + '</figcaption>'; }
      r += '</p>';

      return resolve(r);
    });
  });
};

hexo.extend.tag.register('minsh_img', minshImg, {async : true});
