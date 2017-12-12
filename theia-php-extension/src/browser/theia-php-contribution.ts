import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const TheiaPhpCommand = {
    id: 'TheiaPhp.command',
    label: "Shows a message"
};

@injectable()
export class TheiaPhpCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TheiaPhpCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class TheiaPhpMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TheiaPhpCommand.id,
            label: 'Say Hello'
        });
    }
}