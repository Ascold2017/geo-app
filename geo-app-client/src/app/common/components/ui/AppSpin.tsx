import React from 'react';

const AppSpin = ({ spinning, children }: { spinning?: boolean; children?: React.ReactNode }) => {
    if (!spinning) return children;
    return (
        <>
            <div className="app-spin">
                <div className="app-spin-spinner"></div>
            </div>
            {children}
        </>
    );
};

export default AppSpin;