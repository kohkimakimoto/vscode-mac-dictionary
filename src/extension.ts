'use strict';

import {window, workspace, commands, ExtensionContext, TextEditor, Selection} from 'vscode';
import {Dictionary} from './dictionary';
import {exec} from 'child_process';
import {platform} from 'os';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    context.subscriptions.push(commands.registerCommand('extension.macDictionary.lookup', () => {
        lookup();
    }));

}

// this method is called when your extension is deactivated
export function deactivate() {
}

function lookup() {
    var editor = getEditor();
    var query = getSelectedText(editor);

    var dash = new Dictionary();

    exec(dash.getCommand(query));
}

/**
 * Get vscode active editor
 *
 * @return {TextEditor}
 */
function getEditor(): TextEditor {
    var editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    return editor;
}

/**
 * Get selected text by selection or by cursor position
 *
 * @param {TextEditor} active editor
 * @return {string}
 */
function getSelectedText(editor: TextEditor) {
    var selection = editor.selection;
    var text = editor.document.getText(selection);

    if (!text) {
        var range = editor.document.getWordRangeAtPosition(selection.active);
        text = editor.document.getText(range);
    }

    return text;
}

