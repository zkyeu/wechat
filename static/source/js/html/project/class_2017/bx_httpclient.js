/**
 *
 * @authors shaoyongkai (shaoyongkai@51talk.com)
 * @date    2016-01-16 11:10:00
 * @version 1.0.0
 */
define('bx_httpclient', [], function(require, exports, module) {
    module.exports = {
        post: function(url, data, successCallback, errorCallback) {
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(data),
                success: function(res) {
                    successCallback ? successCallback(res) : '';
                },
                error: function(res) {
                    errorCallback ? errorCallback(res) : '';
                }
            });
        },
        get: function(url, successCallback, errorCallback) {
            $.ajax({
                type: "get",
                url: url,
                success: function(res) {
                    successCallback ? successCallback(res) : '';
                },
                error: function(res) {
                    errorCallback ? errorCallback(res) : '';
                }
            });
        }
    }
    
});