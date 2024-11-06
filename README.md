# Path Opener

Short cut to open simple relative paths in Terragrunt and Terraform hcl files.

## Usage

Right click on a line like this in a `.hcl` or `.tf` file and select "Open Path":

```hcl
  source = "../../../../../..//squads/platform/a-common-module"
```

## Build / Package

To create the vsix package: 
`npm install -g vsce`

`npm run package`

## Installation

To install Path Opener

Open Command Palette in VS Code (Cmd+Shift+P) and run `Extensions: Install from VSIX...` command, then select the `builds/path-opener-<latest>.vsix` file.

