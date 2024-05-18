import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deleteWorkerFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "_worker.js") {
        await fs.rm(fullPath, { recursive: true });
        console.log(`Deleted directory: ${fullPath}`);
      } else {
        await deleteWorkerFiles(fullPath);
      }
    } else if (entry.isFile() && entry.name === "_worker.js") {
      await fs.unlink(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    }
  }
}

const rootDir = path.resolve(__dirname);

deleteWorkerFiles(rootDir)
  .then(() => console.log("Deletion complete"))
  .catch((err) => console.error("Error during deletion:", err));
