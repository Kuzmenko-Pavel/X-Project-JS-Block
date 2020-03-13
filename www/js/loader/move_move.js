/**
 * Created by kuzmenko-pavel on 06.04.17.
 */
define('move_move', [], function () {
    return function (e) {
        if (this.mouseEventCounter > 25) {
            return;
        }
        this.zeroMovement = this.zeroMovement && (e.movementX === 0 && e.movementY === 0);
        this.mouseEventCounter++;
        if (this.mouseEventCounter === 25) {
            if (!this.zeroMovement) {
                this.blocks.send('mouse_move');
            }
        }
    };
});