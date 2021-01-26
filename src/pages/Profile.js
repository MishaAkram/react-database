import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../services/firebase";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser,
      notes: [],
      content: "",
      note: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createNote = this.createNote.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  componentDidMount() {
    db.ref(`all_notes/${this.state.user.uid}`).on("value", snapshot => {
      let allNotes = [];
      snapshot.forEach(snap => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  createNote() {
    const uid = this.state.user.uid;
    const { content } = this.state;
    const note = this.state.note;
    if (note && note.content) {
      return db
        .ref(`all_notes/${uid}/${note.note_id}`)
        .update({
          content,
          uid
        })
        .then(_ => {
          this.setState({ content: "", note: {} });
        })
        .catch(error => console.log(error.message));
    }
    const note_id = `note-${Date.now()}`;
    db.ref(`all_notes/${uid}/${note_id}`)
      .set({
        content,
        note_id,
        uid
      })
      .then(_ => {
        this.setState({ content: "" });
      })
      .catch(error => console.log(error.message));
  }

  editNote(note_id) {
    db.ref(`all_notes/${this.state.user.uid}/${note_id}`)
      .once("value")
      .then(snapshot => {
        this.setState({
          note: snapshot.val(),
          content: snapshot.val().content
      
        });
      });
  }

  deleteNote(note_id) {
    db.ref(`all_notes/${this.state.user.uid}/${note_id}`).remove();
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.notes.map(note => {
          return (
            <div key={note.note_id} className="card card-body shadow-sm m-4">
              <p>{note.content}</p>
              <button
                className="btn btn-sm text-info"
                onClick={() => this.editNote(note.note_id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm text-danger"
                onClick={() => this.deleteNote(note.note_id)}
              >
                Delete button
              </button>
            </div>
          );
        })}
        <div className="form-group mx-4">
          <input
            className="form-control"
            onChange={this.handleChange}
            value={this.state.content}
          />
          <button className="btn btn-success mt-3" onClick={this.createNote}>
            Create Note
          </button>
        </div>

        <div className="mx-4">
          Login in as: <strong>{this.state.user.email}</strong>
        </div>
        <Footer />
      </div>
    );
  }
}
