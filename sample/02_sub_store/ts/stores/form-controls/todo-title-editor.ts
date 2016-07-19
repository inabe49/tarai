import { ActionEvent, Store } from "../../../../../src/tarai";

import { TodoTitleEditorState, createTodoTitleEditorState, updateTodoTitleEditorState } from "../../state/form-controls/todo-title-editor";
import { TodoTitleEditorDispatcher } from "../../dispatchers/form-controls/todo-title-editor";
import { TodoTitleEditorProps } from "../../props/form-controls/todo-title-editor";


export class TodoTitleEditorStore extends Store<TodoTitleEditorState, TodoTitleEditorProps> {
    private _dispatcher: TodoTitleEditorDispatcher;

    constructor() {
        const state: TodoTitleEditorState = createTodoTitleEditorState("");
        super(state);

        this._dispatcher = new TodoTitleEditorDispatcher();
        this._dispatcher.onUpdateTitle.bind(this, this.onUpdateTitle);
        this._dispatcher.onFocus.bind(this, this.onFocus);
        this._dispatcher.onBlur.bind(this, this.onBlur);
    }


    public toProps(state: TodoTitleEditorState): TodoTitleEditorProps {
        return {
            title: state.title,
            isValid: state.isValid,
            hasFocused: state.hasFocused,

            dispatcher: this._dispatcher,
        };
    }


    public onUpdateTitle(next: string) {
        this.setState(updateTodoTitleEditorState(this.getState(), next));
    }

    public onFocus(arg: {}) {
        this.setState({
            hasFocused: true,
        });
    }

    public onBlur(arg: {}) {
    }
}


/*
親から子への通知

* 初期値の設定 (validation するかどうかも)
* 現在の状態をリクエストする
    * validation するかどうかも


子から親への通知

* 値に変更があった場合
* onChange<string, boolean>

*/

export class TodoTitleEditorConnecter {
    public onChange: ActionEvent<string>;
}
