import React from "react";
import Header from "./Header.jsx";

function Layout({ withHeader, ...rest }) {
    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden body-font font-inter">
            {/* Conditionally render the Header */}
            {withHeader && <Header />}
            <div className="flex flex-col flex-1 gap-5 body-font font-inter">
                {/* Render the content passed as props */}
                <div {...rest}>{withHeader}</div>
            </div>
        </div>
    );
}

export default Layout;
