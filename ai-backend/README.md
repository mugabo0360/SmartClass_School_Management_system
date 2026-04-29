# SmartClass AI Backend

Phase 2 scaffold for FastAPI AI services.

## Run locally

```bash
cd ai-backend
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Health endpoint: `http://localhost:8001/health`
