from setuptools import setup, find_packages

setup(
    name="backend",
    version="0.0.1",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "pyramid",
        "waitress",
        "sqlalchemy",
        "psycopg2-binary",
        "alembic",
    ],
    entry_points={
        "paste.app_factory": [
            "main = app:main",
        ],
    },
)
