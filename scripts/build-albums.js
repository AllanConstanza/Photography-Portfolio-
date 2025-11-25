const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");


const root = path.join(process.cwd(), "public", "photos");
const outFile = path.join(process.cwd(), "src", "data", "albums.json");

function isImage(f) { return /\.(jpe?g|png|webp)$/i.test(f); }
function toPosix(p) { return p.split(path.sep).join("/"); }

function main() {
  if (!fs.existsSync(root)) {
    console.error("No /public/photos folder found.");
    process.exit(1);
  }
  const albums = [];
  const photos = [];

  const albumDirs = fs.readdirSync(root)
    .filter((d) => fs.statSync(path.join(root, d)).isDirectory());

  for (const album of albumDirs) {
    const dir = path.join(root, album);
    const files = fs.readdirSync(dir).filter(isImage);
    files.sort();

    for (const f of files) {


      const abs = path.join(dir, f);
      let w = 0, h = 0;
      try {
        const dim = sizeOf(abs);
        w = dim.width; h = dim.height;
      } catch (_) { w = 1600; h = 1066; }

      const rel = toPosix(path.posix.join("/photos", album, f));
      photos.push({ src: rel, alt: `${album} — ${f}`, album, w, h });

    }
    if (files[0]) {
      albums.push({
        name: album,
        cover: toPosix(path.posix.join("/photos", album, files[0])),
        count: files.length
      });
    }
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify({ albums, photos }, null, 2));
  console.log(`✅ Wrote ${toPosix(path.relative(process.cwd(), outFile))}`);
}

main();
