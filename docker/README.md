# Comment contruire l'image docker de l'app ?

```bash
npm run build
```

```bash
docker build -f app.Dockerfile -t carist-app .
```

```bash
docker run -p 8080:8080 carist-app
```