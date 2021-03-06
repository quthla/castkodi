/**
 * @module
 */
/* eslint-disable require-await */

import { matchPattern }           from "../../tools/matchpattern.js";
// eslint-disable-next-line import/no-cycle
import { extract as metaExtract } from "../scrapers.js";

/**
 * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
 *
 * @param {URL}          url     L'URL d'une page de Gamekult.
 * @param {HTMLDocument} doc     Le contenu HTML de la page.
 * @param {object}       options Les options de l'extraction.
 * @returns {Promise.<?string>} Une promesse contenant le lien du
 *                              <em>fichier</em> ou <code>null</code>.
 */
const action = async function ({ href }, doc, options) {
    if (null === doc || 0 < options.depth) {
        return null;
    }

    const iframe = doc.querySelector("iframe[data-ofiframe-src]");
    if (null === iframe) {
        return null;
    }
    return metaExtract(new URL(iframe.dataset.ofiframeSrc, href),
                       { ...options, "depth": options.depth + 1 });
};
export const extract = matchPattern(action, "*://www.ouest-france.fr/*");
