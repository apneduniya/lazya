

export function parseJsonGarbage(s) {
    /**
     * This function converts string containing json to a json object.
     * @param {string} s - The string to parse.
     * @return {Object} - The parsed json garbage.
     */
    s = s.slice(s.search(/[{[]/));
    try {
        return JSON.parse(s);
    } catch (e) {
        if (e instanceof SyntaxError) {
            return JSON.parse(s.slice(0, e.message.match(/position (\d+)/)[1]));
        }
        throw e;
    }
}