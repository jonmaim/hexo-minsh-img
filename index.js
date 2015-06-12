'use strict';

var path = require('path');
var gm = require('gm');
var Promise = require('bluebird');

var minshImg = function(args) {
  var PostAsset = hexo.model('PostAsset');

  var slug = args[0];
  if (!slug) { return; }

  var asset = PostAsset.findOne({post: this._id, slug: slug});
  if (!asset) { return; }

  var altText = args.slice(1).join(' ');

  var p = path.join(hexo.base_dir, asset._id);

  return new Promise(function(resolve, reject){
    gm(p + '[0]').size(function (err, size) {
      if (err) { return reject(err); }

      return resolve('<p class="minsh-img"><img src="' + hexo.config.root + asset.path + '" style="max-width:' + size.width + 'px" alt="' + altText + '" title="' + altText + '" /></p>');
    });
  });
};

hexo.extend.tag.register('minsh_img', minshImg, {async : true});
