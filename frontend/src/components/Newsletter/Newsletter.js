import React, { useState } from 'react';
import styles from './Newsletter.module.scss';

function Newsletter() {
  const [email, setEmail] = useState('');
  return (
    <div className={styles.container_newsletter_section}>
      <h1>Sign up for our newsletter</h1>
      <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s.
      </p>
      <div className={styles.search_input_container}>
        <input
          type='text'
          value={email}
          placeholder='Your email address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Newsletter;
