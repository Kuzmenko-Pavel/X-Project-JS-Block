/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    return {
        requiredData: {
            informer: {
                param: 'informer',
                url: '/informer.json'
            },
            offer_log: {
                param: 'log',
                url: '/logger.json'
            },
            offers: [
                {
                    param: 'place',
                    url: '/place.json'
                },
                {
                    param: 'social',
                    url: '/social.json'
                },
                {
                    param: 'account_retargeting',
                    url: '/account_retargeting.json'
                },
                {
                    param: 'dynamic_retargeting',
                    url: '/dynamic_retargeting.json'
                }
            ]
        }
    };
});