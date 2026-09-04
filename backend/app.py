from fastapi import FastAPI

app = FastAPI(title="SIA - Smart Indian Assistant")


@app.get("/")
def root():
    return {
        "message": "SIA Backend is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
