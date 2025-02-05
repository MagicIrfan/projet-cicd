export class ClassService {
    private readonly fetchData: (url: string) => Promise<any>;

    constructor(fetchDataImpl?: (url: string) => Promise<any>) {
        this.fetchData = fetchDataImpl || (async (url) => {
            const response: Response = await fetch(url);
            return response.json();
        });
    }
}
