import os
import sys
from pathlib import Path

# Add backend directory to sys.path so app imports work seamlessly on Vercel
current_dir = Path(__file__).resolve().parent
root_dir = current_dir.parent
backend_dir = root_dir / "backend"

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

# Import FastAPI instance from backend
from app.main import app
