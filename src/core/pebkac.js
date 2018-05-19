/**
 * @module core/pebkac
 */

export const PebkacError = class extends Error {

    /**
     * Crée une erreur avec un message et un titre.
     *
     * @param {string}         key           La clé des messages d'erreur.
     * @param {Array.<string>} substitutions Les substitutions qui seront
     *                                       insérées dans le message.
     */
    constructor(key, substitutions = []) {
        super(browser.i18n.getMessage("notifications_" + key + "_message",
                                      substitutions));
        this.name = "PebkacError";
        this.title = browser.i18n.getMessage("notifications_" + key + "_title");
    }
};
