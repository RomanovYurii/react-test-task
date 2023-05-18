export default function serviceWorkerRegistration() {
  let serviceWorkerPath = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(serviceWorkerPath);
}
