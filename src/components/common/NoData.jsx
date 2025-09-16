
const NoData = ({msg}) => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-300px)]">
            <p className="text-muted-foreground">{msg}</p>
        </div>
    );
};

export default NoData;