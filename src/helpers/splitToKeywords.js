const splitToKeywords = (str) => {
    return str.toLowerCase().split(",").join(" ").split(".").join(" ").split(":").join(" ").split(";").join(" ").split("(").join(" ").split(")").join(" ").split("/").join(" ").split("&").join(" ").split(" ").join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,'').split(" ");
}

export default splitToKeywords;