from .models import StartupProfile
from auth import User
from flask import Blueprint, request, jsonify, url_for
from flask_login import current_user, login_required
from database import db

profile = Blueprint('profile', __name__)

@profile.route('/set-profile', methods=['POST'])
@login_required
def create_startup_profile():

    data = request.json  
    user = User.query.filter_by(name=current_user.name).first()

    if user.type != 'startup':
        return jsonify({"error": "Only startup users can create a startup profile"}), 403
 
    startupProfile = StartupProfile.query.filter_by(user_id=user.id).first()

    if startupProfile:
        updatable_fields = [
            "avatar", "name", "size", "location", "founded_on", "founded_by",
            "tags", "description", "instagram", "linkedin"
        ]
        for field in updatable_fields:
            new_value = data[field]
            current_value = getattr(startupProfile, field)
            if new_value != current_value:
                setattr(startupProfile, field, new_value)

    else:
        startupProfile = StartupProfile(
            user_id=current_user.id,
            avatar=data.get('avatar'),
            name=data.get('name'),
            size=data.get('size'),
            location=data.get('location'),
            founded_on=data.get('founded_on'),
            founded_by=data.get('founded_by'),
            tags=data.get('tags', []),  
            description=data.get('description'),
            instagram=data.get('instagram'),
            linkedin=data.get('linkedin'),
        )

        db.session.add(startupProfile)
        
    db.session.commit()

    return jsonify({
        "message": "Startup profile created successfully",
    }), 201

@profile.route('/get-profile', methods=['GET'])
@login_required 
def get_startup_profile():
    user = User.query.filter_by(name=current_user.name).first()

    if user.type != 'startup':
        return jsonify({"error": "Only startup users can view a startup profile"}), 403
    
    startupProfile = StartupProfile.query.filter_by(user_id=user.id).first()        
    
    if not startupProfile:
        return jsonify({"error": "Startup profile not found"}), 404
    
    return jsonify({"profile": {
        "avatar": startupProfile.avatar,
        "name": startupProfile.name,
        "size": startupProfile.size,
        "location": startupProfile.location,
        "founded_on": startupProfile.founded_on,
        "founded_by": startupProfile.founded_by,
        "tags": startupProfile.tags,
        "description": startupProfile.description,
        "instagram": startupProfile.instagram,
        "linkedin": startupProfile.linkedin,
        "email": user.email,
    }})