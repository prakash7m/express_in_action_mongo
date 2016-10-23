function capitalize (sentence) {
    if (!sentence) {
        return "";
    }
    if (sentence.length > 1) {
        return sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
    }
    return sentence.toUpperCase();
}

module.exports = capitalize;