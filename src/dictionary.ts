export class Dictionary {
    private OS: string;
    private URIHandler: string;

    constructor() {}

    /**
     * Get command to open dash
     *
     * @param {string} query - text to find
     * @param {string} docsets - array of docset e.g. [css, less]
     * @return {string} dash handler and uri
     */
    getCommand(query: string): string {
        var uri = 'dict://' + encodeURIComponent(query);
        return 'open ' + uri;
    }
}
