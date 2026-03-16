/**
 * @fileoverview Controlled input for adding todos.
 */

import {useState} from 'react';

/**
 * PUBLIC_INTERFACE
 * @param {{onAdd: function(string): void}} props Props.
 * @return {JSX.Element} Element.
 */
export function TodoInput({onAdd}) {
    const [text, setText] = useState('');

    /**
     * @param {!Event} event Submit event.
     */
    function handleSubmit(event) {
        event.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }
        onAdd(trimmed);
        setText('');
    }

    return (
        <form className="todoInput" onSubmit={handleSubmit}>
            <label className="srOnly" htmlFor="newTodo">
                Add a todo
            </label>
            <input
                id="newTodo"
                className="todoTextInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                autoComplete="off"
            />
            <button className="btnPrimary" type="submit">
                Add
            </button>
        </form>
    );
}
