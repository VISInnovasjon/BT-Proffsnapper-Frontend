//funksjon som tar in en http response, og lager en autodownload basert på file blob. Linken blir dereferert etter download er ferdig.
export const blobHandler = async (res: Response) => {
  const disposition = res.headers.get("Content-Disposition");
  try {
    let filename = "File";
    if (disposition && disposition.includes("attachment")) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.log(error);
  }
};
