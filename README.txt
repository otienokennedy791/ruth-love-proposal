RUTH LOVE PROPOSAL PROJECT

1. Open index.html directly to test the design.
2. To RECEIVE responses from another phone, deploy backend/app.py on a public HTTPS server.
3. Put that public URL into script.js:
   const API_URL = "https://YOUR-BACKEND-URL";
4. The backend stores responses in backend/responses.json.
5. For a real public deployment, protect /api/responses with authentication.

Local backend:
  cd backend
  pip install -r requirements.txt
  python app.py
Then open http://127.0.0.1:5000
