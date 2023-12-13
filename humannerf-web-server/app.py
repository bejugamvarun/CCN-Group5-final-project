from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import os
import cv2

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}  # Add more if needed
UPLOAD_FOLDER = 'uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_frames(video_file_path):
    cap = cv2.VideoCapture(video_file_path)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.route('/video_stream', methods=['POST'])
def video_stream():
    if 'video' not in request.files:
        return {'error': 'No video file provided'}, 400

    video_file = request.files['video']

    if video_file.filename == '':
        return {'error': 'No selected video file'}, 400

    if video_file and allowed_file(video_file.filename):
        # Save the uploaded video file temporarily
        temp_filename = f"{UPLOAD_FOLDER}/video.mp4"
        video_file.save(temp_filename)

        # Stream the frames from the temporarily saved video file
        return jsonify({'video_stream': f"{request.host_url}video_feed"})

    return {'error': 'Invalid file format'}, 400

@app.route('/video_feed', methods=['GET'])
def video_feed():
    pathVideo = f"{UPLOAD_FOLDER}/video.mp4"
    return Response(generate_frames(pathVideo), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
