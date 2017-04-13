/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./test', './fixed_queue', './exclude_offers', './retargeting_offers', './gender_account', './gender_user', './cost_account', './cost_user', './activity_account', './activity_user'],
    function (test, FixedQueue, ExcludeOffers, RetargetingOffers, GenderAccount, GenderUser, CostAccount, CostUser, ActivityAccount, ActivityUser) {
        Array.prototype.unique = function () {
            var n = {}, r = [];
            for (var i = 0; i < this.length; i++) {
                if (!n[this[i]]) {
                    n[this[i]] = true;
                    r.push(this[i]);
                }
            }
            return r;
        };
        var UserHistory = function () {
            this.searchengines = new FixedQueue(3);
            this.context = new FixedQueue(3);
            this.retargeting = new RetargetingOffers();
            this.exclude = new ExcludeOffers();
            this.exclude_click = new ExcludeOffers();
            this.retargeting_exclude = new ExcludeOffers();
            this.retargeting_account_exclude = new ExcludeOffers();
            this.retargeting_exclude_click = new ExcludeOffers();
            this.retargeting_account_exclude_click = new ExcludeOffers();
            this.retargeting_view = new ExcludeOffers(true, true);
            this.history = new FixedQueue(3);
            this.gender_accounts = new GenderAccount();
            this.gender_user = new GenderUser();
            this.cost_accounts = new CostAccount();
            this.cost_user = new CostUser();
            this.activity_accounts = new ActivityAccount();
            this.activity_user = new ActivityUser();
        };
        UserHistory.prototype.load = function () {
            if (test()) {
                for (key in this) {
                    if (typeof(this[key]) != 'function') {
                        var history_name = key;
                        var retrievedObject = JSON.parse(localStorage.getItem(history_name));
                        for (key in retrievedObject) {
                            this[history_name].load(key, retrievedObject[key]);
                        }
                    }
                }
                return true;
            }
            return false;
        };
        UserHistory.prototype.save = function () {
            if (test()) {
                for (key in this) {
                    if (typeof(this[key]) != 'function') {
                        localStorage.setItem(key, JSON.stringify(this[key]));
                    }
                }
                return true;
            }
            return false;
        };

        UserHistory.prototype.exclude_clean = function (cl) {
            if (cl) {
                this.exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.exclude_click_clean = function (cl) {
            if (cl) {
                this.exclude_click = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.exclude_get = function () {
            var keys = this.exclude.get().concat(this.exclude_click.get());
            keys = keys.unique();
            return keys.join(';');
        };
        UserHistory.prototype.retargeting_clean = function (cl) {
            if (cl) {
                this.retargeting_exclude = new ExcludeOffers();
                this.retargeting_view = new ExcludeOffers(true, true);
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_account_clean = function (cl) {
            if (cl) {
                this.retargeting_account_exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_click_clean = function (cl) {
            if (cl) {
                this.retargeting_click_exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_exclude_get = function () {
            var keys = this.retargeting_exclude.get().concat(this.retargeting_exclude_click.get());
            keys = keys.unique();
            return keys.join(';');
        };
        UserHistory.prototype.retargeting_account_exclude_get = function () {
            var keys = this.retargeting_account_exclude.get().concat(this.retargeting_account_exclude_click.get());
            keys = keys.unique();
            return keys.join(';');
        };
        return new UserHistory();
    });