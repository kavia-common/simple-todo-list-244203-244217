/**
 * @fileoverview Filter buttons for todo list.
 */

/**
 * PUBLIC_INTERFACE
 * @param {{
 *   filter: string,
 *   filters: {ALL: string, ACTIVE: string, COMPLETED: string},
 *   counts: {total: number, active: number, completed: number},
 *   onChange: function(string): void,
 * }} props Props.
 * @return {JSX.Element} Element.
 */
export function TodoFilters({filter, filters, counts, onChange}) {
    return (
        <div className="todoFilters" role="tablist" aria-label="Todo filters">
            <button
                type="button"
                className={filter === filters.ALL ? 'chip chipActive' : 'chip'}
                onClick={() => onChange(filters.ALL)}
                role="tab"
                aria-selected={filter === filters.ALL}
            >
                All ({counts.total})
            </button>
            <button
                type="button"
                className={filter === filters.ACTIVE ? 'chip chipActive' : 'chip'}
                onClick={() => onChange(filters.ACTIVE)}
                role="tab"
                aria-selected={filter === filters.ACTIVE}
            >
                Active ({counts.active})
            </button>
            <button
                type="button"
                className={filter === filters.COMPLETED ? 'chip chipActive' : 'chip'}
                onClick={() => onChange(filters.COMPLETED)}
                role="tab"
                aria-selected={filter === filters.COMPLETED}
            >
                Completed ({counts.completed})
            </button>
        </div>
    );
}
