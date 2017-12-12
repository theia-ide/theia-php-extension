/**
 * Generated using theia-extension-generator
 */

import { TheiaPhpCommandContribution, TheiaPhpMenuContribution } from './theia-php-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(TheiaPhpCommandContribution);
    bind(MenuContribution).to(TheiaPhpMenuContribution);
    
});