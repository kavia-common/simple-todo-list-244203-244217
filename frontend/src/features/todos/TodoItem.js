/**
 * @fileoverview A single todo row.
 */

/**
 * PUBLIC_INTERFACE
 * @param {{
 *   todo: {id: string, text: string, completed: boolean},
 *   onToggle: function(string): void,
 *   onDelete: function(string): void,
 * }} props Props.
 * @return {JSX.Element} Element.
 */
export function TodoItem({todo, onToggle, onDelete}) {
    return (
        <li className="todoItem">
            <label className="todoCheck">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span className={todo.completed ? 'todoText todoTextDone' : 'todoText'}>{todo.text}</span>
            </label>
            <button className="iconButton" type="button" onClick={() => onDelete(todo.id)} aria-label={`Delete "${todo.text}"`}>
                ✕
            </button>
        </li>
    );
}
