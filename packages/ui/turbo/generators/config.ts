import type { PlopTypes } from "@turbo/gen";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const packageDir = "packages/ui"; // Target package directory
  const iconsFilePath = path.resolve("packages/ui/src/components/ui/icons.tsx");
  plop.setGenerator("shadcn-component", {
    description: "Adds a ShadCN component to the UI package using pnpm dlx",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "Enter the name of the ShadCN component to add:",
        validate: (input) => (input ? true : "Component name is required"),
      },
    ],
    actions: [
      // Step 1: Generate the component using pnpm dlx in the package directory
      async (answers) => {
        const { componentName } = answers;

        if (!componentName) {
          throw new Error("Component name is required.");
        }

        console.log(
          `🔄 Running pnpm dlx to add ShadCN component: ${componentName} in ${packageDir}...`,
        );

        try {
          execSync(`pnpm dlx shadcn@latest add ${componentName}`, {
            cwd: packageDir, // Set the working directory to the target package
            stdio: "inherit",
          });

          console.log(
            `✅ Successfully added ShadCN component: ${componentName}`,
          );
          return `Added ShadCN component: ${componentName}`;
        } catch (error) {
          console.error(`❌ Failed to add ShadCN component: ${error.message}`);
          throw error;
        }
      },
      // Step 2: Verify the generated file exists in the correct location
      async (answers) => {
        const { componentName } = answers;

        // Adjusted file path to match the actual location
        const componentPath = path.resolve(
          packageDir,
          `src/components/ui/${componentName}.tsx`,
        );

        console.log(
          `🔎 Verifying if component file exists at: ${componentPath}`,
        );

        if (!fs.existsSync(componentPath)) {
          throw new Error(`❌ Component file not found: ${componentPath}`);
        }

        console.log(`✅ Component file exists: ${componentPath}`);
        return `Verified component file: ${componentPath}`;
      },
      // Step 3: Modify the imports in the file
      async (answers) => {
        const { componentName } = answers;

        const filePath = path.resolve(
          packageDir,
          `src/components/ui/${componentName}.tsx`,
        );

        if (!fs.existsSync(filePath)) {
          throw new Error(`File does not exist: ${filePath}`);
        }

        // Read the file content
        const fileContent = fs.readFileSync(filePath, "utf8");

        // Replace "@/lib/utils" with "../../lib/utils"
        const updatedContent = fileContent.replace(
          /@\/lib\/utils/g,
          "../../lib/utils",
        );

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, "utf8");

        console.log(`✅ Updated imports in ${filePath}`);
        return `Modified imports in: ${filePath}`;
      },
      // Step 4: Append to package.json exports
      async (answers) => {
        const { componentName } = answers;

        const packageJsonPath = path.resolve(packageDir, "package.json");

        if (!fs.existsSync(packageJsonPath)) {
          throw new Error(`❌ package.json not found in ${packageDir}`);
        }

        console.log(`🔄 Updating exports in ${packageJsonPath}...`);

        // Read the package.json file
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8"),
        );

        // Ensure exports exist
        if (!packageJson.exports) {
          packageJson.exports = {};
        }

        // Add the new component export
        const exportPath = `./src/components/ui/${componentName}.tsx`;
        packageJson.exports[`./${componentName}`] = exportPath;

        // Write the updated package.json
        fs.writeFileSync(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2),
          "utf8",
        );

        console.log(`✅ Added export for ${componentName} in package.json`);
        return `Added export for ${componentName} in package.json`;
      },
    ],
  });

  plop.setGenerator("update-icons", {
    description: "Adds new icons to the icons.tsx file",
    prompts: [
      {
        type: "input",
        name: "iconImports",
        message:
          "Enter the icon imports (comma-separated, e.g., Home, Search):",
        validate: (input) =>
          input ? true : "At least one icon import is required",
      },
      {
        type: "input",
        name: "iconMappings",
        message:
          "Enter the icon mappings (comma-separated, e.g., Home:HomeIcon, Search:SearchIcon):",
        validate: (input) =>
          input ? true : "At least one icon mapping is required",
      },
    ],
    actions: [
      async (answers) => {
        const { iconImports, iconMappings } = answers;

        if (!fs.existsSync(iconsFilePath)) {
          throw new Error(`❌ File not found: ${iconsFilePath}`);
        }

        console.log(`🔄 Reading existing icons file: ${iconsFilePath}...`);

        // Read the existing file content
        const fileContent = fs.readFileSync(iconsFilePath, "utf8");

        // Parse user inputs
        const importsToAdd = iconImports.split(",").map((i) => i.trim());
        const mappingsToAdd = iconMappings.split(",").map((m) => {
          const [key, value] = m.split(":").map((s) => s.trim());
          return { key, value: value || key }; // Default to key if no mapping
        });

        // Extract existing imports and mappings
        const importMatch = fileContent.match(
          /import {([^}]+)} from "lucide-react";/,
        );
        const existingImports = importMatch
          ? importMatch[1].split(",").map((i) => i.trim())
          : [];

        const mappingsMatch = fileContent.match(
          /export const Icons = {([^}]+)};/s,
        );
        const existingMappings = mappingsMatch
          ? mappingsMatch[1].split(",").map((m) => {
              const [key, value] = m.split(":").map((s) => s.trim());
              return { key, value };
            })
          : [];

        // Merge imports
        const updatedImports = Array.from(
          new Set([...existingImports, ...importsToAdd]),
        ).sort();

        // Merge mappings
        const updatedMappings = Array.from(
          new Map(
            [...existingMappings, ...mappingsToAdd].map((m) => [
              m.key,
              m.value,
            ]),
          ).entries(),
        )
          .map(([key, value]) => `${key}: ${value}`)
          .sort();

        // Generate updated file content
        const updatedFileContent = `
import { ${updatedImports.join(", ")} } from "lucide-react";

export const Icons = {
  ${updatedMappings.join(",\n  ")},
};
`.trim();

        // Write updated file content
        fs.writeFileSync(iconsFilePath, updatedFileContent, "utf8");

        console.log(`✅ Updated icons file at: ${iconsFilePath}`);
        return `Added icons: ${importsToAdd.join(", ")}`;
      },
    ],
  });
}
