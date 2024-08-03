import React from 'react';
import styles from './InvitationCard.module.css';

const InvitationCard = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/65bbfe7bf534930be3ecc6229f14ff20344f14b88247d8dd4d853bbfcb066d59?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="" className={styles.headerBackground} />
        <h1 className={styles.name}>Жанат</h1>
        <p className={styles.age}>60 жыл</p>
      </header>
      
      <section className={styles.content}>
        <p className={styles.invitation}>
          Құрметті ағайын-туыс бауырлар, нағашылар, жиен-бөлелер,
          құда-жекжат, дос-жарандар, кластастар!
        </p>
        <p className={styles.description}>
          Сіздерді әкеміз Жанаттың мерей тойына арналған ақ дастарханымыздың
          қадірлі қонағы болуға шақырамыз!
        </p>
        
        <div className={styles.imageGallery}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3446376abbc9f28a719e76b6e48129fad7b2e73526f26f4bc8892fcee8bf8a6?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="Event image" className={styles.mainImage} />
          <div className={styles.sideImages}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e11a5d6a59467cda41dcd8223942a7f8485607e94b95391535fe6468a374ea20?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="Event image" className={styles.sideImage} />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c301b6db3886705c14c596779b54ccf4e10257d4fdbfc0d92999828a72a105f?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="Event image" className={styles.sideImage} />
          </div>
        </div>
        
        <h2 className={styles.eventTitle}>Той салтанаты:</h2>
        <p className={styles.eventDetails}>
          2024 жылы 30 тамыз күні
          сағат 19:00-де басталады
        </p>
        
        <div className={styles.infoSection}>
          <div className={styles.hostInfo}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2d57f513cdeae26762d351602b4f282665bc186aaa0bdfdddd9bff1c8bc7b48?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="Location map" className={styles.locationImage} />
            <h3 className={styles.hostTitle}>Той иелері:</h3>
            <p className={styles.hostNames}>
              Жұбайы Бақытгүл, балалары Арайлым, Әлішер, Әділет
            </p>
            <h3 className={styles.addressTitle}>Мекен-жайымыз:</h3>
            <p className={styles.address}>
              с. Бесағаш, ул. Райымбек 145 А Ханшайым мейрамханасы
            </p>
          </div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/321357766d9d6ccafc49d3a42f7089cf06603113bb743404caa9b621c73d4a89?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="" className={styles.decorativeImage} />
        </div>
      </section>
      
      <section className={styles.formSection}>
        <form className={styles.formContainer}>
          <label htmlFor="name" className={styles.formLabel}>Аты-жөні:</label>
          <input type="text" id="name" className={styles.formInput} />
          
          <label htmlFor="phone" className={styles.formLabel}>Телефон нөмері:</label>
          <input type="tel" id="phone" className={styles.formInput} />
          
          <div className={styles.checkboxContainer}>
            <label htmlFor="attendance" className={styles.formLabel}>Қатысуы:</label>
            <input type="checkbox" id="attendance" className={styles.checkbox} />
          </div>
          
          <label htmlFor="guests" className={styles.formLabel}>Адам саны(количество персон):</label>
          <input type="number" id="guests" className={styles.formInput} />
          
          <button type="submit" className={styles.submitButton}>Отправить</button>
        </form>
      </section>
      
      <footer>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/00657e893f9742a99cdc0ffc8fc01fe730220f6e4e7dc1c1e20c9df8568f9a02?apiKey=0cd853eed3e148a9ba452eaec10552a6&&apiKey=0cd853eed3e148a9ba452eaec10552a6" alt="" className={styles.footerImage} />
      </footer>
    </main>
  );
};

export default InvitationCard;