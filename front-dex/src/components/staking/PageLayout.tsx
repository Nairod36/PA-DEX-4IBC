import React, { ReactNode } from 'react';

interface PageLayoutProps {
    pageTitle: string;
    desc: string;
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ pageTitle, desc, children }) => {
    return (
        <div>
            <header>
                <h1>{pageTitle}</h1>
                <p>{desc}</p>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default PageLayout;
