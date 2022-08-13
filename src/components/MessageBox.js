import CryptoJS from 'crypto-js';

const MessageBox = ({ encMsg, encKey, isMessageViewed }) => {
  const decrypted = CryptoJS.AES.decrypt(encMsg, encKey);
  const message = decrypted.toString(CryptoJS.enc.Utf8);
  return (
    <section id="message-box">
      <div className="container">
        <div className="message-box__inner">
          {!isMessageViewed && (
            <p className="message-box__text">You got this secret sms.</p>
          )}
          <div className="secret-message">
            {isMessageViewed ? (
              <p className="secret-message__seen">
                This secret message was already seen.
              </p>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageBox;
