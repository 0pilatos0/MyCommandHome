const current = document.querySelector("#current");
const previous = document.querySelector("#previous");

const prefix = "<span class='prefix'>root@main-laptop:~$</span> ";

const commands = [
  {
    command: "help",
    description: "List all available commands",
    aliases: ["h"],
    category: "general",
    run: helpCommand,
  },
  {
    command: "clear",
    description: "Clear the terminal",
    aliases: ["c"],
    category: "general",
    run: clearCommand,
  },
  {
    command: "author",
    description: "Show author information",
    aliases: ["a"],
    category: "general",
    run: authorCommand,
  },

  {
    command: "time",
    description: "Show current time",
    aliases: ["t"],
    category: "utilities",
    run: timeCommand,
  },
  {
    command: "date",
    description: "Show current date",
    aliases: ["d"],
    category: "utilities",
    run: dateCommand,
  },

  {
    command: "timeleft",
    description: "Show time left until the end of working day",
    aliases: ["tl"],
    category: "utilities",
    run: timeLeftCommand,
  },

  {
    command: "nextgen",
    description: "Redirects to nextgen.wics.nl NEXTGEN",
    aliases: ["ng"],
    category: "redirects",
    run: nextgenCommand,
  },
  {
    command: "dev",
    description: "Redirects to nextgen.wics.nl DEV",
    aliases: ["ngd"],
    category: "redirects",
    run: nextgenDevCommand,
  },
  {
    command: "jira",
    description: "Redirects to wicsnl.atlassian.net [NOT IMPLEMENTED]",
    aliases: ["j"],
    category: "redirects",
    run: jiraCommand,
  },
  {
    command: "bitbucket",
    description: "Redirects to bitbucket.org/wicsnl [NOT IMPLEMENTED]",
    aliases: ["bb"],
    category: "redirects",
    run: bitbucketCommand,
  },
];

for (let i = 0; i < 21; i++) {
  setTimeout(() => {
    printDirtyLine("Loading... <span class='loading'>" + i * 5 + "%</span>");
  }, 25 * i);
}

let command = "";
let enabled = false;

const welcome = [
  "-----------------------------------------------------------------",
  "Welcome to the Homepage Terminal!",
  'Type "help" to get started',
  "more features coming soon...",
  "-----------------------------------------------------------------",
];

setTimeout(() => {
  clearCommand();
  for (let i = 0; i < welcome.length; i++) {
    setTimeout(() => {
      printDirtyLine(welcome[i]);
    }, 200 * i);
  }
  setTimeout(() => {
    enabled = true;
    writeLine("");
  }, welcome.length * 200);
}, 1000);

document.addEventListener("keydown", (e) => {
  if (!enabled) return;
  if (e.key.match(/[a-z0-9]/i) && e.key.length === 1) {
    command += e.key;
    writeLine(command);
  } else if (e.key === "Backspace") {
    command = command.slice(0, -1);
    writeLine(command);
  } else if (e.key === "Enter") {
    printLine(command);

    const foundCommand = commands.find((c) => {
      return c.command === command || c.aliases.includes(command);
    });

    if (foundCommand) {
      foundCommand.run();
    } else {
      printLine("Command not found");
    }

    command = "";
    writeLine(command);
  }
});

function printLine(text) {
  previous.innerHTML += prefix + DOMPurify.sanitize(text) + "<br>";
}

function printCleanLine(text) {
  previous.innerHTML += DOMPurify.sanitize(text) + "<br>";
}

function printDirtyLine(text) {
  previous.innerHTML += text + "<br>";
}

function writeLine(text) {
  current.innerHTML = prefix + DOMPurify.sanitize(text);
}

function helpCommand() {
  printLine("Available commands:");
  printCleanLine(
    "-----------------------------------------------------------------"
  );
  const categories = commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {});

  for (const category in categories) {
    printDirtyLine("<span class='category'>" + category + "</span>");
    categories[category].forEach((command) => {
      printDirtyLine(
        `- ${command.command} <span class='description'>${command.description}</span>`
      );
    });
  }
  printCleanLine(
    "-----------------------------------------------------------------"
  );
}

function clearCommand() {
  previous.innerHTML = "";
}

function nextgenCommand() {
  printLine("Redirected to https://nextgen.wics.nl/");
  window.open("https://nextgen.wics.nl/r200sprint/", "_blank");
}

function nextgenDevCommand() {
  printLine("Redirected to https://nextgen.wics.nl/dev/");
  window.open("https://nextgen.wics.nl/dev/", "_blank");
}

function jiraCommand() {
  printLine("Redirected to https://wicsnl.atlassian.net/");
  window.open("https://wicsnl.atlassian.net/", "_blank");
}

function bitbucketCommand() {
  printLine("Redirected to https://bitbucket.org/wicsnl/");
  window.open("https://bitbucket.org/wicsnl/", "_blank");
}

function timeCommand() {
  printLine("Current time: " + new Date().toLocaleTimeString());
}

function dateCommand() {
  printLine("Current date: " + new Date().toLocaleDateString());
}

function timeLeftCommand() {
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    17,
    0,
    0
  );
  const diff = end - now;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);
  printLine(
    "Time left until the end of working day: " + hours + "h " + minutes + "m"
  );
}

function authorCommand() {
  printDirtyLine("----------------------------------------");
  printDirtyLine("Author: <span class='author'>Paul van der Lei</span>");
  printDirtyLine("----------------------------------------");
}
