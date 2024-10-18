importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet');

let model;

self.addEventListener('message', async (event) => {
  if (event.data.type === 'load-model') {
    model = await mobilenet.load();
    self.postMessage({ type: 'model-loaded' });
  } else if (event.data.type === 'classify-image') {
    if (!model) {
      self.postMessage({ type: 'error', message: 'Model not loaded' });
      return;
    }
    
    const imageData = event.data.imageData;
    const tensor = tf.browser.fromPixels(imageData);
    const predictions = await model.classify(tensor);
    tensor.dispose();
    
    self.postMessage({ type: 'classification-result', predictions });
  }
});
