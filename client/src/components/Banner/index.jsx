import React from 'react'
import styles from './banner.module.css'

const Banner = () => {
  return (
      <div className={styles.bannerContainer}>
          <div className={styles.bannerTitles}>
              <div className={styles.bannerText}>
              <p className={styles.bannerText1}>Discover your dream job with Takeoff</p>
              <p className={styles.bannerText2}>Don't let your career dreams remain dreams; turn them into reality with our product and discover your dream job today</p>
              </div>
              <div className={styles.bannerBtns}>
              </div>
          </div>
          <div className={styles.bannerImg}>
          <img src="https://s3-alpha-sig.figma.com/img/cd3a/e7f0/4f3753cbc17c43463aefcc465c3fee5e?Expires=1698019200&Signature=WHmBUjsUNGchy84l5FIdN-OtIjNHbAhgVowSHlkgdG8jvAPTUEh-Jfkeyh0WTvcScALjQsIXqSvsFj5WUD58JYJlml2uifmkBO4OlALDJoXtMoBF5VkPojC2~uyq1EnK9Y8JP52KZi1sLSGa0oIy4I-cbFRGmoQVwvAgJWJVHU0MT5lzcxyKGrsfd8v4RyGmL1oKs~0ZZu7sop0TBDCKZwDa6Or4mqWz6S9nEc574S9e6Kl3FpRQ6yYfbCZXmspHNARI8SSzemmL1YBpGowvIcthptNhSvsVbJRNzCnwdBHydnjTN8mlQvuv9ORXufC7zXAkSGe4-sM2-JbgPSVBMw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" 
          alt="Your Logo" className={styles.banner} />
          </div>

      </div>
  )
}

export default Banner
