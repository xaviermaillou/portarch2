const splitToKeywords = (str) => {
    return str.toLowerCase().replace(",", " ").replace(".", " ").replace(":", " ").replace(";", " ").replace("(", " ").replace(")", " ").replace("/", " ").replace("&", " ").split(" ").join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,'').split(" ");
}

export default splitToKeywords;