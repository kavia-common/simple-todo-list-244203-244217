/**
 * @fileoverview Feature entry component for the Todo UI.
 */

import {TodoFilters} from './TodoFilters';
import {TodoInput} from './TodoInput';
import {TodoList} from './TodoList';
import {useTodos} from './useTodos';

/**
 * PUBLIC_INTERFACE
 * @return {JSX.Element} Todo application feature.
 */
export function TodoApp() {
    const {visibleTodos, filter, counts, addTodo, toggleTodo, deleteTodo, setFilter, FILTERS} = useTodos();

    return (
        <section className="card" aria-label="Todo app">
            <header className="cardHeader">
                <h1 className="title">Todos</h1>
                <p className="subtitle">A minimal, local-first todo list.</p>
            </header>

            <TodoInput onAdd={addTodo} />

            <TodoFilters filter={filter} filters={FILTERS} counts={counts} onChange={setFilter} />

            <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </section>
    );
}
