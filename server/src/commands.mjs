const validCommands = ['/nick', '/nickcolor'];

export function isValidCommand(cmd, onlineUsers) {
    const cmdSplit = cmd.split(" ");

    // Check number of arguments
    if (cmdSplit.length !== 2) {
        throw `Invalid number of arguments. (${cmdSplit.length})`;
    }

    const command = cmdSplit[0];
    const arg = cmdSplit[1];
    // Check if command exists
    if (!validCommands.includes(command)) {
        throw `Command (${command}) doesn't exist.`;
    }

    // Check if new nickname is unique
    const nicknames = onlineUsers.map((user) => user.name);
    if (command === '/nick' && nicknames.includes(arg)) {
        throw `Nickname (${arg}) isn't unique.`;
    }

    // Check if valid color
    if (command === '/nickcolor' && !(/[0-9A-F]{6}$/i.test(arg))) {
        throw `Invalid nickname color (${arg}).`;
    }
}

export function handleCommand(cmd, user, onlineUsers) {
    const cmdSplit = cmd.split(" ");
    const command = cmdSplit[0];
    const arg = cmdSplit[1];
    const userIndex = onlineUsers.indexOf(user);
    console.log(userIndex);

    if (command === '/nick') {
        user.name = arg;
        onlineUsers[userIndex].name = arg;
    }

    if (command === '/nickcolor') {
        user.color = arg;
        onlineUsers[userIndex].color = arg;
    }
}