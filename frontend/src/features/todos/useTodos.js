/**
 * @fileoverview Todo feature state + actions with localStorage persistence.
 */

import {useEffect, useMemo, useState} from 'react';
import {readJson, writeJson} from '../../utils/storage';

const STORAGE_KEY = 'kavia.todos';
const FILTERS = /** @type {const} */ ({
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
});

/**
 * @typedef {{
 *   id: string,
 *   text: string,
 *   completed: boolean
 * }} Todo
 */

/**
 * Creates a simple unique id.
 * @return {string} A unique id.
 */
function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * @param {Todo[]} todos Todos array.
 * @param {string} filter Current filter.
 * @return {Todo[]} Filtered todos.
 */
function applyFilter(todos, filter) {
    if (filter === FILTERS.ACTIVE) {
        return todos.filter((t) => !t.completed);
    }
    if (filter === FILTERS.COMPLETED) {
        return todos.filter((t) => t.completed);
    }
    return todos;
}

/**
 * PUBLIC_INTERFACE
 * Hook providing todo state + actions (add/toggle/delete/filter) with persistence.
 * @return {{
 *   todos: Todo[],
 *   visibleTodos: Todo[],
 *   filter: string,
 *   counts: {total: number, active: number, completed: number},
 *   addTodo: function(string): void,
 *   toggleTodo: function(string): void,
 *   deleteTodo: function(string): void,
 *   setFilter: function(string): void,
 * }}
 */
export function useTodos() {
    const [todos, setTodos] = useState(() => readJson(STORAGE_KEY, []));
    const [filter, setFilter] = useState(FILTERS.ALL);

    useEffect(() => {
        writeJson(STORAGE_KEY, todos);
    }, [todos]);

    const visibleTodos = useMemo(() => applyFilter(todos, filter), [todos, filter]);

    const counts = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        const active = total - completed;
        return {total, active, completed};
    }, [todos]);

    /**
     * Adds a todo.
     * @param {string} text Todo text.
     */
    function addTodo(text) {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }
        /** @type {Todo} */
        const next = {id: createId(), text: trimmed, completed: false};
        setTodos((prev) => [next, ...prev]);
    }

    /**
     * Toggles completed flag.
     * @param {string} id Todo id.
     */
    function toggleTodo(id) {
        setTodos((prev) => prev.map((t) => (t.id === id ? {...t, completed: !t.completed} : t)));
    }

    /**
     * Deletes a todo.
     * @param {string} id Todo id.
     */
    function deleteTodo(id) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    return {
        todos,
        visibleTodos,
        filter,
        counts,
        addTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
        FILTERS,
    };
}
