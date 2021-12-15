function replaceEmoji(msg) {
    msg = msg.replace(":) ", "\u{1F600}");
    msg = msg.replace(" :)", "\u{1F600}");
}

export default replaceEmoji;