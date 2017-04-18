/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    return {
        requiredData: {
            block: {
                url: '/block.json'
            },
            campaign: {
                url: '/campaign.json'
            },
            offers: [
                {
                    param: 'place',
                    isDisable: "!(informer.social_branch || informer.place_branch),",
                    url: '/place.json',
                    always: true
                },
                {
                    param: 'retargetingAccount',
                    isDisable: "!informer.retargeting_branch,",
                    url: '/retargeting-account.json',
                    always: false
                },
                {
                    param: 'retargetingOffer',
                    isDisable: "!informer.retargeting_branch",
                    url: '/retargeting.json',
                    always: false
                }
            ]
        }
    };
});