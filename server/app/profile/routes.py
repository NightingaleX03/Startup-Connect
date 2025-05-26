from .models import StartupProfile
from flask import Blueprint, request, jsonify, url_for
from flask_login import current_user
from database import db

profile = Blueprint('profile', __name__)

@profile.route('/create_startup_profile', methods=['POST'])
def create_startup_profile():
    data = request.json  # assuming JSON payload

    # Extract fields from data
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    # Create the StartupProfile object
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
        linkedin=data.get('linkedin')
    )

    # Save to DB
    db.session.add(startupProfile)
    db.session.commit()

    # Redirect to some profile page URL, or return JSON with success and URL
    return jsonify({
        "message": "Startup profile created successfully",
        "profile_url": url_for('startup.get_profile', profile_id=profile.id)
    }), 201