import {answerToEverything} from './index.js'

if (answerToEverything === 42) {
  console.log('test ok')
}
else {
  throw new Error('test failed')
}
