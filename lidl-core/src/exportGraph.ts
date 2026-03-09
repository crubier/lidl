import fs from "fs";
import path from "path";
import { exec } from "child_process";

export default function exportGraph(gg: string, filename: string): void {
  fs.writeFileSync(filename + ".dot", gg, { encoding: "utf8" });
  exec(
    "dot " + filename + ".dot" + " -o " + filename + ".pdf" + " -Tpdf",
    null,
  );
}
