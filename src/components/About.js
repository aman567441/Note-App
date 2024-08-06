import React from "react";

function About() {


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-11 border  rounded shadow p-4 bg-dark-subtle">
          <h2 className="text-center mb-4">About NoteApp</h2>
          <p>
            Welcome to our note-taking application! This application is designed
            to help you efficiently manage your notes and keep track of your
            important information.
          </p>
          <h4>Features</h4>
          <ul>
            <li><strong>Easy to Use:</strong> A user-friendly interface that makes it simple to create, edit, and delete notes.</li>
            <li><strong>Secure:</strong> Your notes are securely stored and can only be accessed by you.</li>
            <li><strong>Organized:</strong> Tag your notes to keep them organized and easily searchable.</li>
            <li><strong>Accessible Anywhere:</strong> Access your notes from any device, anywhere, anytime.</li>
          </ul>
          <h4>Our Mission</h4>
          <p>
            Our mission is to provide a simple and effective tool to help you
            organize your thoughts, tasks, and information in one convenient
            place. We believe that by keeping your notes organized, you can
            improve your productivity and focus on what truly matters.
          </p>
          <h4>Contact Us</h4>
          <p>
            If you have any questions, feedback, or suggestions, feel free to
            reach out to us. We're always here to help!
          </p>
          <p>
            <strong>Email:</strong> amankumar926253@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
