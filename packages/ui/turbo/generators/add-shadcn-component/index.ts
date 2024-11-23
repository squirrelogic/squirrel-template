import { execSync } from "child_process";
import { GeneratorContext } from "turbo";

export default async function generator(ctx: GeneratorContext) {
  const { componentName } = ctx.args; // Parse args from --args

  if (!componentName) {
    throw new Error("The argument 'componentName' is required.");
  }

  try {
    console.log(`🔄 Adding ShadCN component: ${componentName}...`);

    // Run the pnpm dlx command
    execSync(`pnpm dlx shadcn@latest add ${componentName}`, {
      cwd: process.cwd(), // Adjust if needed
      stdio: "inherit", // Stream output to terminal
    });

    console.log(`✅ Successfully added ShadCN component: ${componentName}`);
  } catch (error) {
    console.error(`❌ Error adding ShadCN component: ${error.message}`);
  }
}
