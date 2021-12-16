const fs = require('fs');
const path = require('path');
const readline = require('readline');
const emoji = require(path.join(__dirname, '..', 'frontend', 'emoji.js'));

if (!fs.existsSync('/emoji.rule')) {
    fs.writeFile(__dirname + '/emoji.rule', "", function(err) {
        if (err) {
            console.log(err);
        }
    })
}

function translate(str) {
    //console.log(str);
    if (str.startsWith("    ret = ret.replaceAll")) {
        var s = "";
        s = str;
        s = s.replace("    ret = ret.replaceAll(\"");
        s = s.replaceAll("\"", "");
        s = s.replaceAll(",", "");
        s = s.replaceAll(');', '');
        s = s.substring(0, s.length - 9);
        s = s.replaceAll('undefined', '');
        var s2 = emoji.replaceEmoji(s);

        fs.appendFile(__dirname + "/emoji.rule", s + " ".repeat(33 - s.length) + "  ->  " + s2 + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

async function processLineByLine() {
    const fileStream = fs.createReadStream(path.join(__dirname, '..', 'frontend', 'emoji.js'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        translate(line);
    }
}

processLineByLine();