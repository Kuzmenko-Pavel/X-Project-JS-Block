/**
 * Created by kuzmenko-pavel on 06.04.17.
 */
define('move_move', [], function () {
    return function (e) {
        if (this.mouseEventCounter > 50) {
            return;
        }
        this.zeroMovement = this.zeroMovement && (event.movementX === 0 && event.movementY === 0);
        this.mouseEventCounter++;
        if (this.mouseEventCounter === 50) {
            if (!this.zeroMovement) {
                this.blocks.send('mouse_move');
            }
        }
    };
});