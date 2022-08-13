import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import CryptoJS from 'crypto-js/';

const Factory = () => {
  const maxCount = 50;
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const messagesCollectionRef = collection(db, 'messages');

  const getRandomKey = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  };

  const getEncryptedMessage = (message, key) => {
    return CryptoJS.AES.encrypt(message, key);
  };

  const generateLink = (dbId, key) => {
    setGeneratedLink(`${window.location.href}message/${dbId}/${key}`);
  };

  const createMessage = async (encMsg, key) => {
    await addDoc(messagesCollectionRef, { encMsg, key }).then((docRef) => {
      generateLink(docRef.id, key);
    });
  };

  const uploadToDB = () => {
    const key = getRandomKey();
    const encMsg = getEncryptedMessage(message, key);
    // const decrypted = CryptoJS.AES.decrypt(encMsg, key);
    // console.log(decrypted.toString(CryptoJS.enc.Utf8));
    const dbId = createMessage(encMsg.toString(), key);
    // setGeneratedLink(decrypted.toString(CryptoJS.enc.Utf8));
  };

  return (
    <section id="factory">
      <div className="container">
        <div className="factory-inner">
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
              onChange={(e) => [
                setCount(e.target.value.length),
                setMessage(e.target.value),
              ]}
              className="factory-input"
              rows="7"
              placeholder="What is your secret ?"
            ></textarea>
          </div>
          <div className="factory-btn__container">
            <button
              className="factory-btn"
              type="submit"
              onClick={() => uploadToDB()}
              disabled={count > maxCount ? true : false}
            >
              generate secret link
            </button>
          </div>
          {generatedLink && (
            <>
              <div className="factory-generated__link">{generatedLink}</div>
              <a href={generatedLink}>click here</a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Factory;
