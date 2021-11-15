# Post i dag?

<https://post.vestera.as>

Siden Posten startet med postlevering annenhver dag har jeg hatt lyst på en
enkel måte å sjekke om det er postlevering i dag uten å fylle ut et skjema
hver gang. Dette er forsøket mitt på å løse utfordringen. Vi får se hvor
lenge det fortsetter å funke.

## Init

```
npm install -g firebase-tools
firebase login

cd functions
npm ci
```

## Test locally

```
firebase emulators:start
```

## Deploy

```
firebase deploy
```
