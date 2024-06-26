export class Paging {
    private readonly page: number;
    private readonly pageSize: number;
    private readonly totalPages: number;
    private readonly total: number;
    constructor(page: number, pageSize: number, total: number) {
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPages = Math.ceil(total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1);
    }
    getPage(): number {
        return this.page;
    }
    getPageSize(): number {
        return this.pageSize;
    }
    getTotalPages(): number {
        return this.totalPages;
    }
    getTotal(): number {
        return this.total;
    }
}
