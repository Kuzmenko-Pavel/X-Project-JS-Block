/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['underscore'], function (_) {
    var Campaigns = function (app) {
        this.app = app;
        this.all = new Array();
        this.place = new Array();
        this.retargetingAccount = new Array();
        this.retargetingOffer = new Array();
        this.social = new Array();
        this.data = new Object();

    };
    Campaigns.prototype.parse = function (server_obj) {
        _.each(server_obj, function(element, index, list) {
            if (_.has(this, index)){
                this[index] = _.keys(element);
                _.extend(this.all, _.keys(element));
                _.extend(this.data, element);
            }
        }, this);
    };
    return Campaigns;
});