
const Error = ({msg}) => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-300px)]">
            <p className="text-red-500">{msg}</p>
        </div>
    );
};

export default Error;