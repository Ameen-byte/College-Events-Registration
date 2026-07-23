import { useState } from 'react'
import styles from './Settings.module.css'

const defaultSettings = { emailUpdates: true, registrationReminders: true, compactView: false }

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings)

  const toggle = (name) => setSettings((current) => ({ ...current, [name]: !current[name] }))

  return (
    <section className={styles.settingsPage}>
      <p className={styles.eyebrow}>Workspace preferences</p>
      <h1>Settings</h1>
      <p className={styles.intro}>Choose how College Events Registration keeps you informed.</p>
      <div className={styles.settingsList}>
        <label className={styles.settingRow}>
          <span><strong>Email updates</strong><small>Receive announcements about new campus events.</small></span>
          <input type="checkbox" checked={settings.emailUpdates} onChange={() => toggle('emailUpdates')} />
        </label>
        <label className={styles.settingRow}>
          <span><strong>Registration reminders</strong><small>Get reminders before an event registration closes.</small></span>
          <input type="checkbox" checked={settings.registrationReminders} onChange={() => toggle('registrationReminders')} />
        </label>
        <label className={styles.settingRow}>
          <span><strong>Compact dashboard</strong><small>Use a denser layout for student and event records.</small></span>
          <input type="checkbox" checked={settings.compactView} onChange={() => toggle('compactView')} />
        </label>
      </div>
      <p className={styles.saved}>Preferences apply for this session.</p>
    </section>
  )
}
