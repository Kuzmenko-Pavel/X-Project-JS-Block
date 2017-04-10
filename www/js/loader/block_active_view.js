/**
 * Created by kuzmenko-pavel on 07.04.17.
 */
define('block_active_view', ['jquery', './is_element_in_viewport'], function (jQuery, is_element_in_viewport) {
    return function () {
        var $el = jQuery(this.iframe), scrollCounter = this.block_setting.scrollCounter;
        if (this.block_setting.visible){
            return this.block_setting.visible;
        }
        this.block_setting.visible = is_element_in_viewport($el, scrollCounter);
        this.block_setting.scrollCounter ++;
        return this.block_setting.visible;
    };
});