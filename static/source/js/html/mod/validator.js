define('validator', [], function(require, exports, module) {
	var Validator = function(name) {
		this.cache = [];
		this.name = name;
	};
	Validator.prototype = {
		addFun: function(dom, rules) {
			var _self = this;
			for(var i = 0, rule; rule = rules[i++];) {
				(function(rule) {
					var strategyAry = rule.strategy.split(':');
					var errorMsg = rule.errorMsg;
					_self.cache.push(function() {
						var strategy = strategyAry.shift();
						strategyAry.unshift(dom.value || dom.val());
						strategyAry.push(errorMsg);
						return _self.name[strategy].apply(dom, strategyAry);
					})
				})(rule)
			}
		},
		start: function() {
			for(var i = 0, validatorFun; validatorFun = this.cache[i++];) {
				var errorMsg = validatorFun();
				if(errorMsg) {
					return errorMsg;
				}
			}
		}
	}
	return Validator;
})