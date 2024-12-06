import * as tf from '@tensorflow/tfjs-node';

export async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}
