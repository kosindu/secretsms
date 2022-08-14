import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import CryptoJS from 'crypto-js/';

const Factory = () => {
  const maxCount = 150;
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [generator, setGenerator] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const messagesCollectionRef = collection(db, 'messages');

  const textAreaController = (message) => {
    setCount(message.length);
    setMessage(message);
  };

  // This function is to generate a radom number
  const getRandomKey = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  };

  // This function is to encrypt the user entered message
  const getEncryptedMessage = (message, key) => {
    return CryptoJS.AES.encrypt(message, key);
  };

  // This function is to generate the Encrypted message link
  const generateLink = (dbId, key) => {
    setGeneratedLink(`${window.location.href}message/${dbId}/${key}`);
  };

  // This function is to upload message Firestore
  const uploadToDB = async (encMsg, key) => {
    setLoading(true);
    await addDoc(messagesCollectionRef, { encMsg, key }).then((docRef) => {
      generateLink(docRef.id, key);
      setLoading(false);
    });
  };

  // This function is to create encrypted message & encryption key to Firestore
  const createMessage = () => {
    const key = getRandomKey();
    const encMsg = getEncryptedMessage(message, key);
    uploadToDB(encMsg.toString(), key);
    reset();
  };

  // This function is to reset the state
  const reset = () => {
    setGenerator(!generator);
    setCount(0);
    setMessage('');
    setGeneratedLink('');
  };

  return (
    <section id="factory">
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="container">
        <div className="factory-inner">
          {!generator ? (
            <div className="factory-inner__control">
              <div className="factory-type">
                <p>Enter Text</p>
                <p>
                  Characters Left:{' '}
                  <span className="char-count">
                    {count <= maxCount ? maxCount - count : 'Limit exceeded'}
                  </span>
                </p>
              </div>
              <div className="factory-input__model">
                <textarea
                  onChange={(e) => textAreaController(e.target.value)}
                  className="factory-input"
                  rows="7"
                  placeholder="What is your secret ?"
                ></textarea>
              </div>
              <div className="factory-btn__container">
                <button
                  className="factory-btn"
                  type="submit"
                  onClick={() => createMessage()}
                  disabled={count > maxCount || count === 0 ? true : false}
                >
                  generate secret link
                </button>
              </div>
            </div>
          ) : (
            <div className="factory-generated__box">
              <p>Copy this link and send it to your friend</p>
              <div className="factory-generated__link">
                {loading ? <div className="loader"></div> : generatedLink}
              </div>
              <button className="factory-btn" onClick={() => reset()}>
                Make Another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Factory;
