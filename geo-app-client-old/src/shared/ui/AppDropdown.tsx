
type AppDropdownProps = {
    activator: React.ReactNode;
    children: React.ReactNode;
}
export function AppDropdown({ children, activator, className, ...props }: AppDropdownProps & React.HTMLProps<HTMLDetailsElement>) {

    return (
        <details className={`dropdown dropdown-end ${className}`} {...props}>
            <summary className="m-1 btn btn-ghost">{activator}</summary>
            <div className="dropdown-content z-10">{children}</div>
        </details>
    );
}