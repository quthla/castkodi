import assert      from "assert";
import { extract } from "../../../../src/core/scraper/arte.js";

describe("core/scraper/arte.js", function () {
    describe("extract()", function () {
        it("should return null when it's a unsupported URL", async function () {
            const url = "https://www.arte.tv/fr/guide/";
            const expected = null;

            const file = await extract(new URL(url));
            assert.strictEqual(file, expected);
        });

        it("should return null when video is unavailable", async function () {
            const url = "https://www.arte.tv/fr/videos/067125-020-A" +
                                                              "/bits-top-list/";
            const expected = null;

            const file = await extract(new URL(url));
            assert.strictEqual(file, expected);
        });

        it("should return french video URL", async function () {
            const url = "https://www.arte.tv/fr/videos/069798-000-A" +
                                                             "/revolution-vhs/";
            const expected = "https://arteptweb-a.akamaihd.net/am/ptweb" +
                                    "/069000/069700/069798-000-A_SQ_0_VOF-STF" +
                                 "_04670905_MP4-2200_AMM-PTWEB_1FpKT1ELGYC.mp4";

            const file = await extract(new URL(url));
            assert.strictEqual(file, expected);
        });

        it("should return german video URL", async function () {
            const url = "https://www.arte.tv/de/videos/077140-006-A" +
                                                     "/blow-up-john-carpenter" +
                                           "-aus-der-sicht-von-thierry-jousse/";
            const expected = "https://arteptweb-a.akamaihd.net/am/ptweb" +
                                     "/077000/077100/077140-006-A_SQ_0_VA-STA" +
                                   "_03470223_MP4-2200_AMM-PTWEB_u4hdDbkpd.mp4";

            const file = await extract(new URL(url));
            assert.strictEqual(file, expected);
        });
    });
});
