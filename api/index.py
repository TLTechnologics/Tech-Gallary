import os
import sys
from pathlib import Path

# Add directories to sys.path so app imports work seamlessly on Vercel
current_dir = Path(__file__).resolve().parent
root_dir = current_dir.parent
backend_dir = root_dir / "backend"

for p in [str(current_dir), str(backend_dir), str(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

try:
    from app.main import app
except ImportError:
    from api.app.main import app
