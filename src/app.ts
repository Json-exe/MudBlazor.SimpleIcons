import * as icons from 'simple-icons';
import * as fs from 'fs';

const fileName = '.\\Json_exe.MudBlazor.SimpleIcons\\output.cs';

if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
}

const file = fs.createWriteStream(fileName);
const regexReplaceQuotes = /\"/g;

const snakeCaseToCamelCase = (str: string): string => {
    return str
        .replace(/[-_](.)/g, (match, group1) => group1.toUpperCase())
        .replace(/(^|\d+)(.)/g, (match, group1, group2) => group1 + group2.toUpperCase());
};

file.write(`namespace Json_exe.MudBlazor.SimpleIcons
{
    /// <summary>
    /// Contains all the simple icons as constants
    /// </summary>
    public static class SimpleIcons
    {
`);

let iconCount = 0;

for (let key in icons) {
    iconCount++;
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
        public const string ${snakeCaseToCamelCase(key)} = @"${svg}";
    `);
}

file.write(`
    }
}
`);

file.end();
console.log(`File ${fileName} has been created`);
console.log(`Total icons: ${iconCount} (including undefined and empty ones)`);
console.log('Generating release notes...')
const releaseNotesPath = ".\\RELEASE-NOTES.txt"
// Read from args
const args = process.argv.slice(2);
const version = args.length > 0 ? args[0].replace(/[^0-9.]/g, '') : null;
if (version === null || version.length < 3) throw new Error('Version not provided');
const releaseNotes = `V-${version} includes around ${iconCount} icons from SimpleIcons`
if (fs.existsSync(releaseNotesPath)) {
    fs.unlinkSync(releaseNotesPath);
}
const releaseNotesFile = fs.createWriteStream(releaseNotesPath);
releaseNotesFile.write(releaseNotes);
releaseNotesFile.end();
console.log(`Release notes have been generated at ${releaseNotesPath}`);