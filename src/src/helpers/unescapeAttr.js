const unescapeAttr = (str) => {
    return ('' + str) /* Forces the conversion to string. */
        .replace(/\\\\/g, '\\') /* This MUST be the 1st replacement. */
        .replace(/\\t/g, '\t') /* These 2 replacements protect whitespaces. */
        .replace(/\\n/g, '\n')
        .replace(/\\u00A0/g, '\u00A0') /* Useful but not absolutely necessary. */
        .replace(/\\x26/g, '&') /* These 5 replacements protect from HTML/XML. */
        .replace(/\\x27/g, '\'')
        .replace(/\\x22/g, '"')
        .replace(/\\x3C/g, '<')
        .replace(/\\x3E/g, '>')
        ;
};

export default unescapeAttr;