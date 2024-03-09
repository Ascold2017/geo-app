import React from 'react';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export interface AppTableColumn<T> {
    title: string;
    key: string;
    render: (item: T) => React.ReactNode;
}
interface AppTableProps<T> {
    loading?: boolean;
    columns: AppTableColumn<T>[];
    items: T[];
    summary?: { title: string, value: number | string }[];
}

// eslint-disable-next-line react-refresh/only-export-components
export function AppTable<T>({ columns, items, loading, summary }: AppTableProps<T>) {
    if (loading) return <Spinner animation="border" style={{ position: 'fixed', top: '50%', left: '50%'}} />;
    function renderSummary() {
        if (!summary) return null;
        return (
            <Table striped bordered hover>
                <tbody>
                    {summary.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    return (
        <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex}>{column.render(item as T)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            {summary && renderSummary()}

        </>
    );
}

