export default async function exportGraph(
  gg: string,
  filename: string,
): Promise<void> {
  await Bun.write(filename + ".dot", gg);
  const proc = Bun.spawn([
    "dot",
    filename + ".dot",
    "-o" + filename + ".pdf",
    "-Tpdf",
  ]);
  await proc.exited;
}
