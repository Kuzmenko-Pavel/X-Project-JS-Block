/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore', './block', './campaigns'],
    function (jQuery, _, block, campaigns, size_capacity_calculator) {
        var loader_obj = function () {
            var block_camp_defferr = jQuery.when(block(this), campaigns(this));
            block_camp_defferr.then(_.bind(function (block, campaigns) {
                this.informer.parse(block[0]);
                this.campaigns.parse(campaigns[0]);
                var size_capacity_calculator_defferr = jQuery.when(this.size_capacity_calculator());
                size_capacity_calculator_defferr.then(_.bind(function (size) {
                    var offers_defferr = this.loader_offers();
                    offers_defferr.then(_.bind(function (place, retargeringAccount, retargering) {
                        this.offers.union(place, retargeringAccount, retargering);
                        this.render.render();
                    }, this));
                }, this));
            }, this));

        };
        return loader_obj;
    });