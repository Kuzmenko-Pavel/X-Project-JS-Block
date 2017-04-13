/**
 * Created by kuzmenko-pavel on 06.04.17.
 */
define('move_shake', ['./settings'], function (settings) {
    return function (e) {
        var timeStamp = e.timeStamp;
        var old_sequence = this.sequence.slice();
        var step = this.sequence.pop();
        if (step === undefined) {
            step = 2;
            this.sequence = settings.move_shake_sequence.slice();
        }
        if ((timeStamp / 1000 - this.timeStamp / 1000) > step) {
            this.timeStamp = timeStamp;
            this.blocks.send('mouse_move');
        }
        else {
            this.sequence = old_sequence.slice();
        }
    };
});