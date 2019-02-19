/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

//import * as os from 'os';
import * as path from 'path';
// import * as glob from 'glob';
import { injectable } from "inversify";
// import { DEBUG_MODE } from '@theia/core/lib/node';
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { PHP_LANGUAGE_ID, PHP_LANGUAGE_NAME } from '../common';
import { parseArgs } from '@theia/process/lib/node/utils';
import { SpawnOptions } from 'child_process';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

// export type ConfigurationType = 'config_win' | 'config_mac' | 'config_linux';
// export const configurations = new Map<typeof process.platform, ConfigurationType>();
// configurations.set('darwin', 'config_mac');
// configurations.set('win32', 'config_win');
// configurations.set('linux', 'config_linux');

@injectable()
export class PHPContribution extends BaseLanguageServerContribution {

    readonly id = PHP_LANGUAGE_ID;
    readonly name = PHP_LANGUAGE_NAME;

    async start(clientConnection: IConnection): Promise<void> {
        const lsp = path.join(__dirname, '../..','vendor', 'felixfbecker', 'language-server', 'bin', 'php-language-server.php')
        let command = 'php';
        let args: string[] = [
            lsp
        ];

        const phpLsCommand = process.env.PHP_LS_COMMAND;
        if (phpLsCommand) {
            command = phpLsCommand;
            args = parseArgs(process.env.PHP_LS_ARGS || '');
        }


        console.info("starting PHP language server :)")
        console.info(lsp);

        const serverConnection = await this.createProcessStreamConnectionAsync(command, args, this.getSpawnOptions());
        // serverConnection.reader.onError(err => console.log(err));
        this.forward(clientConnection, serverConnection);
    }

    protected getSpawnOptions(): SpawnOptions | undefined {
        return undefined;
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting php language server.");
        console.error("Please make sure it is installed on your system.");
    }
}
