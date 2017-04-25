/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(function () {
    var Offers = function (app) {
        this.app = app;
        this.items = Array();
        this.skip = 0;
        this.show = 0;
        console.log(this);
    };
    Offers.prototype.union = function (place, retargeringAccount, retargering) {
        var result = [];
        if (retargering && (retargering['retargering'] || []).length !== 0 )
        {
            result = result.concat(retargering['retargering']);
        }
        if (retargeringAccount && (retargeringAccount['retargeringAccount'] || []).length !== 0 )
        {
            result = result.concat(retargeringAccount['retargeringAccount']);
        }
        // if (place && (place['place'] || []).length !== 0)
        // {
        //     result = result.concat(place['place']);
        //     uh.exclude_clean(place['clean']);
        // }
        // if (place && (place['social'] || []).length !== 0)
        // {
        //     result = result.concat(place['social']);
        // }
        // if (place && place['place'] == null)
        // {
        //     uh.exclude_clean(true);
        // }
        // if (retargering && retargering['retargering'] == null)
        // {
        //     uh.retargeting_clean(true);
        // }
        // return result.slice(0,informer.capacity);
    };
    return Offers;
});