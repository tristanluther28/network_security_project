const index = require('./index.js');

main();

async function main(){
	try {
		await index.handler(
            {
				"awslogs": {
				  "data": "H4sIAAAAAAAAAGVSW3PiIBT+Kxlet1oggVzeoiapbbxsjWu7teNEgynVhAhRq53+98W4O7Oz+wR8F853OHyCgimV5iw5VQx4oOcn/mIQTCZ+FIAbII4lkxqGhJiQWBS5EGl4K/JIin2lmTUvcyYrycta767cpJYsLTSpmg3UqNov1UryquaiDPm2ZlIB7wVMFZO9tE6vEHht7MGBlfWF/gQ807eYFDmQ2g5C2CIOcS2busSFJjYd5GKbYAyJbbsWhASb0HJcikwEbazL1ly3V6eFToooxqZr28imNrr507a+/gVDjFqQtEyYYOhB5BG7rTUYud8g9iB8NcZ3YyMWea47bA9HSb8beMYlunHJ7hnG5xzU+v3mwJuDvcZbmcbn4EafeNags93DpojxaIqmzybLaTxQmUrMY/j2HTfC9apIxIaVjZpN+ncSpXg5CmdqxJ+isLMbPXj+2HfRMtqMg9mHGyYDUu/XHeUXb+n0HP04kYUjBe1m0UPHfxqf6anLy5aMetnwJFlGqdpPre0yi8f1gsDHwfv9KeyfOs79NnvudxNrdf8x3Dy9ifAw3D3G73FlH1vB+mc026lsy8/9vBeTjqXQbLE+bhZNaKF03L+bn/EyE0fVkAc9Yz3tBkdwDr40tpSaZfIf14CvpFBiXRtBlrP/zC5q/7ZfxnkW5dXlF0zyVXobC7Xw9SfcsmvdjB34qvnPjazH1KYW1W2cVnppFLxqGGq3EXXbGDpthIiuYMxL8PX69Qs6sr9tFAMAAA=="
				}
			}
		);
	} catch(e) {
		console.log(e);
	}
}