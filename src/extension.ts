// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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

	context.subscriptions.push(searchWithGoogle);
	context.subscriptions.push(searchWithStackOverflow);
	context.subscriptions.push(searchWithBaidu);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getSelectedText(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return '';
	}

	const document = editor.document;
	const eol = document.eol === 1 ? '\n' : '\r\n';
	let result: string = '';
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
