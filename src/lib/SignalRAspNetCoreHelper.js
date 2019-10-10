import AppConsts from './appconst';
import Util from './util';
class SignalRAspNetCoreHelper {
    initSignalR() {
        var encryptedAuthToken = Util.abp.utils.getCookieValue(AppConsts.authorization.encrptedAuthTokenName);        
        Util.abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts.authorization.encrptedAuthTokenName + "=" + encodeURIComponent(encryptedAuthToken),
            url: AppConsts.remoteServiceBaseUrl + '/signalr'  // 不能用自己的 signalr-myChatHub
        };        
        Util.loadScript(AppConsts.appBaseUrl + '/dist/abp.signalr-client.js');
    }
}
export default new SignalRAspNetCoreHelper();