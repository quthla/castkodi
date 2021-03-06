import assert from "assert";
import { extractVideo, extractAudio, extractYandex }
                               from "../../../../src/core/scraper/opengraph.js";

describe("core/scraper/opengraph.js", function () {
    describe("extractVideo()", function () {
        it("should return null when it's not a HTML page", async function () {
            const url = "https://foo.com";
            const doc = null;
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when there isn't Open Graph", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head></head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when content is empty", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:video:type" content="video/mp4" />
                    <meta property="og:video" content="" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when type isn't supported", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:video:type" content="application/pdf" />
                    <meta property="og:video"
                          content="http://bar.com/baz.pdf" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return video URL", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:video:type" content="video/web" />
                    <meta property="og:video"
                          content="http://bar.com/baz.mkv" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = "http://bar.com/baz.mkv";

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when it's depther", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:video:type" content="text/html" />
                    <meta property="og:video"
                          content="http://bar.com/baz.html" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 1 };
            const expected = null;

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return plugin URL", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:video:type" content="text/html" />
                    <meta property="og:video"
                          content="https://www.youtube.com/embed/v3gefWEggSc" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0, "incognito": true };
            const expected = "plugin://plugin.video.youtube/play/" +
                                                       "?video_id=v3gefWEggSc" +
                                                       "&incognito=true";

            const file = await extractVideo(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });
    });

    describe("extractAudio()", function () {
        it("should return null when it's not a HTML page", async function () {
            const url = "https://foo.com";
            const doc = null;
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when there isn't Open Graph", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head></head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when content is empty", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:audio:type" content="audio/mpeg" />
                    <meta property="og:audio" content="" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when type isn't supported", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:audio:type" content="application/pdf" />
                    <meta property="og:audio"
                          content="http://bar.com/baz.pdf" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = null;

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return audio URL", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:audio:type" content="audio/x-wav" />
                    <meta property="og:audio:secure_url"
                          content="http://bar.com/baz.wav" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = "http://bar.com/baz.wav";

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return null when it's depther", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:audio:type" content="text/html" />
                    <meta property="og:audio"
                          content="http://bar.com/baz.html" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 1 };
            const expected = null;

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });

        it("should return plugin URL", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="og:audio:type" content="text/html" />
                    <meta property="og:audio"
                          content="https://podcasts.apple.com/fr/podcast` +
                              `/cest-papy-mamie/id1093080425?i=1000435243113" />
                  </head>
                </html>`, "text/html");
            const options = { "depth": 0 };
            const expected = "https://dts.podtrac.com/redirect.mp3" +
                                "/www.arteradio.com/podcast_sound/61661310.mp3";

            const file = await extractAudio(new URL(url), doc, options);
            assert.strictEqual(file, expected);
        });
    });

    describe("extractYandex()", function () {
        it("should return null when it's not a HTML page", async function () {
            const url = "https://foo.com";
            const doc = null;
            const expected = null;

            const file = await extractYandex(new URL(url), doc);
            assert.strictEqual(file, expected);
        });

        it("should return null when there isn't Open Graph", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head></head>
                </html>`, "text/html");
            const expected = null;

            const file = await extractYandex(new URL(url), doc);
            assert.strictEqual(file, expected);
        });

        it("should return video URL", async function () {
            const url = "https://foo.com";
            const doc = new DOMParser().parseFromString(`
                <html>
                  <head>
                    <meta property="ya:ovs:content_url"
                          content="https://bar.com/baz.avi" />
                  </head>
                </html>`, "text/html");
            const expected = "https://bar.com/baz.avi";

            const file = await extractYandex(new URL(url), doc);
            assert.strictEqual(file, expected);
        });
    });
});
