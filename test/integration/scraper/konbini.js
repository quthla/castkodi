import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Konbini", function () {
    it("should return URL", async function () {
        const url = "https://www.konbini.com/fr/cinema/sam-mendes-plonge" +
                                  "-lhorreur-tranchees-premier-trailer-de-1917";
        const options = { "depth": 0, "incognito": true };
        const expected = "plugin://plugin.video.youtube/play/" +
                                                       "?video_id=gZjQROMAh_s" +
                                                       "&incognito=true";

        const file = await extract(new URL(url), options);
        assert.strictEqual(file, expected);
    });
});
