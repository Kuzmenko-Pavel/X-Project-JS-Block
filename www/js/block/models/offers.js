/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['underscore'], function (_) {
    var Offers = function (app) {
        this.app = app;
        this.items = new Array();
        this.show = 0;
    };
    Offers.prototype.union = function (place, retargeringAccount, retargering, social) {
        var result = [];
        if (retargering && (retargering['retargering'] || []).length !== 0 )
        {
            result = result.concat(retargering['retargering']);
        }
        if (retargeringAccount && (retargeringAccount['retargeringAccount'] || []).length !== 0 )
        {
            result = result.concat(retargeringAccount['retargeringAccount']);
        }
        if (place && (place['place'] || []).length !== 0)
        {
            result = result.concat(place['place']);
        }
        if (place && (place['social'] || []).length !== 0)
        {
            result = result.concat(place['social']);
        }

        if (place && (place['place'] === null || place['clean']))
        {
            this.app.uh.exclude_clean(true);
        }
        if (retargering && retargering['retargering'] === null)
        {
            this.app.uh.retargeting_clean(true);
        }
        result = result.slice(0, this.app.informer.capacity);
        _.each(result, function(element, index, list) {
                var img_list = element.image.split(' , ');
                img_list = _.map(img_list, function(img){
                    return img.replace(/(png|webp)/g,this.app.image_format);
                }, this);
                if (img_list.length === 2)
                {
                    img_list[2] = img_list[0];
                    img_list[3] = img_list[1];
                }
                if(this.app.browser.IE7)
                {
                    list[index].image = img_list.slice(0,1);
                }
                else{
                    list[index].image = img_list;
                }
        },this);
        this.items = _.union(this.items, result);
        _.each(this.items, function(element, index) {
                this.items[index].index = index;
        },this);
    };
    return Offers;
});