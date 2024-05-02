import {config} from "./authorize";

export const getToken = async (url, params, success, error) => {
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader(
		"Content-Type",
		"application/x-www-form-urlencoded; charset=UTF-8"
	);
	request.onload = function () {
		var body = {};
		try {
			body = JSON.parse(request.response);
		} catch (e) {}

		if (request.status == 200) {
			success(request, body);
		} else {
			error(request, body);
		}
	};
	request.onerror = function () {
		error(request, {});
	};
	var body = Object.keys(params)
		.map((key) => key + "=" + params[key])
		.join("&");
	request.send(body);
};

const parseQueryString = (string) => {
	if (string == "") {
		return {};
	}
	var segments = string.split("&").map((s) => s.split("="));
	var queryString = {};
	segments.forEach((s) => (queryString[s[0]] = s[1]));
	return queryString;
};

// Handle the redirect back from the authorization server and
// get an access token from the token endpoint

export const onCallback = () => {
    var q = parseQueryString(window.location.search.substring(1));
	console.log("query", q);

	// Check if the server returned an error string
	if (q.error) {
		alert("Error returned from authorization server: " + q.error);
		document.getElementById("error_details").innerText =
			q.error + "\n\n" + q.error_description;
		document.getElementById("error").classList = "";
	}

	// If the server returned an authorization code, attempt to exchange it for an access token
	if (q.code) {
		// Exchange the authorization code for an access token

		console.log("verifier", localStorage.getItem("pkce_code_verifier"));
		getToken(
			config.SSO_TOKEN_ENDPOINT,
			{
				grant_type: "authorization_code",
				code: q.code,
				client_id: config.SSO_CLIENT_ID,
				redirect_uri: config.SSO_REDIRECT_URI,
				code_verifier: localStorage.getItem("pkce_code_verifier"),
			},
			function (request, body) {
				localStorage.setItem("access_token", body.access_token);
				
                // Clean these up since we don't need them anymore
				localStorage.removeItem("pkce_code_verifier");
                console.log("redirecting to localhost:3004")
                window.location = "http://localhost:3004"
			},

			function (request, error) {
				document.getElementById("error_details").innerText =
					error.error + "\n\n" + error.error_description;
				document.getElementById("error").classList = "";
			}
		);
	}
};
