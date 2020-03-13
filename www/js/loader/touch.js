/**
 * Created by kuzmenko-pavel on 06.04.17.
 */
define('touch', [], function () {
    return function (e) {
        if (this.touchEventCounter > 15) {
            return;
        }
        this.touchEventCounter++;
        if (this.touchEventCounter === 15) {
            this.blocks.send('touch');
        }
    };
});