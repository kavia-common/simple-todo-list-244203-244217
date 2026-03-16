/**
 * @fileoverview Todo list rendering.
 */

import {TodoItem} from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * @param {{
 *   todos: Array<{id: string, text: string, completed: boolean}>,
 *   onToggle: function(string): void,
 *   onDelete: function(string): void,
 * }} props Props.
 * @return {JSX.Element} Element.
 */
export function TodoList({todos, onToggle, onDelete}) {
    if (!todos.length) {
        return <p className="emptyState">No todos yet — add one above to see it here.</p>;
    }

    return (
        <ul className="todoList" aria-label="Todo list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    );
}
