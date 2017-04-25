/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['jquery', 'underscore'], function (jQuery, _, link) {
    return function(items){
        $.each(items, function(i, v) {
            $("div[data-id='"+ v.id +"']>div").each(function() {
                $(this).click(function(event){
                    var popup = window.open(link(v),'_blank');
                    popup.moveTo(0,0);
                    uh.load();
                    if(v.retargeting == 0)
                    {
                        uh.exclude_click.add(v.id,1);
                    }
                    else
                    {
                        uh.retargeting_exclude_click.add(v.id,1);
                    }
                    uh.save();
                    offerChange(this);
                    });
            });
        });
    };
});