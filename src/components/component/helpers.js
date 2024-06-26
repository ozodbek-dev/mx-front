export async function pkceChallengeFromVerifier(v) {
	const hashed = await sha256(v);
	return base64urlencode(hashed);
}
// Base64-url encodes the input string
export function base64urlencode(str) {
	// Convert the ArrayBuffer to string using Uint8 array to convert to what btoa accepts
	// btoa accepts chars only within ascii 0-255 and base64 encodes them.
	// Then convert the base64 encoded to base64url encoded
	//   (replace + with -, replace / with _, trim trailing =)

	return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export function sha256(plain) {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);

	return window.crypto.subtle.digest("SHA-256", data);
}

export function generateRandomString() {
	const array = new Uint32Array(28);
	window.crypto.getRandomValues(array);
	return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
		""
	);
}
