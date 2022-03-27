import path from "path";
import fs from "fs";
import glob from "glob";

export const postPath = path.resolve(process.cwd(), "./content/posts/");

export const posts = glob.sync(`./content/posts/**/*.md`).map((file) => {
    const loc = absPath(file);
    return {
        slug: path.dirname(loc).split(path.sep).pop(),
        file: fs.readFileSync(loc).toString()
    };
}).reduce((map, cur) => {
    return { ...map, [cur.slug]: cur.file };
}, {} as Record<string, string>);

function absPath(dir: string) {
    return path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
}
