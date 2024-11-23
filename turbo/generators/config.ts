import type { PlopTypes } from "@turbo/gen";
import { execSync } from "child_process";
const say: PlopTypes.CustomActionFunction = async (answers) => {
  console.log(answers.name);
  return `Hello, ${answers.name}!`;
};
const addShadCNComponent: PlopTypes.CustomActionFunction = async (answers) => {
  console.log(answers);
  const { name } = answers;

  if (!name) {
    throw new Error("Component name is required.");
  }

  try {
    console.log(`🔄 Adding ShadCN component: ${name}...`);

    // Run the pnpm dlx command
    execSync(`pnpm dlx shadcn@latest add ${name}`, {
      cwd: "packages/ui",
      stdio: "inherit", // Stream output to the terminal
    });

    console.log(`✅ Successfully added ShadCN component: ${name}`);
    return `Component ${name} added successfully.`;
  } catch (error) {
    console.error(`❌ Error adding ShadCN component: ${error.message}`);
    throw error;
  }
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator("Generator name", {
    description: "Generator description",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name of the the blah:",
        validate: (input) => (input ? true : "name is required"),
      },
    ],
    // perform actions based on the prompts
    actions: [say],
  });

  plop.setGenerator("Say a word", {
    description: "says a thing",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name of the the blah:",
        validate: (input) => (input ? true : "name is required"),
      },
    ],
    // perform actions based on the prompts
    actions: [say],
  });
}
