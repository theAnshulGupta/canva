

export async function extractText(url) {
    const res = await fetch("https://hack.api.lang.staging.cam/extract-text-from-url", {
        method: "POST",
        body: JSON.stringify({pdfUrl: url}),
        headers: new Headers({'content-type': 'application/json'}),
    });

    return res;
}
    