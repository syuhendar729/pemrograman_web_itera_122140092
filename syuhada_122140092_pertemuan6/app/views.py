from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.orm import Session
from .models import Matakuliah
import json

@view_config(route_name="get_home", renderer="json")
def home(request):
    return {"message": "Welcome to the Matakuliah API"}

@view_config(route_name="get_matakuliah", renderer="json")
def get_all(request):
    session: Session = request.dbsession
    data = session.query(Matakuliah).all()
    return {"matakuliahs": [m.to_dict() for m in data]}


@view_config(route_name="get_matakuliah_detail", renderer="json")
def get_detail(request):
    session = request.dbsession
    mk = session.get(Matakuliah, int(request.matchdict["id"]))
    if not mk:
        return Response(json.dumps({"error": "Not found"}), status=404)
    return mk.to_dict()


@view_config(route_name="create_matakuliah", renderer="json")
def create(request):
    session = request.dbsession
    data = request.json_body

    mk = Matakuliah(
        kode_mk=data["kode_mk"],
        nama_mk=data["nama_mk"],
        sks=data["sks"],
        semester=data["semester"],
    )
    session.add(mk)
    session.flush()

    return mk.to_dict()


@view_config(route_name="update_matakuliah", renderer="json")
def update(request):
    session = request.dbsession
    mk = session.get(Matakuliah, int(request.matchdict["id"]))
    if not mk:
        return Response(json.dumps({"error": "Not found"}), status=404)

    data = request.json_body
    mk.kode_mk = data["kode_mk"]
    mk.nama_mk = data["nama_mk"]
    mk.sks = data["sks"]
    mk.semester = data["semester"]

    return mk.to_dict()


@view_config(route_name="delete_matakuliah", renderer="json")
def delete(request):
    session = request.dbsession
    mk = session.get(Matakuliah, int(request.matchdict["id"]))
    if not mk:
        return Response(json.dumps({"error": "Not found"}), status=404)

    session.delete(mk)
    return {"message": "Deleted"}
