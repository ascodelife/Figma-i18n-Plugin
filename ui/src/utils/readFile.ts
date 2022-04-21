export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const result = this.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("read file as text fail"));
      }
    };
  });
}
