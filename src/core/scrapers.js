/**
 * @module core/scrapers
 */

import { PebkacError }           from "./pebkac.js";
import { rules as airmozilla }   from "./scraper/airmozilla.js";
import { rules as arteradio }    from "./scraper/arteradio.js";
import { rules as dumpert }      from "./scraper/dumpert.js";
import { rules as collegehumor } from "./scraper/collegehumor.js";
import { rules as dailymotion }  from "./scraper/dailymotion.js";
import { rules as facebook }     from "./scraper/facebook.js";
import { rules as mixcloud }     from "./scraper/mixcloud.js";
import { rules as rutube }       from "./scraper/rutube.js";
import { rules as soundcloud }   from "./scraper/soundcloud.js";
import { rules as twitch }       from "./scraper/twitch.js";
import { rules as vimeo }        from "./scraper/vimeo.js";
import { rules as youtube }      from "./scraper/youtube.js";
import { rules as video }        from "./scraper/video.js";
import { rules as audio }        from "./scraper/audio.js";

const SCRAPERS = [
    airmozilla, arteradio, dumpert, collegehumor, dailymotion, facebook,
    mixcloud, rutube, soundcloud, twitch, vimeo, youtube, video, audio
];

const sanitize = function (pattern) {
    return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const compile = function (pattern) {
    const RE = /^(\*|https?|file|ftp):\/\/(\*|(?:\*\.)?[^/*]+|)\/(.*)$/i;
    const [, scheme, host, path] = RE.exec(pattern);
    return new RegExp("^" +
        ("*" === scheme ? "https?"
                        : sanitize(scheme)) + "://" +
        ("*" === host ? "[^/]+"
                      : sanitize(host).replace(/^\\\*/g, "[^./]+")) +
        "/" + sanitize(path).replace(/\\\*/g, ".*") + "$", "i");
};

/**
 * Les patrons (sous formes de modèles de correspondance) des URLs gérées.
 *
 * @const PATTERNS
 */
export const PATTERNS = [];

/**
 * Les patrons (sous formes d'expressions rationnelles) des URLs gérées.
 *
 * @const REGEXPS
 */
export const REGEXPS = [];

const RULES = new Map();

export const extract = function (input) {
    try {
        const url = new URL(input);
        const prefix = url.protocol + "//" + url.hostname + url.pathname;
        for (const [pattern, action] of RULES) {
            if (pattern.test(prefix)) {
                return action(url);
            }
        }
        // Si l'URL n'est pas gérée par les scrapers : envoyer directement l'URL
        // à Kodi.
        return Promise.resolve(input);
    } catch (_) {
        // Ignorer l'erreur (provenant d'une URL invalide), puis retourner une
        // promesse rejetée.
        return Promise.reject(new PebkacError("nolink"));
    }
};

for (const scraper of SCRAPERS) {
    for (const [patterns, action] of scraper.entries()) {
        for (const pattern of patterns) {
            PATTERNS.push(pattern);
            const regexp = compile(pattern);
            REGEXPS.push(regexp);
            RULES.set(regexp, action);
        }
    }
}
