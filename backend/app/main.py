"""
ReRead API — FastAPI application entry point.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.routers import auth, users, books, book_requests

app = FastAPI(
    title=settings.APP_NAME,
    description="REST API for ReRead — a second-hand book exchange platform 📚",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS — allow the React frontend to talk to the API during development and production
# ---------------------------------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://re-read-three.vercel.app",
    "https://re-read-git-main-aphi.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # หรือใช้ ["*"] เพื่ออนุญาตทุกโดเมนชั่วคราว
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers — all endpoints live under /api
# ---------------------------------------------------------------------------
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(books.router, prefix="/api")
app.include_router(book_requests.router, prefix="/api")


# ---------------------------------------------------------------------------
# Global exception handler to keep error responses consistent
# ---------------------------------------------------------------------------
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catch unhandled exceptions and return a consistent error shape."""
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "data": None,
            "message": "An unexpected error occurred. Please try again later.",
        },
    )


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
