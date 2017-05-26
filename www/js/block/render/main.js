/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore', './link', './../templates/main'],
    function (jQuery, _, link, templates) {
        return function (app) {
            var render_obj = new Object({app: app});
            render_obj.render = function (capacity) {
                capacity = capacity || app.informer.capacity;
                if (app.offers.items.length - app.offers.show < capacity) {
                    var offers_defferr = app.loader_offers();
                    offers_defferr.then(_.bind(function (place, retargeringAccount, retargering) {
                        this.offers.union(place, retargeringAccount, retargering);
                        this.render.render(capacity);
                    }, app));
                }
                else {
                    if (this.app.offers.show === 0) {
                        jQuery('body').html(templates.advBlockTemplate({
                            mainHeader: this.app.informer.headerHtml,
                            mainFooter: this.app.informer.footerHtml
                        }));
                        jQuery('adsContainer')
                    }
                }
            };
            render_obj.link = link;
            return render_obj;
        };
    });