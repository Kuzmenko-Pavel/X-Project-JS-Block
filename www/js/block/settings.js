/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    return {
        requiredData: {
            block: {
                param: 'block',
                url: '/block.json'
            },
            campaign: {
                param: 'campaign',
                url: '/campaign.json'
            },
            offers: [
                {
                    param: 'place',
                    url: '/place.json'
                },
                {
                    param: 'social',
                    url: '/place.json'
                },
                {
                    param: 'retargetingAccount',
                    url: '/retargeting-account.json'
                },
                {
                    param: 'retargetingOffer',
                    url: '/retargeting.json'
                }
            ]
        }
    };
});