/**
 * Created by kuzmenko-pavel on 06.04.17.
 */
define('touch', [], function () {
    return function (e) {
        if (this.touchEventCounter > 5) {
            return;
        }
        this.touchEventCounter++;
        if (this.touchEventCounter === 5) {
            this.blocks.send('touch');
        }
    };
});