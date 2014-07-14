!(function($) {
	var defaultOption = {
			listTag: 'ul',
			listClass: 'tag-list',
			itemTag: 'li',
			itemClass: 'tag-item',
			allowTyping: true,
			color: 'default',
			data: [],
			afterAppend: null,
			afterRemove: null
		},
		catCache = {},
		Cattags = (function() {
			var countOfInstance = 0,
				Cattags = function(options, $el) {
					this.options = options;
					this.init();
					$el.data('catOrder', countOfInstance).extend({
						addNewItem: this.addNewItem.bind(this)
					}).append(this.listTag);

					catCache[countOfInstance] = $el;
					countOfInstance++;
				};
			Cattags.prototype = {
				init: function() {
					var option = this.options;
					this.listTag = $(document.createElement(option.listTag)).addClass(option.listClass).addClass(option.listClass + '-' + option.color);
					if (option.allowTyping) {
						this.inputer = this.createTyping();
						this.listTag.append(this.inputer);
					}
					for (var i = 0; i < option.data.length; i++) {
						this.addNewItem(option.data[i], true);
					}
				},
				addNewItem: function(v, preventEvent) {
					if (typeof v === 'undefined') return;
					if (typeof v === 'string') {
						v = {
							value: v
						};
					}
					if (typeof v === 'undefined' || typeof v.value === 'undefined' || !v.value.trim()) return;
					v.value = v.value.trim();

					var option = this.options,
						_me = this,
						tag = $('<' + option.itemTag + ' class="' + option.itemClass + ' " style="display:none">' +
							'<span>' + v.value + '</span>' +
							'<button type="button" class="tag-close" data-dismiss="' + option.itemClass + '">&times;' +
							'<span class="sr-only">Close</span>' +
							'</button>' +
							'</' + option.itemTag + '>');

					// 任意添加的data属性
					for (var i in v) tag.data(i, v[i]);
					if (option.allowTyping)
						this.inputer.before(tag);
					else
						this.listTag.append(tag);

					// 动态显示
					requestAnimationFrame(function() {
						tag.fadeIn('slow');
						tag.find('.tag-close').click(function() {
							_me.removeItem($(this).closest('.' + option.itemClass));
						});
					});

					// 触发事件
					if (!preventEvent && !!option.afterAppend) {
						var values = this.getAllDatas();
						option.afterAppend.call(this.listTag, tag, v, values);
					}
					return tag;
				},
				removeItem: function($el) {
					var option = this.options;
					if (!!option.afterRemove) {
						var values = this.getAllDatas();
						option.afterRemove.call(this.listTag, $el, $el.data(), values);
					}
					$el.fadeOut('slow', function() {
						$(this).remove();
					});
				},
				// 返回所有数据
				getAllDatas: function() {
					var option = this.options,
						values = [];
					this.listTag.find(option.itemTag + '.' + option.itemClass).each(function() {
						values.push($(this).data());
					});
					return values;
				},
				createTyping: function() {
					var option = this.options,
						_me = this,
						inputer = $('<' + option.itemTag + ' class="tag-typing"><input type="text" /></' + option.itemTag + '>');
					inputer.find('input[type="text"]').blur(function(e) {
						_me.addNewItem($(this).val());
						$(this).val('');
					}).keypress(function(e) {
						if (e.keyCode === 13) {
							_me.addNewItem($(this).val());
							$(this).val('');
						}
					});
					return inputer;
				}
			};
			return Cattags;
		})();

	$.fn.extend({
		cattags: function(options) {
			if (typeof options === 'string' || options instanceof Array) {
				var values = options instanceof Array ? options : [options];
				return this.each(function() {
					var $me = $(this),
						tags = catCache[$me.data('catOrder')];
					values.forEach(function(v) {
						tags.addNewItem(v);
					});
					return $me;
				});
			} else if (typeof options === 'object' || typeof options === 'undefined') {
				options = options || {};
				options = $.extend({}, defaultOption, options);
				return this.each(function() {
					var $me = $(this),
						data = $me.data(),
						config = $.extend({}, options, data),
						tags = new Cattags(config, $me);
					return $me;
				});
			}
		}
	});
})(jQuery);