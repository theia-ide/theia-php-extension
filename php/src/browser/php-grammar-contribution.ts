/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { PHP_LANGUAGE_ID } from "../common";

@injectable()
export class PhpGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: "//", // "#"
            blockComment: ["/*", "*/"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { open: "{", close: "}", notIn: ["string"] },
            { open: "[", close: "]", notIn: ["string"] },
            { open: "(", close: ")", notIn: ["string"] },
            { open: "'", close: "'", notIn: ["string", "comment"] },
            { open: "\"", close: "\"", notIn: ["string", "comment"] },
            { open: "/**", close: " */", notIn: ["string"] }
        ],
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "'", close: "'" },
            { open: "\"", close: "\"" },
            { open: "`", close: "`"}
            
        ],
        indentationRules: {
            increaseIndentPattern: new RegExp("({(?!.+}).*|\\(|\\[|((else(\\s)?)?if|else|for(each)?|while|switch).*:)\\s*(/[/*].*)?$"),
            decreaseIndentPattern: new RegExp("^(.*\\*\\/)?\\s*((\\})|(\\)+[;,])|(\\][;,])|\\b(else:)|\\b((end(if|for(each)?|while|switch));))")
        },
        folding: {
            markers: {
                start: /\\s*(#|\/\/)region\\b/,
                end: /^\\s*(#|\/\/)endregion\\b/
            }
        }
    };

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: PHP_LANGUAGE_ID,
            "extensions": [
                ".php",
                ".php4",
                ".php5",
                ".phtml",
                ".ctp"
            ],
            "aliases": [
                "PHP",
                "php"
            ],
            "firstLine": "^#!\\s*/.*\\bphp\\b",
            "mimetypes": [
                "application/x-php"
            ]
        });

        monaco.languages.setLanguageConfiguration(PHP_LANGUAGE_ID, this.config);

        const phpGrammar = require('../../data/php.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.php', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: phpGrammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar(PHP_LANGUAGE_ID, 'source.php');
    }
}