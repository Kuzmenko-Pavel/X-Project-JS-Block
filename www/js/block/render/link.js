/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['./../Base64'], function (b) {
    return function(i)
    {
        var e = new Date().getTime();
        var t = e - this.app.st;
        var url = "id="+ i.guid + "\n" + "inf=" + this.app.informer.informer_id + "\n" + "token=" + i.token + "\n" + "url=" + i.url + "\n" + "rand=" +  params.rand() + "\n" + "camp=" +  i.campaign_guid + "\n" + "t=" + t + "\n" ;
        var r = ['/click?', b.encode(url)];
        return r.join('');
    };
});