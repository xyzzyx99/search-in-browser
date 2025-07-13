"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "search-in-browser" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let searchWithGoogle = vscode.commands.registerCommand('search-in-browser.google-search', () => {
        vscode.window.showInformationMessage("searching with google...");
        const searchText = getSelectedText();
        const googleSearchUrl = `https://google.com/search?q=${searchText}`;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(googleSearchUrl));
    });
    let searchWithStackOverflow = vscode.commands.registerCommand('search-in-browser.stackoverflow-search', () => {
        vscode.window.showInformationMessage("searching with stackoverflow...");
        const searchText = getSelectedText();
        const stackoverflowSearchUrl = `https://stackoverflow.com/search?q=${searchText}`;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(stackoverflowSearchUrl));
    });
    let searchWithBaidu = vscode.commands.registerCommand('search-in-browser.baidu-search', () => {
        vscode.window.showInformationMessage("searching with baidu...");
        const searchText = getSelectedText();
        const baiduSearchUrl = `https://baidu.com/s?wd=${searchText}`;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(baiduSearchUrl));
    });
    let searchWithBing = vscode.commands.registerCommand('search-in-browser.bing-search', () => {
        vscode.window.showInformationMessage("searching with Bing...");
        const searchText = getSelectedText();
        const bingSearchUrl = `https://www.bing.com/search?q=${searchText}`;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(bingSearchUrl));
    });
    let searchWithDuck = vscode.commands.registerCommand('search-in-browser.duck-search', () => {
        vscode.window.showInformationMessage("searching with Duckduckgo...");
        const searchText = getSelectedText();
        const duckSearchUrl = `https://duckduckgo.com/?q=${searchText}`;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(duckSearchUrl));
    });
    context.subscriptions.push(searchWithGoogle);
    context.subscriptions.push(searchWithBing);
    context.subscriptions.push(searchWithDuck);
    context.subscriptions.push(searchWithStackOverflow);
    context.subscriptions.push(searchWithBaidu);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function getSelectedText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return '';
    }
    const document = editor.document;
    const eol = document.eol === 1 ? '\n' : '\r\n';
    let result = '';
    const selectedTextLines = editor.selections.map((selection) => {
        if (selection.start.line === selection.end.line && selection.start.character === selection.end.character) {
            const range = document.lineAt(selection.start).range;
            const text = editor.document.getText(range);
            return `${text}${eol}`;
        }
        return editor.document.getText(selection);
    });
    if (selectedTextLines.length > 0) {
        result = selectedTextLines[0];
    }
    result = result.trim();
    return result;
}
//# sourceMappingURL=extension.js.map