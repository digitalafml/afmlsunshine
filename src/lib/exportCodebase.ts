import JSZip from "jszip";

// Raw contents of every project source file, inlined at build time by Vite.
const sourceFiles = import.meta.glob(
  [
    "/src/**/*.{ts,tsx,js,jsx,css,json,md,svg}",
    "/public/**/*.{txt,svg,json,xml}",
    "/supabase/**/*.{ts,sql,toml,json}",

    "/index.html",
    "/package.json",
    "/tsconfig*.json",
    "/vite.config.ts",
    "/tailwind.config.ts",
    "/postcss.config.js",
    "/eslint.config.js",
    "/components.json",
    "/README.md",
  ],
  { query: "?raw", import: "default", eager: false }
) as Record<string, () => Promise<string>>;

export const sourceFileCount = Object.keys(sourceFiles).length;

export async function downloadCodebaseZip(fileName = "codebase.zip") {
  const zip = new JSZip();

  await Promise.all(
    Object.entries(sourceFiles).map(async ([path, load]) => {
      try {
        const contents = await load();
        zip.file(path.replace(/^\//, ""), contents);
      } catch {
        // Skip binary/unreadable assets that cannot be imported as raw text.
      }
    })
  );

  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
