

const PageLayout = ({ children, pagination }) => {
    return (
        <div className='flex flex-col min-h-[calc(100vh-112px)]'>
            <div className="flex-grow">
                {children}
            </div>
            {pagination}
        </div>
    );
};

export default PageLayout;