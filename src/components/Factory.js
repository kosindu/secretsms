import { useState } from 'react';

const Factory = () => {
  const maxCount = 50;
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    const link = `http://${message}.com`;
    setGeneratedLink(link);
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
              onClick={() => generateLink()}
              disabled={count > maxCount ? true : false}
            >
              generate secret link
            </button>
          </div>
          {generatedLink && (
            <div className="factory-generated__link">{generatedLink}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Factory;
