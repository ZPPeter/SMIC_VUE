export default class ListModule {
    constructor() {
        this.namespaced = true;
        this.state = {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            list: new Array(),
            loading: false
        };
        this.mutations = {
            setCurrentPage(state, page) {
                state.currentPage = page;
            },
            setPageSize(state, pagesize) {
                state.pageSize = pagesize;
            }
        };
    }
}
//# sourceMappingURL=list-module.js.map