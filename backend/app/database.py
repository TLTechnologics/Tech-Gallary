import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from app.config import settings

logger = logging.getLogger("techgallery.database")
is_serverless = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))

# Normalize database URL
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)
elif db_url.startswith("postgresql://") and not db_url.startswith("postgresql+"):
    db_url = db_url.replace("postgresql://", "postgresql+psycopg2://", 1)

# Ensure transaction pooler port 6543 for Supabase in serverless (port 5432 is session mode with IPv6/timeouts)
if "pooler.supabase.com:5432" in db_url:
    db_url = db_url.replace("pooler.supabase.com:5432", "pooler.supabase.com:6543")

# Ensure sslmode=require for Supabase cloud PostgreSQL
if "supabase" in db_url and "sslmode" not in db_url:
    delimiter = "&" if "?" in db_url else "?"
    db_url = f"{db_url}{delimiter}sslmode=require"

# Handle sqlite on Vercel / serverless (read-only filesystem, use /tmp)
if is_serverless and db_url.startswith("sqlite"):
    if ":memory:" not in db_url and not db_url.startswith("sqlite:////tmp"):
        db_url = "sqlite:////tmp/techgallery.db"

connect_args = {}
engine_kwargs = {
    "pool_pre_ping": True,
}

if db_url.startswith("sqlite"):
    connect_args["check_same_thread"] = False
    engine_kwargs["connect_args"] = connect_args
else:
    connect_args["connect_timeout"] = 7
    engine_kwargs["connect_args"] = connect_args
    if is_serverless:
        engine_kwargs["poolclass"] = NullPool
    else:
        engine_kwargs["pool_recycle"] = 300

try:
    engine = create_engine(db_url, **engine_kwargs)
except Exception as e:
    logger.error(f"Failed to create primary engine with {db_url}: {e}. Falling back to SQLite.")
    fallback_url = "sqlite:////tmp/techgallery.db" if is_serverless else "sqlite:///./techgallery.db"
    engine = create_engine(fallback_url, connect_args={"check_same_thread": False}, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

_initialized = False

def ensure_tables():
    global _initialized
    if not _initialized:
        try:
            Base.metadata.create_all(bind=engine)
            db = SessionLocal()
            try:
                from app.seed_data import seed_database
                seed_database(db)
            finally:
                db.close()
            _initialized = True
        except Exception as e:
            logger.warning(f"Database auto-init notice: {e}")

def get_db():
    if not _initialized:
        ensure_tables()
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
