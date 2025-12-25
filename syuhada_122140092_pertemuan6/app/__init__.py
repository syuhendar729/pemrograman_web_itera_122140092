from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from zope.sqlalchemy import register
from pyramid.events import NewRequest

from .models import Base


def main(global_config, **settings):
    engine = engine_from_config(settings, "sqlalchemy.")
    Base.metadata.bind = engine

    session_factory = sessionmaker(bind=engine)

    def add_dbsession(event):
        request = event.request
        session = session_factory()
        register(session)
        request.dbsession = session

    config = Configurator(settings=settings)

    config.include('pyramid_tm')  # Enable transaction manager
    config.add_subscriber(add_dbsession, NewRequest)
    config.include(".routes")
    config.scan()

    return config.make_wsgi_app()
