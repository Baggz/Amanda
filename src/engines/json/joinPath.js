/**
 * JoinPath
 *
 * @param {string} path
 * @param {string} property
 */
Validation.prototype.joinPath = function(path, property) {

    path = path || [];

    //copy to avoid sharing 1 instance
    path = JSON.parse(JSON.stringify(path))

    // Converts the ‘property’ to a string
    property = property + '';

    path.push(property);
    return path;

};
