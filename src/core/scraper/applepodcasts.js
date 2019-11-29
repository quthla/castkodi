/**
 * @module
 */

/**
 * Les règles avec les patrons et leur action.
 *
 * @constant {Map.<Array.<string>, Function>}
 */
export const rules = new Map();

/**
 * Extrait les informations nécessaire pour lire un son sur Kodi.
 *
 * @function action
 * @param {URL}    url      L'URL d'un son Apple Podcasts.
 * @param {string} url.href Le lien de l'URL.
 * @returns {Promise.<?string>} Une promesse contenant le lien du
 *                              <em>fichier</em> ou <code>null</code>.
 */
rules.set([
    "https://podcasts.apple.com/*/podcast/*/id*"
], async function ({ href }) {
    const response = await fetch(href);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "text/html");

    const script = doc.querySelector("#shoebox-ember-data-store");
    return null === script
                  ? null
                  : JSON.parse(script.textContent).data.attributes.assetUrl;
});
