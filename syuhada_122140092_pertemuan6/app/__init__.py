from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from zope.sqlalchemy import register

from .models import Base


def main(global_config, **settings):
    engine = engine_from_config(settings, "sqlalchemy.")
    session_factory = sessionmaker(bind=engine)
    register(session_factory)

    config = Configurator(settings=settings)
    config.include(".routes")
    config.scan()

    return config.make_wsgi_app()
