import React from 'react'
import styles from "./rightnews.module.css"
import {useNavigate} from 'react-router-dom'

const RightNews = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.right}>
      <a href="/jobs" className={styles.viewRecommendation}>View all recommendations</a>

      {/* JOB RECOMMENDATIONS */}
      <div className={styles.jobRecommendations}>
        <div className={styles.jobsHeader}>
          <div className={styles.jobsTitle}>
            <p className={styles.jobTitleName}>Jobs</p>
            <p className={styles.jobNumber}>356 Jobs recommended for you</p>
          </div>
          <button className={styles.viewAllBtn} onClick={()=>navigate("/jobs")}>View all</button>

        </div>
        <div className={styles.joblists}>
          <div className={styles.jobItems}>
            <img className={styles.jobImg} src="https://s3-alpha-sig.figma.com/img/b288/3c25/51d8610b5e1a57a4a7cd1e86067b0d9c?Expires=1698019200&Signature=JBoX1jG5U71Pu-t9ePnXy2dPPslQkiBd-QGtsZrTGxn2m09ZNinHfRNiRKtPL7SZN76ut9V2Kjga5aKsPhfW7qr1ZQMM5OOvPoTwIqXt26o80NO-pu54qHmnaB6tt38E2LNqVxFU6drwWK52iU-9F~HU5Md4kYF2FAGnPt1RYx7JwVp4843DG5lYnSFw1SgKIuWfqYg2UID-Ktt9lcGxZ7L4PnPDSUz3MU3Fkv8xfnWzMIHUKztTS999SWA~EDftDVB~6BNF97XFpxyCZgQKALdGqtb1tvtbjVl9BmzTnnIm1saBgUjYi355CLiaTKuyrMXYRiNEk-jZQl6VfLUdrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="job" />
            <div className={styles.job}>
              <p className={styles.jobName}>Graphic Designer</p>
              <p className={styles.jobCompany}>Linkedin - CDD</p>
            </div>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}> 1min</p>
            </div>
          </div>

          <div className={styles.jobItems}>
            <img className={styles.jobImg} src="https://s3-alpha-sig.figma.com/img/d9ad/ea44/46383f32ecf5461bec29bf7a7bd9be70?Expires=1698019200&Signature=Png1fFhsOGCSBx8xSyNYHw-IZsc0j9YeZP61AtypHO~wMbhTD5I0xVjLq7YuCALwxsEpmTy20NjeSO8WZvhFkMk3UJwziBXxiQRQ3Vh0MeIwwD49Rcsje737tORJOmAWWNFYM9834TUc8MVddXCYdLxQSIrjtQw8E~OLV8zQT8MXiW8PCFEaDYrOpbvt0mX6xeu6VkcNuMsjFm1sqcyKEskS93lKLSTWkvdZAf8hSMhF0GMtt1j~u928OgODSSOutMymf8W~rZLy17MWe1S44dwms4dxDhfHF8qPefqew-aYBVnNDo9gLe4O9yVMIRVTQpxclWCa8dQxfABT4CdWAw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="job" />
            <div className={styles.job}>
              <p className={styles.jobName}>Brand Designer</p>
              <p className={styles.jobCompany}>L’ORÉAL - CDI</p>
            </div>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}> 1min</p>
            </div>
          </div>

          <div className={styles.jobItems}>
            <img className={styles.jobImg} src="https://s3-alpha-sig.figma.com/img/1e7c/a252/6d194eae11073f0230f9ed5e5cdb47c8?Expires=1698019200&Signature=JRlIn1K30EupOInJhTk~lCIXXaYwtWhg18gH4na0yvrUqYDzlmoFcI2zzX7gI5ZR66h7AiAwmBd4142p-McB0ELqtPBzmOi8w~sKIWo7zEb2C~cVadC5rPOE4GmcGMu2mKiFaV-DGfsKdCx7TA~lND~MSlPIm~9Fgl9wZ5JRKK8v~RNwqGwdQPoEsP79qpcqn-AurMSfitPHp1A3eCtG416A6m5uDEkXfzi3rmnAkqXCd8baqNCTiaoWrr9QC9ObZvEcX0a-vZPB-rDNEj5NKV4DUA6MV-gYX4F3hkF~BKQCHVmAV3YBYT2EY6E0rT5HxkhXGGvr1beOuN~BEKAbiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="job" />
            <div className={styles.job}>
              <p className={styles.jobName}>Senior Product Designer</p>
              <p className={styles.jobCompany}>Nasa - CDI</p>
            </div>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}> 1min</p>
            </div>
          </div>

          <div className={styles.jobItems}>
            <img className={styles.jobImg} src="https://s3-alpha-sig.figma.com/img/2473/d936/89be35fcaffa63e0d6bebfea34fc5e78?Expires=1698019200&Signature=DxpuxslW3f4XPdrSIBfHW4wO~a98yGYBksFuxZf~XlflIh-wBRQ9YPIsETWeu4gLZpDdj8p6O5i6HSgQ1BwHU1I~Q7l22hAKV3kiy615~ZasCD8K27fNHZPdPaPxoZBG7zIcDB6~2t2PmQHICt7p9SdFZKNjFrRhhU2WwfvW5YXMVOB2MEpGkH~GmyelKXEGcD0alhOPSk6lanyfROivNCs5K2cmN5GzfPKdBCEBXNnaIOlqYhy-WUplIoZ7cSl5xWjRP7dT4enmyMJIm10wdE6X3~e4xWrZAk-bLUQjMV52cjPcoJafVQ2Je6Hlgwegawyp4ui3L7kJm~xzQc-IJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="job" />
            <div className={styles.job}>
              <p className={styles.jobName}>Lead Designer</p>
              <p className={styles.jobCompany}>L’ORÉAL - CDI</p>
            </div>
            <div className={styles.jobTimer}>
              <img className={styles.jobTimerImg} src="./history-outline.svg" alt="timer" />
              <p className={styles.jobTime}> 1min</p>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default RightNews
