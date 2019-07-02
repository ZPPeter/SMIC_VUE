import ajax from '../../lib/ajax';
const account = {
    namespaced: true,
    state: {},
    actions: {
        async isTenantAvailable(state, payload) {
            let rep = await ajax.post('/api/services/app/Account/IsTenantAvailable', payload.data);
            return rep.data.result;
        }
    }
};
export default account;
//# sourceMappingURL=account.js.map