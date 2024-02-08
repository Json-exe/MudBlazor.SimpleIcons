import * as icons from 'simple-icons';
import * as fs from 'fs';

const fileName = 'output.cs';

if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
}

const file = fs.createWriteStream(fileName);
const regexReplaceQuotes = /\"/g;
file.write(`using System;

namespace Json_exe.Blazor.SimpleIcons
{
    public static class SimpleIcons
    {
`);

for (let key in icons) {
    if (!icons[key] === undefined) continue;
    const icon = icons[key] as icons.SimpleIcon;
    if (icon.title === undefined) continue;
    const svg = icon.svg.replace(regexReplaceQuotes, '""');
    file.write(`
        /// <summary>
        /// <b>Title: </b>${icon.title}<br/>
        /// <b>Source: </b>${icon.source}<br/>
        /// <b>Color-HEX: </b>${icon.hex}<br/>
        /// <b>License: </b>${icon.license ?? "None"}<br/>
        /// </summary>
        public const string ${key} = @"${svg}";
    `);
}

file.write(`
    }
}
`);

file.end();
console.log(`File ${fileName} has been created`);