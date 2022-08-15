const Message = ({responce}) => {
    return (
        <div className="message-container">
            <p>{responce.author}</p>
            <p>{responce.content}</p>
        </div>
    );
}
 
export default Message;
