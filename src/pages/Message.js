import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MessageBox from '../components/MessageBox';
import Navbar from '../components/Navbar';
import { db } from '../firebase-config';

const Message = () => {
  const url = window.location.href;
  const params = url.split('/').slice(-2);
  const dbId = params[0];
  const key = params[1];

  const [encMsg, setEncMsg] = useState('');
  const [isMessageViewed, setIsMessageViewed] = useState(false);

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = async () => {
    const message = doc(db, 'messages', dbId);
    const document = await getDoc(message);
    if (document.data()) {
      setEncMsg(document.data().encMsg);
      deleteMessage();
    } else {
      setIsMessageViewed(true);
    }
  };

  const deleteMessage = async () => {
    const message = doc(db, 'messages', dbId);
    await deleteDoc(message);
  };

  return (
    <div className="Message">
      <Navbar />
      <Header />
      <MessageBox
        encMsg={encMsg}
        encKey={key}
        isMessageViewed={isMessageViewed}
      />
      <Footer />
    </div>
  );
};

export default Message;
