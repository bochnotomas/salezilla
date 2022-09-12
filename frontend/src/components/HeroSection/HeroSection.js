import React, { useState } from 'react';
import styles from './HeroSection.module.scss';

function HeroSection() {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.container_hero_section}>
      <h1>Millions of items for sale</h1>
      <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s.
      </p>
      <div className={styles.search_input_container}>
        <input
          type='text'
          value={search}
          placeholder='Search for your items'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
    </div>
  );
}

export default HeroSection;
