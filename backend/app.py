from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
import json
import datetime

app = Flask(__name__, static_folder="..")

DATA = Path(__file__).parent / "responses.json"


def load():
    return json.loads(DATA.read_text()) if DATA.exists() else []


@app.get("/")
def home():
    return send_from_directory(
        Path(__file__).parent.parent,
        "index.html"
    )


@app.get("/api/responses")
def responses():
    return jsonify(load())


@app.post("/api/response")
def receive():
    data = request.get_json(silent=True) or {}

    if data.get("answer") not in ("YES", "NEED_TIME"):
        return jsonify(error="Invalid response"), 400

    responses = load()

    responses.append({
        "answer": data["answer"],
        "submitted_at": datetime.datetime.now(
            datetime.timezone.utc
        ).isoformat(),
        "page": data.get("page", "")
    })

    DATA.write_text(json.dumps(responses, indent=2))

    return jsonify(ok=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
