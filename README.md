 jquery.cattags
===========================

jquery标签列表插件，可实现标签的删除、动态添加功能；标签UI配色取自bootstrapt，形式简洁大方；库代码简单轻便，依赖的html也及其简单。总体而言，这是一个轻量级的插件。

---------------------------
###　　　　　　　　　　　　Author:Van
###　　　　　　　　　 E-mail:1321907687@qq.com

===========================

<h2> 接口：</h2>
<dl>
	<dt>allowTyping（默认：true）</dt>
	<dd>是否允许用户输入，</dd>
	<dt>color(默认：default)</dt>
	<dd>标签的颜色配置，可选值包括：success、primary、info、warning、danger</dd>
	<dt>data(初始化数据)</dt>
	<dd>初始化标签列表的数据</dd>
	<dt>afterAppend</dt>
	<dd>在标签列表中添加标签后触发的事件，事件参数：(添加的标签元素, 添加的值, 添加后列表的值)</dd>
	<dt>afterRemove</dt>
	<dl>在标签列表中移除标签后出发的事件，事件参数：(移除的标签元素, 移除的值, 移除后列表的值)</dl>
</dl>

<h2>引用插件：</h2>
<p>
	需在页面中添加如下引用：
```html
		<link rel=stylesheet href="jquery.cattags/jquery.cattags.min.css">
		<script src="jquery.cattags/jquery.cattags.min.js"></script>
```
</p>

<h2> 初始化：</h2>
插件满足bootstrap插件规范，可以基于元素的data-属性及js进行配置：
<dl>
	<dt>方式一：</dt>
	<dl>
```html
	<div class="tag-holder" data-color="default"  data-allow-typing="false"></div>
	<script>
	$('.tag-holder').cattags({
        data:['标签1','标签2'],
        afterAppend:function(){
      		// 事件处理代码
   		},
   		afterRemove:function(){
    		// 事件处理代码
        }
    });
	</script>
```
	</dl>
	<dt>方式二：</dt>
	<dl>
```html
	<div class="tag-holder"></div>
	<script>
	$('.tag-holder').cattags({
		color:'default',
		allowTyping:'false',
        data:['标签1','标签2'],
        afterAppend:function(){
        	// 事件处理代码
        },
        afterRemove:function(){
        	// 事件处理代码
        }
    });
    </script>
```
	</dl>
</dl>

<h2>添加标签：</h2>
<p>
	在元素初始化后，可使用如下方式添加标签：
```javascript
	$('.tag-holder').cattags([
	// 添加简单的值
	'标签3',{
		value:'标签n',
		// 任意添加的属性，构成复杂对象
		id:'1',
		data:'v'
		}
	]);
```
</p>

<h2> ps：</h2>
<ul>
    <li>question 1: 时间问题，未进行兼容性测试，大家在使用过程中如果发现问题，请直接联系我</li>
    <li>question 2: 代码注释较少，有什么问题可直接与我交流</li>
</ul>