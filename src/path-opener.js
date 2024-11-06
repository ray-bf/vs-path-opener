const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.openPath', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const cursorPosition = editor.selection.active;
    const text = document.lineAt(cursorPosition.line).text;
    const regex = /source\s*=\s*"([^"]+)"/;
    const match = regex.exec(text);

    if (match && match[1]) {
      const relativePath = match[1];
      const fileDir = path.dirname(document.uri.fsPath);
      const targetDir = path.resolve(fileDir, relativePath);

      if (fs.existsSync(targetDir) && fs.lstatSync(targetDir).isDirectory()) {
        const files = fs.readdirSync(targetDir);
        const selectedFile = await vscode.window.showQuickPick(files, {
          placeHolder: 'Select a file to open'
        });

        if (selectedFile) {
          const filePath = path.join(targetDir, selectedFile);
          const fileUri = vscode.Uri.file(filePath);
          vscode.window.showTextDocument(fileUri);
        }
      } else {
        vscode.window.showErrorMessage('Directory does not exist or is not a directory');
      }
    } else {
      vscode.window.showErrorMessage('No valid source path found in the selected text');
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};