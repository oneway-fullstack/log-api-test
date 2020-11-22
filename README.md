# log-api test
## Introduction
1. 1. Create an API end point '/v1/log' using node.js, receiving from POST request with a list of numbers as album ID in json (e.g. [1, 3]), then get album title from https://jsonplaceholder.typicode.com/albums/{album_id} and corresponding user name of album from https://jsonplaceholder.typicode.com/users/{user_id}, then save album title with user name to the Google sheet shared with you.
2. Save the name and count as csv sorted by count
3. Try to get name origins (e.g. Greek, Hebrew) from any online source you prefer (for example behindthename.com), and generate a csv of origin with number of occurrences. Sort by number of occurrences.

## Create your service account
1. Sign in to the Google API Console.
2. Open the Credentials page. If prompted, select the project that has the Android Management API enabled.
3. Click Create credentials > Service account key.
4. From the dropdown menu, select New service account. Enter a name for your service account.
5. Select your preferred key type and click Create. Your new public/private key pair is generated and downloaded to your machine and is the only copy of this key. You are responsible for storing it securely.
6. (Optional, but highly recommended) Add additional project owners by granting the Owner role to existing project members.

## Install packages
npm install

## run this script
npm run dev

## params with JSON
{
    "params": [5,3]
}