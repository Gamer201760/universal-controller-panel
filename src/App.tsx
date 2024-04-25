import { MQTTProvider } from './mqtt-hook'
import Cards from './components/Cards'
import { StorageProvider } from './storage'

function App() {
  return (
    <MQTTProvider url={import.meta.env.VITE_MQTT_URL} username={import.meta.env.VITE_MQTT_USERNAME} password={import.meta.env.VITE_MQTT_PASSWORD}>
      <StorageProvider>
        <Cards/>
      </StorageProvider>
    </MQTTProvider>
  )
}

export default App
