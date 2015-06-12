'use strict';

var minshImg = function(args) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', args);
	var text = '<img src="' + args[0] + '" alt="' + args[1] + '" title="' + args[2] + '" />';
	return text;
};

hexo.extend.tag.register('minsh_img', minshImg);
