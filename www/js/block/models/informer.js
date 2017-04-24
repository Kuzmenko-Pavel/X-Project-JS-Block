/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['underscore'], function (_) {
    var Informer = function () {
        this.account = "";
        this.auto_reload = 0;
        this.auto_reload = 0;
        this.blinking = 0;
        this.blinking_reload = false;
        this.capacity = 1;
        this.domain = "";
        this.footerHtml = "";
        this.headerHtml = "";
        this.html_notification = false;
        this.informer_id = "";
        this.informer_id_int = 0;
        this.place_branch = false;
        this.retargeting_branch = false;
        this.retargeting_account_branch = false;
        this.retargeting_capacity = 1;
        this.retargeting_account_capacity = 1;
        this.shake = 0;
        this.shake_mouse = false;
        this.shake_reload = false;
        this.social_branch = true;
        this.title = "";
        this.style = "";
    };
    Informer.prototype.parse = function (server_obj) {
        _.extend(this,server_obj);
    };
    return Informer;
});