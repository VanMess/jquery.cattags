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
		toString = ''.toString,
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
					if (typeof v !== 'string' || !v.trim()) return;
					var option = this.options,
						_me = this,
						tag = $('<' + option.itemTag + ' class="' + option.itemClass + ' " style="display:none">' +
							'<span>' + v + '</span>' +
							'<button type="button" class="tag-close" data-dismiss="' + option.itemClass + '">&times;' +
							'<span class="sr-only">Close</span>' +
							'</button>' +
							'</' + option.itemTag + '>');
					tag.find('.tag-close').click(function() {
						_me.removeItem($(this).closest('.' + option.itemClass));
					});
					if (option.allowTyping)
						this.inputer.before(tag);
					else
						this.listTag.append(tag);
					requestAnimationFrame(function() {
						tag.fadeIn('slow');
					});

					if (!preventEvent && !!option.afterAppend) {
						var values = [];
						this.listTag.find(option.itemTag + '.' + option.itemClass + '>span').each(function() {
							values.push($(this).text())
						});
						option.afterAppend.call(this.listTag, tag, v, values);
					}
					return tag;
				},
				removeItem: function($el) {
					var option = this.options;
					$el.fadeOut('slow', function() {
						$(this).remove();
					});

					if (!!option.afterRemove) {
						var values = [];
						this.listTag.find(option.itemTag + '.' + option.itemClass + '>span').each(function() {
							values.push($el.text())
						});
						option.afterRemove.call(this.listTag, $el, $el.find('>span').text(), values);
					}
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
					console.log(config, data);
					return $me;
				});
			}
		}
	});
})(jQuery);